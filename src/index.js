import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App"; // or your main component
import "./index.css"; // optional CSS

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

