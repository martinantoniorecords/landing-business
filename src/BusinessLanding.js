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
              hostedButtonId: "ZM7D8VVQS7NGE",
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
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "column",
        backgroundColor: "#fff",
        padding: "2rem",
        paddingTop: "1rem",
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
          Готов AI Чатбот 💬
        </h2>
        <p
          style={{
            fontSize: "1rem",
            color: "#444",
            marginBottom: "1rem",
          }}
        >
          💬 Вземи своя AI чатбот за €15!  
          Стартирай автоматични разговори с клиенти за минути – без кодиране.  
          Получаваш напълно готов бот + инструкции за веднага използване! 🛒 Купи сега
        </p>

        <h3 style={{ fontWeight: "600", marginBottom: "1rem" }}>
          Какво включва пакетът:
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
          <li>Напълно готов AI чатбот с лесна настройка</li>
          <li>Вградени отговори и автоматизации</li>
          <li>Подходящ за сайтове, социални мрежи и кампании</li>
          <li>Цена: €15 (около 30 лв)</li>
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
            Купи готовия чатбот и стартирай веднага 🚀
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

          {/* PayPal button */}
          <div
            id="paypal-container"
            style={{
              display: "block",
              maxWidth: "400px",
              width: "100%",
              margin: "0 auto",
              textAlign: "center",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}

