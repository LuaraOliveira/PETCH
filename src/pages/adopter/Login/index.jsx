import logo from "../../../assets/logo/logo-white.png";
import { Input } from "../../../components/Input";
import api from "../../../services/api";
import { isLogin } from "../../../services/auth";
import { Button } from "../../../components/Button";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
function LoginAdopter() {
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
      <section className="loginAdopter">
        <div className="loginAdopter__container">
          <div className="loginAdopter__content">
            <div className="loginAdopter__header">
              <img src={logo} alt="Petch" />
              <p className="loginAdopter__header-title">
                Dê match no seu novo amigo de quatro patas.
              </p>
            </div>
            <form className="loginAdopter__forms">
              <Input
                type="text"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <Input
                password
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <div className="loginAdopter__buttons">
                <Button color="third" onClick={login}>
                  Entrar
                </Button>
              </div>

              <div className="loginAdopter__outher">
                <div className="loginAdopter__outher-line"></div>
                <p className="loginAdopter__outher-title">ou</p>
                <div className="loginAdopter__outher-line"></div>
              </div>
              <div className="loginAdopter__google">
                <GoogleLogin
                  clientId={process.env.REACT_APP_GOOGLE_CLOUD_SECURITY_ID}
                  onSuccess={AccessLogin}
                />

                <Link to="/" className="loginAdopter__google-link">
                  Esqueceu a senha?
                </Link>

                <Link to="/" className="loginAdopter__google-link">
                  Não tem conta? <strong>Cadastre-se</strong>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
export default LoginAdopter;
