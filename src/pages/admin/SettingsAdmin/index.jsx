import axios from "axios";
import { useState, useEffect, useRef, useMemo } from "react";
import { AiFillCamera, AiOutlineClose } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
import Modal from "react-modal";

import { AlertMessage } from "../../../components/Alert";
import { Button } from "../../../components/Button";
import { Footer } from "../../../components/Footer";
import { Header } from "../../../components/Header";
import { Input } from "../../../components/Input";

import photoBig from "../../../assets/avatar/avatar-big.jpg";

import { useLoader } from "../../../context/loadercontext";
import api from "../../../services/api";
import { isLogout, isUserLogin } from "../../../services/auth";
import Permission from "../../../utils/Permission";

const initialState = {
  cpf: "",
  cep: "",
  phone: "",
  id: "",
  name: "",
  avatar: "",
  email: "",
  birthday: "",
  gender: "",
  address: "",
  complement: "",
  district: "",
  city: "",
  uf: "",
  number: "",
};

function SettingsAdmin() {
  const address = useRef(null);
  const district = useRef(null);
  const { HandlerLoader } = useLoader();
  const [user, setUser] = useState(initialState);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [alter, setAlter] = useState({
    cpf: "",
    email: "",
  });
  const [image, setImage] = useState(null);

  const preview = useMemo(() => {
    return image ? URL.createObjectURL(image) : null;
  }, [image]);

  useEffect(() => {
    api.get("/users/profile").then((response) => {
      setUser({ ...response.data, complement: response.data.complement || "" });
      setAlter({ cpf: response.data.cpf, email: response.data.email });
    });
  }, []);

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      borderRadius: "16px",
      padding: "16px",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  function openModal(event) {
    setIsOpen(true);
    event.preventDefault();
  }

  function closeModal(event) {
    setIsOpen(false);
    event.preventDefault();
  }

  function changeEdit(event) {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  }

  async function searchCep(event) {
    event.preventDefault();
    HandlerLoader(true);
    const apiCep = `https://viacep.com.br/ws/${user.cep}/json/`;
    const response = await axios.get(apiCep);
    const { logradouro, localidade, uf, bairro } = response.data;
    setUser({
      ...user,
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

  async function EditUser(event) {
    event.preventDefault();
    HandlerLoader(true);
    try {
      const instanceForm = new FormData();
      instanceForm.append("name", user.name);
      instanceForm.append("email", user.email);
      instanceForm.append("cpf", user.cpf);
      instanceForm.append("phone", user.phone);
      instanceForm.append("cep", user.cep);
      instanceForm.append("address", `${user.address},${user.number}`);
      instanceForm.append("city", user.city);
      instanceForm.append("uf", user.uf);
      instanceForm.append("district", user.district);
      if (image) instanceForm.append("media", image);
      if (user.password) instanceForm.append("password", user.password);
      if (user.oldPassword)
        instanceForm.append("oldPassword", user.oldPassword);
      if (user.confirmPassword)
        instanceForm.append("confirmPassword", user.confirmPassword);
      const response = await api.put("/users", instanceForm);
      if (user.email != alter.email || user.cpf != alter.cpf || user.password) {
        return isLogout();
      }

      isUserLogin(response.data.user);
      AlertMessage(response.data.message, response.data.background);
      window.location.reload();
      window.scrollTo({ top: 0 });
    } catch (error) {
      const data = error.response.data;
      AlertMessage(data.message, data.background);
    } finally {
      HandlerLoader(false);
    }
  }

  return (
    <>
      <Header />
      <section className="container" id="settingsAdmin">
        <div className="row">
          <div className="col-md-12">
            <div className="settingsAdmin__container">
              <h1 className="settingsAdmin__container--title">Configurações</h1>
              <div className="settingsAdmin__content">
                <form autoComplete="off" onSubmit={EditUser}>
                  <div className="settingsAdmin__header">
                    <div className="settingsAdmin__image">
                      <div className="settingsAdmin__image--circle">
                        {image ? (
                          <img src={preview} />
                        ) : !user?.avatar ? (
                          <FaUserCircle />
                        ) : (
                          <img src={user.avatar} alt="avatar" />
                        )}

                        <label className="label--camera">
                          <input
                            type="file"
                            name="myfile"
                            onChange={(event) =>
                              setImage(event.target.files[0])
                            }
                          />
                          <AiFillCamera />
                        </label>

                        <Modal
                          isOpen={modalIsOpen}
                          onRequestClose={closeModal}
                          style={customStyles}
                          contentLabel="Example Modal"
                        >
                          <Button color="camera" onClick={closeModal}>
                            <AiOutlineClose />
                          </Button>
                          <img
                            src={photoBig}
                            alt="usuario"
                            className="image-modal"
                          />
                        </Modal>
                      </div>
                    </div>
                    <div className="settingsAdmin__name">
                      <label htmlFor="name">Nome</label>
                      <Input
                        type="text"
                        placeholder=""
                        id="name"
                        value={user?.name}
                        onChange={changeEdit}
                        name="name"
                      />
                    </div>
                  </div>
                  <div className="settingsAdmin__body">
                    <label htmlFor="cpf">CPF</label>
                    <Input
                      type="text"
                      mask="cpf"
                      name="cpf"
                      value={user?.cpf}
                      onChange={changeEdit}
                      maxLength={14}
                      id="cpf"
                    />
                    <label htmlFor="Phone">Telefone</label>
                    <Input
                      type="text"
                      placeholder=""
                      id="Phone"
                      maxLength={15}
                      mask="phone"
                      value={user?.phone}
                      onChange={changeEdit}
                      name="phone"
                    />

                    <label htmlFor="Email">Email</label>
                    <Input
                      type="text"
                      placeholder=""
                      id="Email"
                      value={user?.email}
                      onChange={changeEdit}
                      name="email"
                    />

                    <div className="settingsAdmin__cep">
                      <div className="settingsAdmin__cep--container">
                        <label htmlFor="Cep">CEP</label>
                        <Input
                          type="text"
                          placeholder=""
                          id="Cep"
                          value={user?.cep}
                          onChange={changeEdit}
                          name="cep"
                          mask="cep"
                          maxLength={9}
                        />
                      </div>

                      <Button
                        className="c-button c-button--primary"
                        type="button"
                        onClick={searchCep}
                      >
                        Buscar
                      </Button>
                    </div>

                    <label htmlFor="Address">Endereço</label>
                    <Input
                      type="text"
                      placeholder=""
                      id="Address"
                      value={user?.address}
                      onChange={changeEdit}
                      name="address"
                      ref={address}
                    />

                    <label htmlFor="District">Bairro</label>
                    <Input
                      type="text"
                      placeholder=""
                      id="District"
                      value={user?.district}
                      onChange={changeEdit}
                      name="district"
                      ref={district}
                    />

                    <label htmlFor="Number">Número</label>
                    <Input
                      type="text"
                      placeholder=""
                      id="Number"
                      value={user?.number}
                      onChange={changeEdit}
                      name="number"
                    />

                    <label htmlFor="Complement">Complemento</label>
                    <Input
                      type="text"
                      placeholder=""
                      id="Complement"
                      value={user?.complement}
                      onChange={changeEdit}
                      name="complement"
                    />

                    <label htmlFor="uf">Estado</label>
                    <Input
                      type="text"
                      placeholder=""
                      id="uf"
                      value={user?.uf}
                      onChange={changeEdit}
                      name="uf"
                      disabled
                    />

                    <label htmlFor="City">Cidade</label>
                    <Input
                      type="text"
                      placeholder=""
                      id="City"
                      value={user?.city}
                      onChange={changeEdit}
                      name="city"
                      disabled
                    />

                    <label htmlFor="PasswordCurrent">Senha Atual</label>
                    <Input
                      password
                      placeholder=""
                      id="PasswordCurrent"
                      value={user?.oldPassword}
                      onChange={changeEdit}
                      name="oldPassword"
                      autoComplete="new-password"
                    />
                    <label htmlFor="NewPassword">Nova Senha</label>
                    <Input
                      password
                      placeholder=""
                      id="NewPassword"
                      value={user?.password}
                      onChange={changeEdit}
                      name="password"
                    />
                    <label htmlFor="ConfirmationPassword">
                      Confirmar Senha
                    </label>
                    <Input
                      password
                      placeholder=""
                      id="ConfirmationPassword"
                      value={user?.confirmPassword}
                      onChange={changeEdit}
                      name="confirmPassword"
                    />
                  </div>

                  <Button color="primary">Salvar Alterações</Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Permission(["admin"])(SettingsAdmin);
