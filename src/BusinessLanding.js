import React, { useEffect, useRef } from "react";

const BusinessLanding = () => {
  const paypalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (document.getElementById("paypal-sdk")) return;

    const script = document.createElement("script");
    script.id = "paypal-sdk";
    script.src =
      "https://www.paypal.com/sdk/js?client-id=BAAVYiC-srs0QQ7eQzFSPWsDfdJxKxthYO920jVotBhncf-yHaoRwrA_AOdHpsvzPCvCzWsQxa6UzGm5gA&components=hosted-buttons&disable-funding=venmo&currency=EUR";
    script.async = true;

    script.onload = () => {
      if (window.paypal && paypalRef.current) {
        // Hosted Button с готов ID
        (window as any).paypal.HostedButtons({
          hostedButtonId: "LK4XLSFGRWDG2",
          style: { layout: "vertical", shape: "rect", label: "paypal" },
        }).render(paypalRef.current);
      }
    };

    document.body.appendChild(script);

    return () => {
      // Не изтривай контейнера, само скрипта
      document.body.removeChild(script);
    };
  }, []);

  return (
    <section style={{ maxWidth: "600px", margin: "2rem auto", padding: "1rem", textAlign: "center" }}>
      <h1>AI Услуги</h1>
      <p>
        Изкуствен интелект за начинаещи + готови AI prompts. Научете как да
        използвате AI и получете готови команди, които работят веднага!
      </p>

      <h2>Какво ще получите:</h2>
      <ul style={{ textAlign: "left" }}>
        <li><strong>Ebook:</strong> Основи на AI, топ 10 инструмента, практически примери за България</li>
        <li><strong>Prompt Pack:</strong> 10–20 готови ChatGPT / AI команди за маркетинг, социални мрежи, имейли и съдържание</li>
        <li>Лесно сваляне веднага след покупка</li>
        <li>Цена: BGN 30</li>
      </ul>

      <div style={{ marginTop: "2rem", display: "flex", justifyContent: "center" }}>
        <div ref={paypalRef}></div>
      </div>
    </section>
  );
};

export default BusinessLanding;
