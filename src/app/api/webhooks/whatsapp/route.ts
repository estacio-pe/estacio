export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const mode = searchParams.get("hub.mode");
  const challenge = searchParams.get("hub.challenge");
  const verifyToken = searchParams.get("hub.verify_token");

  if (
    mode === "subscribe" &&
    verifyToken === process.env.WHATSAPP_VERIFY_TOKEN
  ) {
    return new Response(challenge);
  } else {
    return new Response("Forbidden", { status: 403 });
  }
}

export async function POST(req: Request) {
  return new Response("Hello, World!");
}
