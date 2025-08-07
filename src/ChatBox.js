// ChatBox.tsx
import React, { useState } from "react";
import { supabase } from "./supabaseClient";
import { sendToTelegram } from "./sendToTelegram";

export default function ChatBox() {
  const [userMessage, setUserMessage] = useState("");
  const [assistantReply, setAssistantReply] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!userMessage.trim()) return;

    setLoading(true);

    // 1. Изпращане към OpenAI
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "Ти си асистент на агенция за уебсайтове. Отговаряй кратко и ясно на български език.",
          },
          {
            role: "user",
            content: userMessage,
          },
        ],
      }),
    });

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "Нещо се обърка.";

    // 2. Запази в Supabase
    await supabase.from("chat_logs").insert([
      {
        user_message: userMessage,
        assistant_reply: reply,
      },
    ]);

    // 3. Изпрати към Telegram
    await sendToTelegram(`\u{1F4AC} Клиент: ${userMessage}\n\u{1F916} Бот: ${reply}`);

    setAssistantReply(reply);
    setUserMessage("");
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 500, margin: "auto", padding: "1rem", background: "#f9f9f9", borderRadius: 10 }}>
      <h3>🤖 Попитай за уебсайт</h3>
      <textarea
        placeholder="Напиши въпроса си тук..."
        value={userMessage}
        onChange={(e) => setUserMessage(e.target.value)}
        rows={3}
        style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem" }}
      />
      <button onClick={sendMessage} disabled={loading} style={{ padding: "0.5rem 1rem" }}>
        {loading ? "Изпращане..." : "Изпрати"}
      </button>
      {assistantReply && (
        <div style={{ marginTop: "1rem", padding: "1rem", background: "#e8f5e9", borderRadius: 8 }}>
          <strong>Отговор:</strong>
          <p>{assistantReply}</p>
        </div>
      )}
    </div>
  );
}
