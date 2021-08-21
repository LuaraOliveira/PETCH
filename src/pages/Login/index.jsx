import { GoogleLogin } from "react-google-login";
import { useState } from "react";
import api from "../../services/api";
import { isLogin } from "../../services/auth";

import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { useHistory } from "react-router-dom";
export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function login() {
    try {
      const response = await api.post("/auth/login", { email, password });
      isLogin(response.data.token);
    } catch (error) {
      console.log(error.response);
    }
  }

  const history = useHistory();

  function handleClick() {
    history.push("/dashboard");
  }

  async function AccessLogin(param) {
    const { name, email, googleId, imageUrl: avatar } = param.profileObj;

    try {
      const response = await api.post("/auth/login/google", {
        name,
        email,
        googleId,
        avatar,
      });
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
              <Button
                color="primary"
                onClick={login}
                // onClick={handleClick}
              >
                Entrar
              </Button>

              <GoogleLogin
                clientId={process.env.REACT_APP_GOOGLE_CLOUD_SECURITY_ID}
                onSuccess={AccessLogin}
              />
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
