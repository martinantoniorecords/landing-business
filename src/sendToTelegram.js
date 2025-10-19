// sendToTelegram.ts
export async function sendToTelegram(message: string) {
  const BOT_TOKEN = "7728449437:AAHLncszp2Pk6EZl9Fi4sWxTBn7cOHzsqZ8";
  const CHAT_ID = "6937760786";

  await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text: message
    })
  });
}
// JavaScript source code
