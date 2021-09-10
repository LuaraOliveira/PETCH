import { useState, useEffect } from "react";
import api from "../../../services/api";
import { isLogin, setRole, getRole } from "../../../services/auth";
import logo from "../../../assets/logo/logo.svg";
import { Button } from "../../../components/Button";
import { Input } from "../../../components/Input";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  useEffect(() => {
    if (getRole() !== undefined) {
      if (getRole()?.toLowerCase() === "Adotante") {
        return history.push("/dashboard");
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
        : history.push("/dashboard");
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

              <Link to="/" className="login__forms-link">
                Esqueceu seu acesso?
              </Link>
              <Button color="primary" onClick={login}>
                Entrar
              </Button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
export default Login;
