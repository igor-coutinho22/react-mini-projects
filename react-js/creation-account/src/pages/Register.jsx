/* Este componente utiliza estado local para controlar um formulário de registo.
Antes de criar o utilizador, faço validações no front-end, como tamanho da password e confirmação.
A lógica de persistência está isolada num serviço, e o componente apenas reage ao resultado, mostrando mensagens de erro ou sucesso. */

//----------------------------------------------------------------------------------------------------------------------------------------

import { useState } from "react";
import { createUser } from "../services/userService";

// Página de registo de novos utilizadores
export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Função chamada ao submeter o formulário
  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password.length < 6) {
      setError("A password deve ter pelo menos 6 caracteres.");
      return;
    }

    if (password !== confirm) {
      setError("As passwords não coincidem.");
      return;
    }

    const result = createUser({ name, email, password });

    if (!result.success) {
      setError(result.message);
      return;
    }

    setSuccess("Conta criada com sucesso! ✅");
    setName("");
    setEmail("");
    setPassword("");
    setConfirm("");
  }

  return (
    <div className="page">
      <div className="card">
        {/* Título da página */}
        <h1 className="title">Criação de Conta</h1>

        {/* Texto introdutório */}
        <p className="subtitle">
          Regista um utilizador.
        </p>

        {/* Formulário de registo */}
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label>Nome</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="ex: Igor"
              required
            />
          </div>

          <div className="field">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ex: igor@exemplo.com"
              required
            />
          </div>

          <div className="field">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="mínimo 6 caracteres"
              required
            />
          </div>

          <div className="field">
            <label>Confirmar Password</label>
            <input
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
            />
          </div>

           {/* Botão de submissão */}
          <button className="btn" type="submit">
            Criar Conta
          </button>

          {/* Mensagens de erro e sucesso */}
          {error && <p className="msg error">{error}</p>}
          {success && <p className="msg success">{success}</p>}
        </form>
      </div>
    </div>
  );
}
