import logo from "../../../assets/logo/logo-white.png";
import { Input } from "../../../components/Input";
import { Button } from "../../../components/Button";
import api from "../../../services/api";
import { useHistory } from "react-router-dom";
import { useState, useRef } from "react";
import { Alert } from "../../../components/Alert";
import axios from "axios";
function RegisterAdopter() {
  const address = useRef(null);
  const district = useRef(null);
  const data = JSON.parse(localStorage.getItem("dados"));
  const history = useHistory();
  const [alert, setAlert] = useState({
    message: "",
    status: "",
    background: "",
  });
  const [register, setRegister] = useState({
    name: data?.name || "",
    email: data?.email || "",
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

  async function searchCep(event) {
    event.preventDefault();
    const apiCep = `https://viacep.com.br/ws/${register.cep}/json/`;
    const response = await axios.get(apiCep);
    const { logradouro, localidade, uf, bairro } = response.data;
    setRegister({
      ...register,
      address: logradouro,
      city: localidade,
      district: bairro,
      uf,
    });
    !address.current?.value
      ? address.current?.removeAttribute("disabled")
      : address.current?.setAttribute("disabled", "false");

    !district.current?.value
      ? district.current?.removeAttribute("disabled")
      : district.current?.setAttribute("disabled", "false");
  }

  async function CadastrarUsuario(event) {
    event.preventDefault();
    try {
      const response = await api.post("/auth/register", {
        ...register,
        googleId: data?.googleId,
        address: `${register.address},${register.number}`,
        birthday: register.birthday.split("/").reverse().join("-"),
      });
      localStorage.removeItem("dados");
      window.location.href = "/";
    } catch (error) {
      const { data } = error.response;
      setAlert({
        message: data.message,
        status: String(data.status || data.statusCode),
        background: "error",
      });
    }
  }

  function closeAlert() {
    setAlert({ message: "", status: "", background: "" });
  }

  return (
    <>
      <Alert background={alert.background} onClick={closeAlert}>
        {alert.message}
      </Alert>
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
            <h2 className="RegisterAdopter__forms--title">Cadastro</h2>
            <form
              onSubmit={CadastrarUsuario}
              className="RegisterAdopter__forms"
            >
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

              <div className="RegisterAdopter__forms--adresscep">
                <Input
                  type="text"
                  placeholder="CEP"
                  value={register.cep}
                  onChange={change}
                  name="cep"
                  mask="cep"
                  maxLength={9}
                />
                <Button color="light" onClick={searchCep}>
                  Consultar
                </Button>
              </div>

              <div className="RegisterAdopter__forms--address">
                <Input
                  type="text"
                  placeholder="Endereço"
                  name="address"
                  onChange={change}
                  value={register.address}
                  ref={address}
                  disabled
                />
              </div>

              <div className="RegisterAdopter__forms--double">
                <Input
                  type="text"
                  placeholder="Bairro"
                  name="district"
                  onChange={change}
                  ref={district}
                  value={register.district}
                />
                <Input
                  type="text"
                  placeholder="Complemento"
                  name="complement"
                  onChange={change}
                  value={register.complement}
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
                  disabled
                />

                <Input
                  type="text"
                  placeholder="Estado"
                  name="uf"
                  onChange={change}
                  disabled
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
                <Button color="third" type="submit">
                  Cadastrar
                </Button>
                <Button
                  color="third"
                  onClick={() => history.push("/")}
                  type="button"
                >
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
