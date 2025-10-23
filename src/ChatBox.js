// ChatBox.js
import React, { useState, useRef, useEffect } from "react";
import { supabase } from "./supabaseClient";
import { sendToTelegram } from "./sendToTelegram";

export default function ChatBox() {
  const [userMessage, setUserMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Scroll to bottom when chatHistory updates
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  const sendMessage = async () => {
    if (!userMessage.trim()) return;

    setLoading(true);
    setChatHistory((prev) => [...prev, { sender: "user", text: userMessage }]);

    try {
      // 1️⃣ Send message to OpenAI
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
             role: "system"
content:
Ти си AI асистент за продукт: готов AI чатбот (напълно изграден и готов за ползване). Говориш на български, кратко и ясно. 🤖

🎯 Правила:

Отговаряй на въпроси за функциите, възможностите и употребата на чатбота.

Ако потребителят пита за цена → отговаряй: "Готовият чатбот струва BGN 30 и може да се закупи веднага."

Ако въпросът е сложен → отговаряй накратко и приканвай към покупка или контакт.

В края на всяко съобщение добавяй: 🛒 Купи сега
            },
            { role: "user", content: userMessage },
          ],
        }),
      });

      const data = await response.json();

      if (data.error) {
        console.error("OpenAI API error:", data.error);
        setChatHistory((prev) => [
          ...prev,
          { sender: "assistant", text: "Възникна грешка с OpenAI API." },
        ]);
        setLoading(false);
        return;
      }

      const reply = data.choices?.[0]?.message?.content || "Възникна грешка.";
      
      // 2️⃣ Save chat in Supabase
      await supabase.from("chat_logs").insert([
        { user_message: userMessage, assistant_reply: reply },
      ]);

      // 3️⃣ Send to Telegram
      await sendToTelegram(`💬 Клиент: ${userMessage}\n🤖 Бот: ${reply}`);

      setChatHistory((prev) => [...prev, { sender: "assistant", text: reply }]);
      setUserMessage("");
    } catch (err) {
      console.error(err);
      setChatHistory((prev) => [
        ...prev,
        { sender: "assistant", text: "Възникна грешка, опитайте по-късно" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: "auto", padding: 20, background: "#f9f9f9", borderRadius: 10 }}>
      <h3>📘 Попитай за AI пакета</h3>

      <div
        style={{
          maxHeight: 300,
          overflowY: "auto",
          padding: 10,
          border: "1px solid #ddd",
          borderRadius: 8,
          marginBottom: 10,
          background: "#fff",
        }}
      >
        {chatHistory.map((msg, idx) => (
          <div key={idx} style={{ textAlign: msg.sender === "user" ? "right" : "left", marginBottom: 8 }}>
            <div
              style={{
                display: "inline-block",
                padding: "6px 10px",
                borderRadius: 8,
                background: msg.sender === "user" ? "#cce5ff" : "#e8f5e9",
              }}
            >
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <textarea
        placeholder="Напиши въпроса си тук..."
        value={userMessage}
        onChange={(e) => setUserMessage(e.target.value)}
        rows={3}
        style={{ width: "100%", padding: 8, marginBottom: 10 }}
      />
      <button onClick={sendMessage} disabled={loading} style={{ width: "100%", padding: 10 }}>
        {loading ? "Изпращане..." : "Изпрати"}
      </button>
    </div>
  );
}
