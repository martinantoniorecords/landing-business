import React, { useState } from "react";
import "./BusinessLanding.css";

const BusinessLanding = () => {
  const [status, setStatus] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    create_website: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Изпращане...");

    const response = await fetch(
      "https://sneynasuzdckcnimehdd.supabase.co/rest/v1/contact_messages",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNuZXluYXN1emRja2NuaW1laGRkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU2NjIxMzksImV4cCI6MjA2MTIzODEzOX0.4JZ_zHLCV2fJs872P5PB-9h0ZGFgLsXdksIajkrPrKU",
          Authorization:
            "Bearer YOUR_SUPABASE_KEY",
          Prefer: "return=minimal",
        },
        body: JSON.stringify(formData),
      }
    );

    if (!response.ok) {
      console.error("Error:", response.statusText);
      setStatus("⚠️ Възникна грешка. Опитайте отново.");
    } else {
      setStatus("✅ Съобщението е изпратено успешно!");
      setFormData({ name: "", email: "", create_website: "" });
    }
  };

  return (
    <div className="container">
      <h1>Имате бизнес, но нямате сайт?</h1>
      <p>
        <strong>Получете професионален уебсайт бързо и лесно – започвайки от 150 лв.</strong>
      </p>

      <div className="cta">
        🎯 <a href="#contact">Изпрати запитване сега</a> и получи оферта до 24 часа!
      </div>

      <h2>Възможности за вашия сайт:</h2>

      <h3>Блог сайт – от 150 лв.</h3>
      <ul>
        <li>Подходящ за лични блогове, новинарски сайтове или инфлуенсъри</li>
        <li>Адаптивен дизайн за телефон, таблет и компютър</li>
        <li>Домейн и хостинг за 1 година (според избраното окончание)</li>
        <li>Неограничен брой категории и публикации (до 10 ГБ)</li>
        <li>SEO оптимизация и лесно управление чрез контролен панел</li>
      </ul>

      <h3>Информационен сайт – от 350 лв.</h3>
      <ul>
        <li>Идеален за фирми, услуги, организации или портфолио</li>
        <li>Адаптивен дизайн за всички устройства</li>
        <li>Включени 5 основни страници: Начало, За нас, Галерия, Блог/Портфолио, Контакти</li>
        <li>Домейн и хостинг за 1 година</li>
        <li>SEO оптимизация, SSL сертификат и лесен контролен панел</li>
      </ul>

      <h3>Онлайн магазин – от 550 лв.</h3>
      <ul>
        <li>Продажба на физически и дигитални продукти</li>
        <li>Модерен адаптивен дизайн, ориентиран към потребителското преживяване</li>
        <li>Неограничен брой продукти и категории с филтри и тагове</li>
        <li>Интеграция с различни методи за плащане (карти, PayPal и др.)</li>
        <li>SEO оптимизация, SSL сертификат, обучение за управление на магазина</li>
      </ul>

      <h2 id="contact">Свържете се с мен: тел. 0882 957008</h2>
  
    </div>
  );
};

export default BusinessLanding;
