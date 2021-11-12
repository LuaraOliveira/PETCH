import { useState } from "react";
import { useHistory } from "react-router-dom";

import { AlertMessage } from "../../../components/Alert";
import { Button } from "../../../components/Button";
import { Input } from "../../../components/Input";

import logo from "../../../assets/logo/logo-white.png";

import api from "../../../services/api";

function RecoveryPassword() {
  const history = useHistory();

  const [email, setEmail] = useState("");

  async function sendEmail(event) {
    event.preventDefault();
    try {
      const response = await api.post("/auth/forgot", { email });
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
            <form onSubmit={sendEmail} className="RecoveryPassword__forms">
              <h2 className="RecoveryPassword__forms--title">
                Recuperar Senha
              </h2>

              <Input
                type="text"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />

              <div className="RecoveryPassword__buttons">
                <Button color="third">Redefinir Senha</Button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
export default RecoveryPassword;
