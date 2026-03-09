import type { CloudAPISendTextMessageRequest } from "@whatsapp-cloudapi/types/cloudapi";
import type { WebhookPayload } from "@whatsapp-cloudapi/types/webhook";
import { runInBackground } from "@/lib/run-in-background";
import { mastra } from "@/mastra";
import { compareHmacSignature } from "./compare-signature";
import { sendWhatsAppMessage } from "./send-message";

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
  const signature = req.headers.get("x-hub-signature-256");
  const body = await req.text();

  if (!signature || !compareHmacSignature(signature, body)) {
    return new Response("Forbidden", { status: 403 });
  }

  runInBackground(async () => {
    const payload = JSON.parse(body) as WebhookPayload;

    const message = payload.entry[0].changes[0].value.messages?.[0];
    if (!message || message.type !== "text") return;

    // TODO: No type for read receipts in the library, so we are sending it manually
    await sendWhatsAppMessage({
      messaging_product: "whatsapp",
      status: "read",
      message_id: message.id,
      typing_indicator: {
        type: "text",
      },
    });

    const from = message.from;
    const text = message.text.body;

    const agent = mastra.getAgent("chatAgent");
    const generatedResponse = await agent.generate(text, {
      providerOptions: {
        openai: {
          store: false,
        },
      },
      memory: {
        resource: `whatsapp:${from}`,
        thread: "default",
      },
    });

    await sendWhatsAppMessage({
      messaging_product: "whatsapp",
      to: from,
      type: "text",
      text: {
        body: generatedResponse.text,
      },
    } satisfies CloudAPISendTextMessageRequest);
  });

  return new Response("OK");
}
