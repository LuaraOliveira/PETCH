import logo from "../../../assets/logo/logo-white.png";
import { Input } from "../../../components/Input";
import { Button } from "../../../components/Button";
import { Link } from "react-router-dom";
function RegisterAdopter() {
  return (
    <>
      <section className="RegisterAdopter">
        <div className="RegisterAdopter__image"></div>
        <div className="RegisterAdopter__container">
          <div className="RegisterAdopter__content">
            <div className="RegisterAdopter__header">
              <img src={logo} alt="Petch" />
              <p className="RegisterAdopter__header-title">
                Dê match no seu novo amigo de quatro patas.
              </p>
            </div>
            <form className="RegisterAdopter__forms">
              <h2 className="RegisterAdopter__forms--title">Cadastro</h2>
              <div className="RegisterAdopter__forms--double">
                <Input type="text" placeholder="Nome" />

                <Input type="text" placeholder="Email" />
              </div>

              <div className="RegisterAdopter__forms--double">
                <Input type="text" placeholder="Telefone" />

                <Input type="text" placeholder="Data de Nascimento" />
              </div>

              <div className="RegisterAdopter__forms--double">
                <Input type="text" placeholder="Gênero" />

                <Input type="text" placeholder="CPF" />
              </div>

              <div className="RegisterAdopter__forms--address">
                <Input type="text" placeholder="CEP" />

                <Input type="text" placeholder="Endereço" />

                <Input type="text" placeholder="Complemento" />

                <Input type="text" placeholder="Bairro" />
              </div>

              <div className="RegisterAdopter__forms--three">
                <Input type="text" placeholder="Número" />

                <Input type="text" placeholder="Cidade" />

                <Input type="text" placeholder="Estado" />
              </div>

              <div className="RegisterAdopter__forms--double">
                <Input password placeholder="Senha" />

                <Input password placeholder="Confirmar Senha" />
              </div>

              <div className="RegisterAdopter__buttons">
                <Button color="third">Cadastrar</Button>
                <Button color="third" to="/">
                  Voltar
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
export default RegisterAdopter;
