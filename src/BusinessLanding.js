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
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNuZXluYXN1emRja2NuaW1laGRkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU2NjIxMzksImV4cCI6MjA2MTIzODEzOX0.4JZ_zHLCV2fJs872P5PB-9h0ZGFgLsXdksIajkrPrKU",
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
      <h1>Имате бизнес, но още нямате сайт?</h1>
      <p>
        <strong>Получете модерен уебсайт до 48 часа – от 350 лв.</strong>
      </p>

      <div className="cta">
        🎯 <a href="#contact">Изпрати запитване сега</a> и получи оферта до 24 часа!
      </div>

      <h2>Какво включва:</h2>
      <ul>
        <li>Регистрация на домейн и сетъп на ДНС сървери</li>
        <li>Хостинг</li>
        <li>Модерен и адаптивен дизайн</li>
        <li>До 3 страници (Начало, За нас, Контакт)</li>
        <li>Контактна форма и Google карта</li>
        <li>SEO заглавия и описания</li>
        <li>2 рунда ревизии</li>
      </ul>

      <h2>Примери от реални проекти:</h2>
      <div className="projects">
        <img src="example1.png" alt="Примерен сайт 1" />
        <img src="example2.png" alt="Примерен сайт 2" />
      </div>

      <h2>Отзиви:</h2>
      <div className="testimonial">
        "Сайтът беше готов за два дни, изглежда страхотно и вече получавам
        клиенти!" – Иван, собственик на автосервиз
      </div>

      <h2>За мен:</h2>
      <p>
        Казвам се Мартин и съм уеб разработчик с 5+ години опит. Помагам на
        малки бизнеси да започнат онлайн с качествени и достъпни решения.
      </p>

      <h2 id="contact">Свържи се с мен:</h2>
      <form className="contact-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Вашето име"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Имейл за връзка"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <textarea
          name="create_website"
          placeholder="Какъв сайт ви трябва?"
          value={formData.create_website}
          onChange={handleChange}
          required
        ></textarea>
        <button type="submit">Изпрати запитване</button>
        <p style={{ marginTop: "10px" }}>{status}</p>
      </form>
    </div>
  );
};

export default BusinessLanding;
