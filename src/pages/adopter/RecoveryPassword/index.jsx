import logo from "../../../assets/logo/logo-white.png";
import { Input } from "../../../components/Input";
import { Button } from "../../../components/Button";
function RecoveryPassword() {
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
            <form className="RecoveryPassword__forms">
              <h2 className="RecoveryPassword__forms--title">
                Recuperar Senha
              </h2>

              <Input type="text" placeholder="Email" />

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
