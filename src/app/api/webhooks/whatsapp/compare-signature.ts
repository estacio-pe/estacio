import { createHmac, timingSafeEqual } from "node:crypto";

export const compareHmacSignature = (sign: string, body: string) => {
  const expected = `sha256=${createHmac(
    "sha256",
    process.env.WHATSAPP_APP_SECRET as string,
  )
    .update(body)
    .digest("hex")}`;

  return timingSafeEqual(Buffer.from(sign), Buffer.from(expected));
};
