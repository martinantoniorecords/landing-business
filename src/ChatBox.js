/* eslint-disable unicode-bom */
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
            content: `
Ти си асистент на агенция за уебсайтове. Говориш на български език, с кратки, ясни и конкретни отговори.

🎯 Твоите правила:
- Обяснявай нашите услуги: изработка на сайтове, онлайн магазини, SEO, дизайн и поддръжка.  
- Ако клиент пита за цени или срокове → давай обща ориентация, без точни числа.  
- Ако клиентът има конкретен проект или сложен въпрос → кажи накратко и препрати към контакт.  
- При всяко запитване завършвай отговора с покана клиентът да се свърже с нас по телефон или имейл.

📌 Често срещани въпроси и примерни отговори:
1. "Правите ли онлайн магазини?"  
➡️ "Да, изработваме онлайн магазини с плащания и мобилна оптимизация. За точна оферта се свържете с нас по телефон или имейл."

2. "Колко струва сайт?"  
➡️ "Цената зависи от проекта. Малките сайтове са по-евтини, онлайн магазините – по-сложни. Най-добре е да се чуем за точна оферта."

3. "Колко време отнема?"  
➡️ "Стандартен сайт – около 2–4 седмици. Онлайн магазините – повече. Можем да уточним по телефон или имейл."

4. "Предлагате ли поддръжка?"  
➡️ "Да, имаме пакети за поддръжка, актуализации и хостинг. Свържете се с нас за повече детайли."

5. "Правите ли SEO?"  
➡️ "Да, предлагаме оптимизация за по-голяма видимост в търсачките. Можем да обсъдим целите ви при директен контакт."

6. "Мога ли да видя примери?"  
➡️ "Да, имаме реализирани сайтове за различни бизнеси. Изпращаме примери при контакт по имейл или телефон."

В края на всеки отговор добавяй:  
"📞 Телефон: [твоя номер] | ✉️ Имейл: [твоя имейл]"
`
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
