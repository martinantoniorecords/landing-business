// ChatBox.js
import React, { useState, useRef, useEffect } from "react";
import { supabase } from "./supabaseClient";
import { sendToTelegram } from "./sendToTelegram";

export default function ChatBox() {
  const [userMessage, setUserMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  const sendMessage = async () => {
    if (!userMessage.trim()) return;

    setLoading(true);
    setChatHistory((prev) => [...prev, { sender: "user", text: userMessage }]);

    try {
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
  content: `Ти си AI асистент за продукт: готов AI чатбот, напълно изграден и готов за ползване. 
Говориш на български, приятелски и уверено, с лек продавачески тон. Използвай разнообразни фрази — не повтаряй една и съща структура.

🎯 Правила:
- Основната ти задача е да представяш готовия AI чатбот — какво представлява, как се използва и какви ползи дава.
- Ако потребителят пита за цена → кажи: "Готовият чатбот струва BGN 30 и може да се закупи веднага. 🛒 Купи сега"
- Ако въпросът не е свързан с чатбота → отговаряй кратко, учтиво и върни фокуса към продукта, като **винаги използваш различен начин на изразяване**. Например:
  - "Интересен въпрос! 😊 Нашият AI чатбот е идеален, ако искаш интелигентен помощник за автоматизирана комуникация. 🛒 Купи сега"
  - "Хубаво питане! 💡 Позволи ми да ти разкажа за нашия готов AI чатбот — той върши чудеса в обслужването на клиенти. 🛒 Купи сега"
  - "О, това е интересно! 🤖 Нашият готов AI чатбот е точно това, което ти трябва, за да улесниш комуникацията си. 🛒 Купи сега"
  - "Чудесно питане! 😄 Нашият готов чатбот е напълно изграден и готов да поеме разговори вместо теб. 🛒 Купи сега"
- В края на всяко съобщение добавяй:  Купи сега
- Избягвай да повтаряш една и съща фраза повече от два пъти.`
}


,

            { role: "user", content: userMessage },
          ],
        }),
      });

      const data = await response.json();
      const reply = data.choices?.[0]?.message?.content || "Възникна грешка.";

      await supabase.from("chat_logs").insert([
        { user_message: userMessage, assistant_reply: reply },
      ]);

      await sendToTelegram(`💬 Клиент: ${userMessage}\n🤖 Бот: ${reply}`);

      setChatHistory((prev) => [...prev, { sender: "assistant", text: reply }]);
      setUserMessage("");
    } catch (err) {
      console.error(err);
      setChatHistory((prev) => [
        ...prev,
        { sender: "assistant", text: "Възникна грешка, опитайте по-късно." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <div style={{ position: "fixed", bottom: 45, right: 45, zIndex: 1000 }}>
          <button
            onClick={() => setIsOpen(true)}
            style={{
              borderRadius: "50%",
              width: 120,
              height: 120,
              background: "linear-gradient(135deg,#00C9A7,#6C63FF)",
              border: "none",
              boxShadow: "0 0 40px rgba(108,99,255,0.8)",
              color: "white",
              fontSize: 45,
              cursor: "pointer",
              animation: "pulse 2s infinite ease-in-out",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "scale(1.15)";
              e.target.style.boxShadow = "0 0 60px rgba(0,255,200,1)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "scale(1)";
              e.target.style.boxShadow = "0 0 40px rgba(108,99,255,0.8)";
            }}
          >
            💬
          </button>
        </div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            bottom: 40,
            right: 40,
            width: 460,
            height: 600,
            background: "rgba(255,255,255,0.98)",
            borderRadius: 20,
            boxShadow: "0 8px 45px rgba(0,0,0,0.25)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            zIndex: 2000,
            animation: "fadeIn 0.3s ease",
            border: "1px solid rgba(0,0,0,0.05)",
          }}
        >
          {/* Header */}
          <div
            style={{
              background: "linear-gradient(135deg,#6C63FF,#00C9A7)",
              color: "white",
              padding: "18px 25px",
              fontWeight: "bold",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontSize: 18,
            }}
          >
            🤖 AI Асистент
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: "transparent",
                color: "white",
                border: "none",
                fontSize: 24,
                cursor: "pointer",
              }}
            >
              ✖
            </button>
          </div>

          {/* Chat Messages */}
          <div
            style={{
              flex: 1,
              padding: "20px",
              overflowY: "auto",
              background: "#f5f7fa",
            }}
          >
            {chatHistory.map((msg, idx) => (
              <div
                key={idx}
                style={{
                  textAlign: msg.sender === "user" ? "right" : "left",
                  marginBottom: 12,
                }}
              >
                <div
                  style={{
                    display: "inline-block",
                    padding: "12px 16px",
                    borderRadius: 16,
                    maxWidth: "75%",
                    background:
                      msg.sender === "user"
                        ? "linear-gradient(135deg,#6C63FF,#00C9A7)"
                        : "#eafbea",
                    color: msg.sender === "user" ? "white" : "black",
                    fontSize: 15,
                    lineHeight: 1.4,
                    boxShadow:
                      msg.sender === "user"
                        ? "0 3px 12px rgba(108,99,255,0.4)"
                        : "0 2px 8px rgba(0,0,0,0.08)",
                  }}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div
            style={{
              borderTop: "1px solid #ddd",
              padding: "12px",
              display: "flex",
              gap: "10px",
              background: "white",
            }}
          >
            <textarea
              placeholder="Напиши въпроса си тук..."
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              rows={2}
              style={{
                flex: 1,
                padding: 12,
                borderRadius: 12,
                border: "1px solid #ccc",
                resize: "none",
                fontSize: 15,
              }}
            />
            <button
              onClick={sendMessage}
              disabled={loading}
              style={{
                background: "linear-gradient(135deg,#00C9A7,#6C63FF)",
                border: "none",
                color: "white",
                padding: "16px 22px",
                borderRadius: 14,
                fontWeight: "bold",
                fontSize: 18,
                cursor: "pointer",
                transition: "transform 0.25s ease",
              }}
              onMouseEnter={(e) => (e.target.style.transform = "scale(1.08)")}
              onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
            >
              {loading ? "..." : "➡️"}
            </button>
          </div>
        </div>
      )}

      {/* Animations */}
      <style>{`
        @keyframes pulse {
          0% { transform: scale(1); box-shadow: 0 0 25px rgba(0,255,200,0.6); }
          50% { transform: scale(1.12); box-shadow: 0 0 55px rgba(108,99,255,0.9); }
          100% { transform: scale(1); box-shadow: 0 0 25px rgba(0,255,200,0.6); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}

