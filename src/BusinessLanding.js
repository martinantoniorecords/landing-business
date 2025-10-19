import React, { useEffect, useRef } from "react";

const BusinessLanding = () => {
  const paypalRef = useRef(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://www.paypal.com/sdk/js?client-id=BAAVYiC-srs0QQ7eQzFSPWsDfdJxKxthYO920jVotBhncf-yHaoRwrA_AOdHpsvzPCvCzWsQxa6UzGm5gA&currency=EUR";
    script.addEventListener("load", () => {
      if (window.paypal) {
        window.paypal
          .Buttons({
            style: {
              layout: "vertical",
              color: "blue",
              shape: "rect",
              label: "paypal",
            },
            createOrder: (data, actions) => {
              return actions.order.create({
                purchase_units: [
                  {
                    amount: { value: "30.00" },
                  },
                ],
              });
            },
            onApprove: (data, actions) => {
              return actions.order.capture().then((details) => {
                alert(
                  `Transaction completed by ${details.payer.name.given_name}!`
                );
              });
            },
            onError: (err) => {
              console.error("PayPal Buttons error:", err);
            },
          })
          .render(paypalRef.current);
      }
    });
    document.body.appendChild(script);

    return () => {
      if (script) document.body.removeChild(script);
    };
  }, []);

  return (
    <section style={{ maxWidth: "600px", margin: "2rem auto", padding: "1rem" }}>
      <h1>AI Услуги</h1>
      <p>
        Изкуствен интелект за начинаещи + готови AI prompts. Научете как да
        използвате AI и получете готови команди, които работят веднага!
      </p>

      <h2>Какво ще получите:</h2>
      <ul>
        <li>
          <strong>Ebook:</strong> Основи на AI, топ 10 инструмента, практически
          примери за България
        </li>
        <li>
          <strong>Prompt Pack:</strong> 10–20 готови ChatGPT / AI команди за
          маркетинг, социални мрежи, имейли и съдържание
        </li>
        <li>Лесно сваляне веднага след покупка</li>
        <li>Цена: BGN 30</li>
      </ul>

      <div style={{ marginTop: "2rem" }}>
        <div ref={paypalRef} />
      </div>
    </section>
  );
};

export default BusinessLanding;
