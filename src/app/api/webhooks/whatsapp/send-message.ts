export const sendWhatsAppMessage = (message: Record<any, any>) => {
  return fetch(
    `https://graph.facebook.com/v24.0/${process.env.WHATSAPP_TEST_PHONE_NUMBER_ID}/messages`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
      },
      body: JSON.stringify(message),
    },
  );
};
