import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";

// Ponto de entrada da aplicação React.
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // BrowserRouter ativa a navegação por rotas (URLs) na aplicação
  // App contém o mapa de rotas e componentes principais
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
