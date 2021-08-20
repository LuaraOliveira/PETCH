import { GoogleLogin } from "react-google-login";
import { useState } from "react";
import api from "../../services/api";

import { Input } from "../../components/Input";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function login() {
    try {
      const response = await api.post("/auth/login", { email, password });
      console.log(response);
    } catch (error) {
      console.log(error.response);
    }
  }

  return (
    <>
      <section className="login">
        <div className="login__container">
          <div className="login__content">
            <div className="login__header">
              <h1 className="login__header-title">Petch</h1>
            </div>
            <form className="login__forms">
              <Input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <Input
                password
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <a href="#" className="login__forms-link">
                Esqueceu seu acesso?
              </a>

              <button
                type="button"
                className="login__forms-btn"
                onClick={login}
              >
                Entrar
              </button>
              <GoogleLogin
                clientId={process.env.REACT_APP_GOOGLE_CLOUD_SECURITY_ID}
                onSuccess={(e) => console.log(e)}
              />
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
