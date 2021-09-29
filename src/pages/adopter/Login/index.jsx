import logo from "../../../assets/logo/logo-white.png";
import { Input } from "../../../components/Input";
import api from "../../../services/api";
import { isLogin, setRole, getRole } from "../../../services/auth";
import { Button } from "../../../components/Button";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { useGoogleLogin } from "react-google-login";
import { FaGoogle } from "react-icons/fa";
function LoginAdopter() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const { signIn } = useGoogleLogin({
    clientId: process.env.REACT_APP_GOOGLE_CLOUD_SECURITY_ID,
    onSuccess: AccessLogin,
  });
  useEffect(() => {
    if (getRole() !== undefined) {
      if (getRole()?.toLowerCase() === "Adotante") {
        return history.push("/adopter/dashboard");
      }
      if (getRole()?.toLowerCase() === "Admin") {
        return history.push("/admin/dashboard");
      }
    }
  }, []);
  async function login(e) {
    e.preventDefault();
    try {
      const response = await api.post("/auth/login", { email, password });
      isLogin(response.data.token);
      setRole(response.data.role);
      response.data.role === "Admin"
        ? history.push("/admin/dashboard")
        : history.push("/adopter/dashboard");
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
      isLogin(response.data.token);
      setRole(response.data.role);
      response.data.role === "Admin"
        ? history.push("/admin/dashboard")
        : history.push("/adopter/dashboard");
    } catch (error) {
      console.log(error.response);
    }
  }

  return (
    <>
      <section className="loginAdopter">
        <div className="loginAdopter__image"></div>
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
                <Button color="google" onClick={signIn}>
                  <div style={{ color: "blue" }}>
                    <FaGoogle size={32} />
                  </div>
                  Entrar com o google
                </Button>
              </div>
              <div className="loginAdopter__link">
                <Link
                  to="/Adopter/RecoveryPassword"
                  className="loginAdopter__link-link"
                >
                  Esqueceu a senha?
                </Link>

                <Link
                  to="/Adopter/Register"
                  className="loginAdopter__link-link"
                >
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
