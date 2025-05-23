import axios from "axios";
import { useState, useRef } from "react";
import { useHistory } from "react-router-dom";

import { AlertMessage } from "../../../components/Alert";
import { Button } from "../../../components/Button";
import { Input } from "../../../components/Input";
import { Select } from "../../../components/Select";

import { useLoader } from "../../../context/loadercontext";
import logo from "../../../assets/logo/logo-white.png";
import api from "../../../services/api";

function RegisterAdopter() {
  const history = useHistory();
  const { HandlerLoader } = useLoader();
  const address = useRef(null);
  const district = useRef(null);
  const data = JSON.parse(localStorage.getItem("dados"));

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
  });

  function change(event) {
    setRegister({
      ...register,
      [event.target.name]: event.target.value,
    });
  }

  async function searchCep(event) {
    event.preventDefault();
    HandlerLoader(true);
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

    HandlerLoader(false);
  }

  async function CadastrarUsuario(event) {
    event.preventDefault();
    HandlerLoader(true);
    try {
      const response = await api.post("/auth/register", {
        ...register,
        googleId: data?.googleId,
        address: `${register.address},${register.number}`,
        birthday: register.birthday.split("/").reverse().join("-"),
      });

      AlertMessage(response.data.message, response.data.background);
      localStorage.removeItem("dados");
      window.location.href = "/";
    } catch (error) {
      const data = error.response.data;
      AlertMessage(data.message, data.background);
    } finally {
      HandlerLoader(false);
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
                <Select value={register.gender} onChange={change} name="gender">
                  {" "}
                  <option defaultChecked value="" disabled>
                    Selecione o gênero
                  </option>
                  <option value="F">F</option>
                  <option value="M">M</option>
                  <option value="O">O</option>
                </Select>

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
                <Button color="light" onClick={searchCep} type="button">
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
