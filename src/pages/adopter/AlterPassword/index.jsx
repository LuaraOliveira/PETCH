import logo from "../../../assets/logo/logo-white.png";
import { Input } from "../../../components/Input";
import { Button } from "../../../components/Button";
import { useState } from "react";
import api from "../../../services/api";
import { useHistory } from "react-router-dom";
import { AlertMessage } from "../../../components/Alert";
function AlterPassword() {
  const [email, setEmail] = useState("");
  const history = useHistory();

  async function sendEmail(event) {
    event.preventDefault();
    try {
      const response = await api.post("/auth/forgot", { email });
      AlertMessage(response.data.message, response.data.background);
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
              <h2 className="RecoveryPassword__forms--title">Alterar Senha</h2>

              <Input password placeholder="Senha Atual" />

              <Input password placeholder="Nova Senha" />

              <Input password placeholder="Confirmar Senha" />

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
