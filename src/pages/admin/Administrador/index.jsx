import axios from "axios";
import Cookie from "js-cookie";
import jspdf from "jspdf";
import autotable from "jspdf-autotable";
import { useState, useMemo, useRef } from "react";
import { BiUserCircle } from "react-icons/bi";
import { GrClose, GrImage } from "react-icons/gr";
import Modal from "react-modal";

import { AlertMessage } from "../../../components/Alert";
import { Breadcrumb } from "../../../components/Breadcrumb";
import { Button } from "../../../components/Button";
import { Footer } from "../../../components/Footer";
import { Header } from "../../../components/Header";

import { Input } from "../../../components/Input";

import { usePetch } from "../../../context/petchcontext";
import api from "../../../services/api";
import Permission from "../../../utils/Permission";

const initialState = {
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
};

function Administrador() {
  const breadCrumb = [
    { href: "#", link: "Menu Inicial" },
    { href: "#", link: "Administrador" },
  ];

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      width: "100%",
      maxHeight: "800px",
      maxWidth: "800px",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },

    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.84)",
    },
  };

  const user = Cookie.getJSON(process.env.REACT_APP_USER);

  const { admins, DataAdmins } = usePetch();

  const preview = useMemo(() => {
    return image ? URL.createObjectURL(image) : null;
  }, [image]);

  const address = useRef(null);
  const district = useRef(null);

  const [admin, setAdmin] = useState(undefined);
  const [image, setImage] = useState(null);
  const [register, setRegister] = useState(initialState);
  const [modalIsOpenRegister, setIsOpenRegister] = useState(false);
  const [modalIsOpenData, setIsOpenData] = useState(false);

  function closeModalData(event) {
    event.preventDefault();
    setIsOpenData(false);
    setAdmin(undefined);
  }

  function openModalRegister(event) {
    event.preventDefault();
    setIsOpenRegister(true);
  }

  function closeModalRegister(event) {
    event.preventDefault();
    setIsOpenRegister(false);
    setRegister(initialState);
    setImage(null);
  }

  function cancelButton(event) {
    event.preventDefault();
    setRegister(initialState);
    closeModalRegister(event);
  }

  async function registerUser(event) {
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
      instanceForm.append("media", image);
      const response = await api.post("/users", instanceForm);
      AlertMessage(response.data.message, response.data.background);
      closeModalRegister(event);
      DataAdmins();
    } catch (error) {
      const data = error.response.data;
      AlertMessage(data.message, data.background);
    }
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

  async function infoAdmin(id) {
    try {
      const response = await api.get(`/users/${id}?inactives=true`);
      setAdmin({ ...response.data });
      setIsOpenData(true);
      console.log(response);
    } catch (error) {
      const data = error.response.data;
      AlertMessage(data.message, data.background);
    }
  }

  function change(event) {
    setRegister({
      ...register,
      [event.target.name]: event.target.value,
    });
  }

  async function statusAdmin(user) {
    const status = user.deletedAt ? "true" : "false";
    try {
      await api.delete(`/users/${user.id}`, { params: { status } });
      DataAdmins();
    } catch (error) {}
  }

  function exportAdmins() {
    const pdf = new jspdf();
    const columns = [
      {
        header: "Nome",
        dataKey: "name",
      },
      {
        header: "Email",
        dataKey: "email",
      },
      {
        header: "Cpf",
        dataKey: "cpf",
      },
    ];
    autotable(pdf, { columns, body: admins });
    pdf.save(`${Date.now()}.pdf`);
  }
  return (
    <>
      <Header />
      <section className="container" id="administrador">
        <div className="row">
          <div className="col-md-12">
            <Breadcrumb list={breadCrumb} />
          </div>
          <div className="col-md-12">
            <div className="administrador__create">
              <div className="administrador__forms">
                <p className="administrador__forms-title">
                  Criar novo administrador
                </p>
                <div className="administrador__forms-content">
                  <Button onClick={openModalRegister}>
                    Adicionar administrador
                  </Button>
                  <Modal
                    isOpen={modalIsOpenRegister}
                    onRequestClose={closeModalRegister}
                    style={customStyles}
                    contentLabel="Example Modal"
                    portalClassName="admin"
                    ariaHideApp={false}
                  >
                    <div className="modal__container">
                      <div className="modal__container-close">
                        <button onClick={closeModalRegister}>
                          <GrClose />
                        </button>
                      </div>
                      <div className="modal__header">
                        <h2 className="modal__header-title">
                          Adicionar novo administrador
                        </h2>
                      </div>
                      <form onSubmit={registerUser} className="forms">
                        <div className="modal__body">
                          <div className="modal__image">
                            <label
                              className={preview ? "active" : ""}
                              style={{
                                backgroundImage: `url(${preview})`,
                              }}
                            >
                              <input
                                type="file"
                                className="modal__image-file"
                                name="myfile"
                                onChange={(event) =>
                                  setImage(event.target.files[0])
                                }
                              />
                              <GrImage />
                            </label>
                          </div>
                          <div className="modal__description">
                            <div className="modal__description-input">
                              <Input
                                type="text"
                                placeholder="Nome"
                                value={register.name}
                                onChange={change}
                                name="name"
                              />
                              <Input
                                type="text"
                                placeholder="Email"
                                value={register.email}
                                onChange={change}
                                name="email"
                              />
                              <Input
                                type="text"
                                placeholder="Telefone"
                                value={register.phone}
                                onChange={change}
                                name="phone"
                                mask="phone"
                                maxLength="15"
                              />
                              <Input
                                type="text"
                                placeholder="Data de Nascimento"
                                value={register.birthday}
                                onChange={change}
                                name="birthday"
                                mask="birthday"
                                maxLength={10}
                              />
                              <Input
                                type="text"
                                placeholder="Gênero"
                                value={register.gender}
                                onChange={change}
                                name="gender"
                              />
                              <Input
                                type="text"
                                placeholder="CPF"
                                value={register.cpf}
                                onChange={change}
                                name="cpf"
                                mask="cpf"
                                maxLength={14}
                              />
                            </div>
                          </div>

                          <div className="modal__cep">
                            <Input
                              type="text"
                              placeholder="CEP"
                              value={register.cep}
                              onChange={change}
                              name="cep"
                              mask="cep"
                              maxLength={9}
                            />
                            <Button
                              color="light"
                              onClick={searchCep}
                              type="button"
                            >
                              Consultar
                            </Button>
                          </div>
                          <div className="modal__address">
                            <Input
                              type="text"
                              placeholder="Endereço"
                              value={register.address}
                              ref={address}
                              onChange={change}
                              disabled
                              name="address"
                            />
                            <Input
                              type="text"
                              placeholder="Complemento"
                              value={register.complement}
                              onChange={change}
                              name="complement"
                            />
                            <Input
                              type="text"
                              placeholder="Número"
                              value={register.number}
                              onChange={change}
                              name="number"
                            />
                          </div>

                          <div className="modal__address">
                            <Input
                              type="text"
                              placeholder="Bairro"
                              disabled
                              ref={district}
                              value={register.district}
                              onChange={change}
                              name="district"
                            />
                            <Input
                              type="text"
                              placeholder="Cidade"
                              disabled
                              value={register.city}
                              onChange={change}
                              name="city"
                            />
                            <Input
                              type="text"
                              placeholder="Estado"
                              disabled
                              value={register.uf}
                              onChange={change}
                              name="uf"
                            />
                          </div>

                          <div className="modal__buttons">
                            <Button color="light" onClick={cancelButton}>
                              Cancelar
                            </Button>
                            <Button color="primary">Cadastrar</Button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </Modal>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-12">
            <div className="administrador__create">
              <div className="administrador__create--container">
                <p className="administrador__create-title">
                  Lista de Administradores
                </p>
                <Button color="primary" onClick={exportAdmins}>
                  Ver relatório completo
                </Button>
              </div>
              <div className="administrador__body">
                {admins &&
                  admins.map((admin) => (
                    <div
                      key={admin.id}
                      className="administrador__body-container"
                    >
                      <div className="administrador__body-image">
                        {admin.avatar ? (
                          <img src={admin.avatar} alt={admin.name} />
                        ) : (
                          <BiUserCircle />
                        )}
                      </div>
                      <div className="administrador__body-info">
                        <ul className="administrador__body-list">
                          <li className="item">Nome: {admin.name}</li>
                          <li className="item">Email: {admin.email}</li>
                          <li className="item">
                            {" "}
                            Status: {admin.deletedAt ? "inativo" : "ativo"}
                          </li>
                        </ul>
                        <div className="administrador__body-buttons">
                          <Button onClick={() => infoAdmin(admin.id)}>
                            Informações
                          </Button>
                          <Button
                            className="btn btn--primary"
                            color={admin.deletedAt ? "success" : "disabled"}
                            onClick={() => statusAdmin(admin)}
                            disabled={admin.id === user.id}
                          >
                            {admin.deletedAt ? "Habilitar" : "Desabilitar"}
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                <Modal
                  isOpen={modalIsOpenData}
                  onRequestClose={closeModalData}
                  style={customStyles}
                  contentLabel="Example Modal"
                  ariaHideApp={false}
                  portalClassName="adopter"
                >
                  <div className="modal__container">
                    <div className="modal__container-close">
                      <button onClick={closeModalData}>
                        <GrClose />
                      </button>
                    </div>
                    <div className="modal__header">
                      <h2 className="modal__header-title">Mais informações</h2>
                    </div>
                    <form onSubmit={infoAdmin} className="forms">
                      <div className="modal__body">
                        <ul className="modal__body-list">
                          <li className="item">Nome: {admin?.name}</li>
                          <li className="item">CPF: {admin?.cpf}</li>
                          <li className="item">E-mail {admin?.email}</li>
                          <li className="item">Gênero: {admin?.gender}</li>
                          <li className="item">Telefone: {admin?.phone}</li>
                          <li className="item">CEP: {admin?.cep}</li>
                          <li className="item">Endereço: {admin?.address}</li>
                          <li className="item">Bairro:{admin?.district}</li>
                          <li className="item">Cidade: {admin?.city}</li>
                          <li className="item">UF: {admin?.uf}</li>
                          <li className="item">
                            {" "}
                            Status: {admin?.deletedAt ? "inativo" : "ativo"}
                          </li>
                        </ul>
                      </div>
                    </form>
                  </div>
                </Modal>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Permission(["admin"])(Administrador);
