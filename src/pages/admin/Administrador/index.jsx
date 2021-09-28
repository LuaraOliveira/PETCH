import { Breadcrumb } from "../../../components/Breadcrumb";
import { Input } from "../../../components/Input";
import { BiUserCircle } from "react-icons/bi";
import { Button } from "../../../components/Button";
import { useState, useEffect, useMemo, useRef } from "react";
import api from "../../../services/api";
import Modal from "react-modal";
import { GrClose } from "react-icons/gr";
import { GrImage } from "react-icons/gr";
import axios from "axios";

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

  const address = useRef(null);
  const district = useRef(null);
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(undefined);
  const [image, setImage] = useState(null);
  const [modalIsOpenRegister, setIsOpenRegister] = useState(false);
  const [modalIsOpenData, setIsOpenData] = useState(false);
  const preview = useMemo(() => {
    return image ? URL.createObjectURL(image) : null;
  }, [image]);

  const [register, setRegister] = useState(initialState);

  useEffect(() => {
    api
      .get("/users?inactives=true&role=Admin")
      .then((response) => setUsers(response.data));
  }, []);

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

  function closeModalData(event) {
    event.preventDefault();
    setIsOpenData(false);
    setUser(undefined);
  }

  function openModalRegister(event) {
    event.preventDefault();
    setIsOpenRegister(true);
  }

  function closeModalRegister(event) {
    event.preventDefault();
    setIsOpenRegister(false);
    setUser(undefined);
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
      console.log(response.data);
    } catch (error) {
      console.log(error.response);
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
      const response = await api.get(`/users/${id}`);
      setUser(response.data);
      setIsOpenData(true);
      console.log(response);
    } catch (error) {
      console.log(error.response);
    }
  }

  function change(event) {
    setRegister({
      ...register,
      [event.target.name]: event.target.value,
    });
  }

  return (
    <>
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
                            <Button color="light" onClick={searchCep}>
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
              <p className="administrador__create-title">
                Lista de Administradores
              </p>
              <div className="administrador__body">
                {users &&
                  users.map((user) => (
                    <div
                      key={user.id}
                      className="administrador__body-container"
                    >
                      <div className="administrador__body-image">
                        {user.avatar ? (
                          <img src={user.avatar} alt={user.name} />
                        ) : (
                          <BiUserCircle />
                        )}
                      </div>
                      <div className="administrador__body-info">
                        <ul className="administrador__body-list">
                          <li className="item">Nome: {user.name}</li>
                          <li className="item">Email: {user.email}</li>
                          <li className="item">Status: Ativo</li>
                        </ul>
                        <div className="administrador__body-buttons">
                          <Button onClick={() => infoAdmin(user.id)}>
                            Informações
                          </Button>
                          <Button
                            color={user.deletedAt ? "success" : "disabled"}
                            className="btn"
                          >
                            Desabilitar Conta
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
                          <li className="item">Nome: {user?.name}</li>
                          <li className="item">CPF: {user?.cpf}</li>
                          <li className="item">E-mail {user?.email}</li>
                          <li className="item">Gênero: {user?.gender}</li>
                          <li className="item">Telefone: {user?.phone}</li>
                          <li className="item">CEP: {user?.cep}</li>
                          <li className="item">Endereço: {user?.address}</li>
                          <li className="item">Bairro:{user?.district}</li>
                          <li className="item">Cidade: {user?.city}</li>
                          <li className="item">UF: {user?.uf}</li>
                          <li className="item">
                            {" "}
                            Status: {user?.deletedAt ? "inativo" : "ativo"}
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
    </>
  );
}

export default Administrador;
