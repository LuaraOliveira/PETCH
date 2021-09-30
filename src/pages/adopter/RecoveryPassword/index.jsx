import logo from "../../../assets/logo/logo-white.png";
import { Input } from "../../../components/Input";
import { Button } from "../../../components/Button";
import { useState } from "react";
import api from "../../../services/api";
import { useHistory } from "react-router-dom";
function RecoveryPassword() {
  const [email, setEmail] = useState("");
  const history = useHistory();
  async function sendEmail(event) {
    event.preventDefault();
    try {
      await api.post("/auth/forgot", { email });
      history.push("/");
    } catch (error) {
      console.log(error.response);
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
