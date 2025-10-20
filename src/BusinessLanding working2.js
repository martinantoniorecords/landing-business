import React, { useEffect } from "react";

export default function AiPayment() {
  useEffect(() => {
    // Load PayPal SDK once
    if (!document.getElementById("paypal-sdk")) {
      const script = document.createElement("script");
      script.id = "paypal-sdk";
      script.src =
        "https://www.paypal.com/sdk/js?client-id=BAAVYiC-srs0QQ7eQzFSPWsDfdJxKxthYO920jVotBhncf-yHaoRwrA_AOdHpsvzPCvCzWsQxa6UzGm5gA&components=hosted-buttons&disable-funding=venmo&currency=EUR";
      script.async = true;
      script.onload = () => {
        if (window.paypal) {
          window.paypal
            .HostedButtons({
              hostedButtonId: "ZM7D8VVQS7NGE", // your PayPal hosted button ID
            })
            .render("#paypal-container");
        }
      };
      document.head.appendChild(script);
    }
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "#fff",
        padding: "2rem",
      }}
    >
      <div
        style={{
          maxWidth: "600px",
          width: "100%",
          textAlign: "center",
          border: "1px solid #eee",
          borderRadius: "10px",
          padding: "2rem",
          boxShadow: "0 0 10px rgba(0,0,0,0.05)",
        }}
      >
        <h2
          style={{
            fontSize: "1.8rem",
            fontWeight: "700",
            marginBottom: "1rem",
          }}
        >
          AI Услуги
        </h2>
        <p
          style={{
            fontSize: "1rem",
            color: "#444",
            marginBottom: "2rem",
          }}
        >
          Изкуствен интелект за начинаещи + готови AI prompts.  
          Научете как да използвате AI и получете готови команди, които работят веднага!
        </p>

        <h3 style={{ fontWeight: "600", marginBottom: "1rem" }}>
          Какво ще получите:
        </h3>
        <ul
          style={{
            textAlign: "left",
            listStyleType: "disc",
            margin: "0 auto 2rem auto",
            paddingLeft: "1.5rem",
            maxWidth: "500px",
            lineHeight: "1.6",
            color: "#333",
          }}
        >
          <li>
            <strong>Ebook:</strong> Основи на AI, топ 10 инструмента, практически примери за България
          </li>
          <li>
            <strong>Prompt Pack:</strong> 10–20 готови ChatGPT / AI команди за маркетинг, социални мрежи, имейли и съдържание
          </li>
          <li>Лесно сваляне веднага след покупка</li>
          <li>Цена: BGN 30</li>
        </ul>

        <div
          style={{
            marginTop: "2rem",
            textAlign: "center",
          }}
        >
          <h3
            style={{
              fontSize: "1.2rem",
              fontWeight: "600",
              marginBottom: "0.5rem",
              maxWidth: "400px",
              wordBreak: "break-word",
              whiteSpace: "normal",
              lineHeight: "1.4",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Пакет електронна книга плюс Prompt pack
          </h3>

          <p
            style={{
              fontWeight: "bold",
              fontSize: "1.1rem",
              marginBottom: "1rem",
            }}
          >
            €15.00 EUR
          </p>

          {/* ✅ Fixed PayPal container */}
          <div
            id="paypal-container"
            style={{
              display: "block",       // allow PayPal iframe to size naturally
              maxWidth: "400px",      // optional limit
              width: "100%",
              margin: "0 auto",       // center horizontally
              textAlign: "center",    // center button inside container
            }}
          ></div>
        </div>

        <div
          style={{
            marginTop: "3rem",
            borderTop: "1px solid #eee",
            paddingTop: "1rem",
            fontSize: "0.9rem",
            color: "#777",
          }}
        >
          <p>📩 Имате въпрос? Попитайте ни чрез формата по-долу.</p>
        </div>
      </div>
    </div>
  );
}
