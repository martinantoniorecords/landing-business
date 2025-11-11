import React, { useEffect } from "react";

const BusinessLanding = () => {
  useEffect(() => {
    // Only add script once
    if (!document.getElementById("paypal-sdk")) {
      const script = document.createElement("script");
      script.id = "paypal-sdk";
      script.src =
        "https://www.paypal.com/sdk/js?client-id=BAAVYiC-srs0QQ7eQzFSPWsDfdJxKxthYO920jVotBhncf-yHaoRwrA_AOdHpsvzPCvCzWsQxa6UzGm5gA&components=hosted-buttons&disable-funding=venmo&currency=EUR";
      script.async = true;
      script.onload = () => {
        if (window.paypal) {
          // Render hosted button into container
          window.paypal.HostedButtons({
            hostedButtonId: "ZM7D8VVQS7NGE"
          }).render("#paypal-container");
        }
      };
      document.head.appendChild(script);
    }
  }, []);

  return (
    <section
      style={{
        maxWidth: "600px",
        margin: "2rem auto",
        padding: "1rem",
        textAlign: "center",
      }}
    >
      <h1>AI Услуги</h1>
      <p>
        Изкуствен интелект за начинаещи + готови AI prompts. Научете как да
        използвате AI и получете готови команди, които работят веднага!
      </p>

      <h2>Какво ще получите:</h2>
      <ul style={{ textAlign: "left" }}>
        <li>
          <strong>Електронна книга:</strong> Основи на AI, топ 10 инструмента, практически
          примери за България
        </li>
        <li>
          <strong>Prompt Pack:</strong> 10–20 готови ChatGPT / AI команди за
          маркетинг, социални мрежи, имейли и съдържание
        </li>
        <li>Лесно сваляне веднага след покупка</li>
        <li>Цена: BGN 30</li>
      </ul>

      <div style={{ marginTop: "2rem", textAlign: "center" }}>
        <div id="paypal-container"></div>
      </div>
    </section>
  );
};

export default BusinessLanding;

