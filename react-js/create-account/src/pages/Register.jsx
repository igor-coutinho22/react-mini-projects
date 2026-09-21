import { useState } from "react";
import { createUser } from "../services/userService";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password.length < 6) {
      setError("The password must be at least 6 characters long.");
      return;
    }

    if (password !== confirm) {
      setError("The passwords do not match.");
      return;
    }

    const result = createUser({ name, email, password });

    if (!result.success) {
      setError(result.message);
      return;
    }

    setSuccess("Account created successfully!");
    setName("");
    setEmail("");
    setPassword("");
    setConfirm("");
  }

  return (
    <div className="page">
      <div className="card">
        <h1 className="title">Account Creation</h1>

        <p className="subtitle">
          Register a user.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="field">
            <label>Name</label>
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
              placeholder="At least 6 characters"
              required
            />
          </div>

          <div className="field">
            <label>Confirm Password</label>
            <input
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
            />
          </div>

          <button className="btn" type="submit">
            Create Account
          </button>

          {error && <p className="msg error">{error}</p>}
          {success && <p className="msg success">{success}</p>}
        </form>
      </div>
    </div>
  );
}
