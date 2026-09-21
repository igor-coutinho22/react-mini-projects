import { useState } from "react";
import { createUser, deleteUser, getUsers } from "../services/userService";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function getPasswordStrength(password) {
  let score = 0;
  if (password.length >= 6) score++;
  if (password.length >= 10) score++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 1) return { level: 1, label: "Weak" };
  if (score <= 3) return { level: 2, label: "Medium" };
  return { level: 3, label: "Strong" };
}

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [users, setUsers] = useState(() => getUsers());

  const emailValid = email === "" ? null : EMAIL_REGEX.test(email);
  const passwordsMatch = confirm === "" ? null : password === confirm;
  const strength = password === "" ? null : getPasswordStrength(password);

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
    setUsers(getUsers());
    setName("");
    setEmail("");
    setPassword("");
    setConfirm("");
  }

  function handleDelete(id) {
    deleteUser(id);
    setUsers(getUsers());
  }

  // clears the previous submit's feedback as soon as the user edits the form again
  function handleFieldChange(setter) {
    return (e) => {
      setter(e.target.value);
      setError("");
      setSuccess("");
    };
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
              onChange={handleFieldChange(setName)}
              placeholder="ex: Igor"
              required
            />
          </div>

          <div className="field">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={handleFieldChange(setEmail)}
              placeholder="ex: igor@example.com"
              required
            />
            {emailValid !== null && (
              <span className={`field-hint ${emailValid ? "hint-valid" : "hint-invalid"}`}>
                {emailValid ? "✓ Valid email" : "✗ Invalid email format"}
              </span>
            )}
          </div>

          <div className="field">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={handleFieldChange(setPassword)}
              placeholder="At least 6 characters"
              required
            />
            {strength && (
              <div className="strength-meter">
                <div className={`strength-bar strength-level-${strength.level}`}>
                  <span />
                  <span />
                  <span />
                </div>
                <span className="strength-label">{strength.label}</span>
              </div>
            )}
          </div>

          <div className="field">
            <label>Confirm Password</label>
            <input
              type="password"
              value={confirm}
              onChange={handleFieldChange(setConfirm)}
              required
            />
            {passwordsMatch !== null && (
              <span className={`field-hint ${passwordsMatch ? "hint-valid" : "hint-invalid"}`}>
                {passwordsMatch ? "✓ Passwords match" : "✗ Passwords don't match"}
              </span>
            )}
          </div>

          <button className="btn" type="submit">
            Create Account
          </button>

          {error && <p className="msg error">{error}</p>}
          {success && <p className="msg success">{success}</p>}
        </form>
      </div>

      <div className="card">
        <h2 className="title title-small">Registered Users ({users.length})</h2>

        {users.length === 0 ? (
          <p className="subtitle">No users registered yet.</p>
        ) : (
          <ul className="user-list">
            {users.map((u) => (
              <li key={u.id} className="user-item">
                <div>
                  <strong>{u.name}</strong>
                  <span className="user-email">{u.email}</span>
                </div>
                <button
                  className="btn btn-small btn-danger"
                  onClick={() => handleDelete(u.id)}
                  type="button"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
