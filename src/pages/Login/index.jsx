import { GoogleLogin } from "react-google-login";
import { useState } from "react";
import api from "../../services/api";
import { isLogin } from "../../services/auth";
import logo from "../../assets/logo/logo.svg";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { useHistory } from "react-router-dom";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  async function login(e) {
    e.preventDefault();
    try {
      const response = await api.post("/auth/login", { email, password });
      isLogin(response.data.token);
      history.push("/dashboard");
    } catch (error) {
      console.log(error.response);
    }
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
              <img src={logo} alt="Petch" />
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
              <Button color="primary" onClick={login}>
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
export default Login;
