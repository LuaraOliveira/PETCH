import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { AlertMessage } from "../../../components/Alert";
import { Button } from "../../../components/Button";
import { Input } from "../../../components/Input";
import logo from "../../../assets/logo/logo-white.png";

import api from "../../../services/api";

function AlterPassword() {
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    const query = window.location.search;
    const params = new URLSearchParams(query);
    const token = params.get("token");
    const email = params.get("email");
    if (token && email) {
      window.history.pushState({}, "", "/adopter/AlterPassword");
    }
    setToken(token);
    setEmail(email);
  }, []);

  async function UpdatePassword(event) {
    event.preventDefault();
    try {
      await api.post(`/auth/reset`, {
        email,
        token,
        password,
        confirmPassword,
      });
      history.push("/");
    } catch (error) {
      const data = error.response.data;
      AlertMessage(data.message, data.background);
    }
  }

  return (
    <>
      <section className="RecoveryPassword">
        <div className="RecoveryPassword__image"></div>
        <div className="RecoveryPassword__container">
          <div className="RecoveryPassword__content">
            <div className="RecoveryPassword__header">
              <img src={logo} alt="Petch" />
              <p className="RecoveryPassword__header-title">
                Dê match no seu novo amigo de quatro patas.
              </p>
            </div>
            <form onSubmit={UpdatePassword} className="RecoveryPassword__forms">
              <h2 className="RecoveryPassword__forms--title">
                Alterar a Senha
              </h2>

              <Input
                password
                placeholder="Nova Senha"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />

              <Input
                password
                placeholder="Confirmar Senha"
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
              />

              <div className="RecoveryPassword__buttons">
                <Button color="third">Alterar Senha</Button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
export default AlterPassword;
