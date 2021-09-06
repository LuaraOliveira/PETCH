import { Breadcrumb } from "../../components/Breadcrumb";
import { BiUserCircle } from "react-icons/bi";
import { Button } from "../../components/Button";
import { useState, useEffect, useMemo } from "react";
import api from "../../services/api";
import Modal from "react-modal";
import { Input } from "../../components/Input";
import { GrClose } from "react-icons/gr";
import { GrImage } from "react-icons/gr";
import axios from "axios";

function Ongs() {
  const breadCrumb = [
    { href: "#", link: "Menu Inicial" },
    { href: "#", link: "ONGs" },
  ];

  const [ongs, setOngs] = useState([]);
  const [ong, setOng] = useState(undefined);
  const [image, setImage] = useState(null);
  const preview = useMemo(() => {
    return image ? URL.createObjectURL(image) : null;
  }, [image]);
  const [register, setRegister] = useState({
    name: "",
    email: "",
    responsible: "",
    phone1: "",
    cep: "",
    address: "",
    district: "",
    city: "",
    uf: "",
    coverage: "",
  });

  useEffect(() => {
    api.get("/ongs").then((response) => setOngs(response.data));
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

  const [modalIsOpenRegister, setIsOpenRegister] = useState(false);
  const [modalIsOpenData, setIsOpenData] = useState(false);

  function openModalRegister(event) {
    event.preventDefault();
    setIsOpenRegister(true);
  }

  function closeModalRegister(event) {
    event.preventDefault();
    setIsOpenRegister(false);
    setOng(undefined);
  }

  function openModalData(event) {
    event.preventDefault();
    setIsOpenData(true);
  }

  function closeModalData(event) {
    event.preventDefault();
    setIsOpenData(false);
    setOng(undefined);
  }

  async function infoOng(id) {
    try {
      const response = await api.get(`/ongs/${id}`);
      setOng(response.data);
      setIsOpenData(true);
      console.log(response);
    } catch (error) {
      console.log(error.response);
    }
  }

  async function registerOng(event) {
    event.preventDefault();
    try {
      const instanceForm = new FormData();
      instanceForm.append("name", register.name);
      instanceForm.append("email", register.email);
      instanceForm.append("responsible", register.responsible);
      instanceForm.append("phone1", register.phone1);
      instanceForm.append("cep", register.cep);
      instanceForm.append("address", register.address);
      instanceForm.append("district", register.district);
      instanceForm.append("city", register.city);
      instanceForm.append("uf", register.uf);
      instanceForm.append("coverage", register.coverage);
      instanceForm.append("media", image);
      const response = await api.post("/ongs", instanceForm);
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
    console.log(response);
  }

  function change(event) {
    setRegister({
      ...register,
      [event.target.name]: event.target.value,
    });
  }

  return (
    <>
      <section className="container" id="ongs">
        <div className="row">
          <div className="col-md-12">
            <Breadcrumb list={breadCrumb} />
          </div>
          <div className="col-md-12">
            <div className="ongs__create">
              <div className="ongs__forms">
                <p className="ongs__forms-title">Criar nova ONG</p>
                <div className="ongs__forms-content">
                  <Button onClick={openModalRegister}>Adicionar ONG</Button>
                  <Modal
                    isOpen={modalIsOpenRegister}
                    onRequestClose={closeModalRegister}
                    style={customStyles}
                    contentLabel="Example Modal Register"
                  >
                    <div className="modal__container">
                      <div className="modal__container-close">
                        <button onClick={closeModalRegister}>
                          <GrClose />
                        </button>
                      </div>
                      <div className="modal__header">
                        <h2 className="modal__header-title">Adicionar ONG</h2>
                      </div>
                      <form onSubmit={registerOng} className="forms">
                        <div className="modal__body">
                          <div className="modal__description">
                            <div className="modal__description-input">
                              <Input
                                type="text"
                                placeholder="Nome"
                                name="name"
                                value={register.name}
                                onChange={change}
                              />
                              <Input
                                type="text"
                                placeholder="Email"
                                name="email"
                                value={register.email}
                                onChange={change}
                              />

                              <Input
                                type="text"
                                placeholder="Responsável"
                                name="responsible"
                                value={register.responsible}
                                onChange={change}
                              />
                              <Input
                                type="text"
                                placeholder="Telefone"
                                name="phone1"
                                value={register.phone1}
                                onChange={change}
                              />
                              <Input
                                type="text"
                                placeholder="Abrangência"
                                name="coverage"
                                value={register.coverage}
                                onChange={change}
                              />
                            </div>
                            <div className="modal__image">
                              <label
                                style={{
                                  backgroundImage: `url(${preview})`,
                                  width: 500,
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
                                <GrImage color="red" size="120px" />
                              </label>
                            </div>
                          </div>

                          <div className="modal__cep">
                            <Input
                              type="text"
                              placeholder="CEP"
                              name="cep"
                              value={register.cep}
                              onChange={change}
                            />
                            <Button color="ligth" onClick={searchCep}>
                              Consultar
                            </Button>
                          </div>
                          <div className="modal__address">
                            <Input
                              type="text"
                              placeholder="Endereço"
                              disabled
                              name="address"
                              value={register.address}
                              onChange={change}
                            />
                            <Input type="text" placeholder="Complemento" />
                          </div>

                          <div className="modal__address">
                            <Input
                              type="text"
                              placeholder="Bairro"
                              disabled
                              name="district"
                              value={register.district}
                              onChange={change}
                            />
                            <Input
                              type="text"
                              placeholder="Cidade"
                              disabled
                              name="city"
                              value={register.city}
                              onChange={change}
                            />
                            <Input
                              type="text"
                              placeholder="Estado"
                              disabled
                              name="uf"
                              value={register.uf}
                              onChange={change}
                            />
                          </div>

                          <div className="modal__buttons">
                            <Button color="ligth">Cancelar</Button>
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
            <div className="ongs__create">
              <p className="ongs__create-title">Lista de ONGs</p>
              <div className="ongs__body">
                {ongs &&
                  ongs.map((ong) => (
                    <div key={ong.id} className="ongs__body-container">
                      <div className="ongs__body-image">
                        <BiUserCircle />
                      </div>
                      <div className="ongs__body-info">
                        <ul className="ongs__body-list">
                          <li className="item">Nome: {ong.name}</li>
                          <li className="item">Cidade: {ong.city}</li>
                          <li className="item">E-mail:{ong.email}</li>
                          <li className="item">Telefone: {ong.phone1}</li>
                          <li className="item">CEP: 1{ong.cep}</li>
                          <li className="item">
                            Responsável: {ong.responsible}
                          </li>
                          <li className="item">Status: Ativo</li>
                        </ul>

                        <div className="ongs__body-buttons">
                          <Button
                            color="primary"
                            onClick={() => infoOng(ong.id)}
                          >
                            Informações
                          </Button>
                          <Modal
                            isOpen={modalIsOpenData}
                            onRequestClose={closeModalData}
                            style={customStyles}
                            contentLabel="Example Modal Data"
                          >
                            <div className="modal__container">
                              <div className="modal__container-close">
                                <button onClick={closeModalData}>
                                  <GrClose />
                                </button>
                              </div>
                              <div className="modal__header">
                                <h2 className="modal__header-title">
                                  Dados da ONG
                                </h2>
                              </div>
                              <form className="forms">
                                <div className="modal__body">
                                  <div className="modal__description">
                                    <div className="modal__description-input">
                                      <Input
                                        type="text"
                                        placeholder="Nome"
                                        name="name"
                                        defaultValue={ong?.name}
                                      />
                                      <Input
                                        type="text"
                                        placeholder="Email"
                                        name="email"
                                        defaultValue={ong?.email}
                                      />

                                      <Input
                                        type="text"
                                        placeholder="Responsável"
                                        name="responsible"
                                        defaultValue={ong?.responsible}
                                      />
                                      <Input
                                        type="text"
                                        placeholder="Telefone"
                                        name="phone1"
                                        defaultValue={ong?.phone1}
                                      />
                                      <Input
                                        type="text"
                                        placeholder="Abrangência"
                                        name="coverage"
                                        defaultValue={ong?.coverage}
                                      />
                                    </div>
                                    <div className="modal__image">
                                      <label
                                        style={{
                                          // backgroundImage: `url(${preview})`,
                                          width: 500,
                                        }}
                                      >
                                        <input
                                          type="file"
                                          className="modal__image-file"
                                          name="myfile"
                                        />
                                        <GrImage color="red" size="120px" />
                                      </label>
                                    </div>
                                  </div>

                                  <div className="modal__cep">
                                    <Input
                                      type="text"
                                      placeholder="CEP"
                                      name="cep"
                                      defaultValue={ong?.cep}
                                    />
                                    <Button color="ligth">Consultar</Button>
                                  </div>
                                  <div className="modal__address">
                                    <Input
                                      type="text"
                                      placeholder="Endereço"
                                      disabled
                                      name="address"
                                      defaultValue={ong?.address}
                                    />
                                    <Input
                                      type="text"
                                      placeholder="Complemento"
                                      defaultValue={ong?.complement}
                                    />
                                  </div>

                                  <div className="modal__address">
                                    <Input
                                      type="text"
                                      placeholder="Bairro"
                                      disabled
                                      name="district"
                                      defaultValue={ong?.district}
                                    />
                                    <Input
                                      type="text"
                                      placeholder="Cidade"
                                      disabled
                                      name="city"
                                      defaultValue={ong?.city}
                                    />
                                    <Input
                                      type="text"
                                      placeholder="Estado"
                                      disabled
                                      name="uf"
                                      defaultValue={ong?.uf}
                                    />
                                  </div>

                                  <div className="modal__buttons">
                                    <Button color="ligth">Cancelar</Button>
                                    <Button color="primary">Editar</Button>
                                  </div>
                                </div>
                              </form>
                            </div>
                          </Modal>
                          <Button color="primary" className="btn">
                            Desativar
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Ongs;
