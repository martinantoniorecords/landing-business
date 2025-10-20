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
        justifyContent: "flex-start", // content starts at top
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
          AI Чатбот Пакет
        </h2>
        <p
          style={{
            fontSize: "1rem",
            color: "#444",
            marginBottom: "2rem",
          }}
        >
          Стартирай AI чатбот за своя бизнес или социални мрежи.  
          Получи готови команди и автоматизирай комуникацията с клиенти веднага!
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
            Готови AI скриптове за чатботове
          </li>
          <li>
            Автоматизация на въпроси и отговори за клиенти
          </li>
          <li>
            Подходящ за социални мрежи, сайтове и имейли
          </li>
          <li>
            Цена: €15
          </li>
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
            Стартирай своя AI чатбот
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

          {/* Chatbox immediately under PayPal */}
          <div
            style={{
              marginTop: "1rem",
              textAlign: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              <textarea
                placeholder="Напиши въпроса си за AI чатбот..."
                style={{
                  padding: "0.5rem",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                  width: "100%",
                  minHeight: "80px",
                  resize: "vertical",
                }}
              ></textarea>
              <button
                style={{
                  padding: "0.6rem 1rem",
                  backgroundColor: "#0070ba",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Изпрати
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
