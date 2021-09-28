import logo from "../../../assets/logo/logo-white.png";
import { Input } from "../../../components/Input";
import { Button } from "../../../components/Button";
import api from "../../../services/api";
import { useState } from "react";
function RegisterAdopter() {
  const [register, setRegister] = useState({
    name: "",
    email: "",
    cpf: "",
    birthday: "",
    gender: "",
    cep: "",
    address: "",
    district: "",
    complement: "",
    city: "",
    uf: "",
    phone: "",
    number: "",
    password: "",
    confirmPassword: "",
  });

  function change(event) {
    setRegister({
      ...register,
      [event.target.name]: event.target.value,
    });
  }

  async function CadastrarUsuario(event) {
    event.preventDefault();
    try {
      const instanceForm = new FormData();
      const birthday = register.birthday.split("/").reverse().join("-");
      instanceForm.append("name", register.name);
      instanceForm.append("email", register.email);
      instanceForm.append("cpf", register.cpf);
      instanceForm.append("birthday", birthday);
      instanceForm.append("gender", register.gender);
      instanceForm.append("cep", register.cep);
      instanceForm.append("address", `${register.address},${register.number}`);
      instanceForm.append("district", register.district);
      instanceForm.append("complement", register.complement);
      instanceForm.append("city", register.city);
      instanceForm.append("uf", register.uf);
      instanceForm.append("phone", register.phone);
      instanceForm.append("password", register.password);
      instanceForm.append("confirmPassword", register.confirmPassword);
      // instanceForm.append("media", image);
      const response = await api.post("/auth/register", instanceForm);
      console.log(response.data);
    } catch (error) {
      console.log(error.response);
    }
  }
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
            <form
              onSubmit={CadastrarUsuario}
              className="RegisterAdopter__forms"
            >
              <h2 className="RegisterAdopter__forms--title">Cadastro</h2>
              <div className="RegisterAdopter__forms--double">
                <Input
                  type="text"
                  placeholder="Nome"
                  name="name"
                  onChange={change}
                  value={register.name}
                />

                <Input
                  type="text"
                  placeholder="Email"
                  name="email"
                  onChange={change}
                  value={register.email}
                />
              </div>

              <div className="RegisterAdopter__forms--double">
                <Input
                  type="text"
                  placeholder="Telefone"
                  name="phone"
                  onChange={change}
                  value={register.phone}
                  maxLength={15}
                  mask="phone"
                />

                <Input
                  type="text"
                  placeholder="Data de Nascimento"
                  name="birthday"
                  onChange={change}
                  value={register.birthday}
                  mask="birthday"
                  maxLength={10}
                />
              </div>

              <div className="RegisterAdopter__forms--double">
                <Input
                  type="text"
                  placeholder="Gênero"
                  name="gender"
                  onChange={change}
                  value={register.gender}
                />

                <Input
                  type="text"
                  placeholder="CPF"
                  mask="cpf"
                  name="cpf"
                  onChange={change}
                  value={register.cpf}
                  maxLength={14}
                />
              </div>

              <div className="RegisterAdopter__forms--address">
                <Input
                  type="text"
                  placeholder="CEP"
                  mask="cep"
                  name="cep"
                  onChange={change}
                  value={register.cep}
                  maxLength={9}
                />

                <Input
                  type="text"
                  placeholder="Endereço"
                  name="address"
                  onChange={change}
                  value={register.address}
                />

                <Input
                  type="text"
                  placeholder="Complemento"
                  name="complement"
                  onChange={change}
                  value={register.complement}
                />

                <Input
                  type="text"
                  placeholder="Bairro"
                  name="district"
                  onChange={change}
                  value={register.district}
                />
              </div>

              <div className="RegisterAdopter__forms--three">
                <Input
                  type="text"
                  placeholder="Número"
                  name="number"
                  onChange={change}
                  value={register.number}
                />

                <Input
                  type="text"
                  placeholder="Cidade"
                  name="city"
                  onChange={change}
                  value={register.city}
                />

                <Input
                  type="text"
                  placeholder="Estado"
                  name="uf"
                  onChange={change}
                  value={register.uf}
                />
              </div>

              <div className="RegisterAdopter__forms--double">
                <Input
                  password
                  placeholder="Senha"
                  name="password"
                  onChange={change}
                  value={register.password}
                />

                <Input
                  password
                  placeholder="Confirmar Senha"
                  name="confirmPassword"
                  onChange={change}
                  value={register.confirmPassword}
                />
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
