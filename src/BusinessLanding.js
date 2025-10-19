import React from "react";
import "./AILanding.css";

const AILanding = () => {
  return (
    <div className="container">
      <header>
        <h1>Изкуствен интелект за начинаещи + готови AI prompts</h1>
        <p>Научете как да използвате AI и получете готови команди, които работят веднага!</p>
      </header>

      <section className="offer">
        <h2>Какво ще получите:</h2>
        <ul>
          <li><strong>Ebook:</strong> Основи на AI, топ 10 инструмента, практични примери за България</li>
          <li><strong>Prompt Pack:</strong> 10–20 готови ChatGPT / AI команди за маркетинг, социални мрежи, имейли и съдържание</li>
          <li>Лесно сваляне веднага след покупка</li>
        </ul>
      </section>

      <section className="cta">
        <h2>Вземете своя пакет сега!</h2>
        <p><strong>Цена: BGN 30</strong></p>
        <a href="      'https://www.paypal.com/sdk/js?client-id=BAAVYiC-srs0QQ7eQzFSPWsDfdJxKxthYO920jVotBhncf-yHaoRwrA_AOdHpsvzPCvCzWsQxa6UzGm5gA&components=hosted-buttons&disable-funding=venmo&currency=EUR';
" className="btn">Купи сега</a>
      </section>

      <section className="bonus">
        <h3>Бонус:</h3>
        <p>Абонирайте се за нашия бюлетин и получете 5 допълнителни AI prompts безплатно!</p>
      </section>

      <section className="testimonials">
        <h2>Какво казват хората:</h2>
        <p>„Прекрасен ресурс! Научих бързо как да използвам AI за бизнес задачите си.“ – Иван П.</p>
        <p>„Prompt pack-ът ми спести часове работа!“ – Мария С.</p>
      </section>

      <footer>
        <p>© 2025 AI Bulgaria | Всички права запазени</p>
      </footer>
    </div>
  );
};

export default AILanding;
