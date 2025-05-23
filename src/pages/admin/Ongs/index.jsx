import axios from "axios";
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

import { useLoader } from "../../../context/loadercontext";
import { usePetch } from "../../../context/petchcontext";
import api from "../../../services/api";
import Permission from "../../../utils/Permission";

const initialState = {
  name: "",
  email: "",
  responsible: "",
  phone1: "",
  complement: "",
  number: "",
  cep: "",
  address: "",
  district: "",
  city: "",
  uf: "",
  coverage: "",
};

function Ongs() {
  const breadCrumb = [
    { href: "#", link: "Menu Inicial" },
    { href: "#", link: "ONGs" },
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
      height: "550px",
      overflowY: "scroll",
    },

    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.84)",
    },
  };
  const { HandlerLoader } = useLoader();
  const { ongs, DataOngs } = usePetch();

  const address = useRef(null);
  const district = useRef(null);
  const editAddress = useRef(null);
  const editDistrict = useRef(null);

  const [ong, setOng] = useState(undefined);
  const [image, setImage] = useState(null);
  const [register, setRegister] = useState(initialState);
  const [edition, setEdition] = useState(initialState);
  const [modalIsOpenRegister, setIsOpenRegister] = useState(false);
  const [modalIsOpenData, setIsOpenData] = useState(false);

  const preview = useMemo(() => {
    return image ? URL.createObjectURL(image) : null;
  }, [image]);

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

  function closeModalData(event) {
    event.preventDefault();
    setIsOpenData(false);
    setOng(undefined);
  }

  function cancelButton(event) {
    event.preventDefault();
    setRegister(initialState);
    closeModalRegister(event);
  }

  function cancelButtonEdition(event) {
    event.preventDefault();
    setEdition(initialState);
    closeModalData(event);
  }

  async function infoOng(id) {
    HandlerLoader(true);
    try {
      const response = await api.get(`/ongs/${id}?inactives=true`);
      const [address, number] = response.data.address
        .split(",")
        .map((param) => param.trim());
      setOng({ ...response.data, address, number });
      setEdition({
        ...edition,
        address,
        district: response.data.district,
      });
      setIsOpenData(true);
      console.log(response);
    } catch (error) {
      const data = error.response.data;
      AlertMessage(data.message, data.background);
    } finally {
      HandlerLoader(false);
    }
  }

  async function registerOng(event) {
    event.preventDefault();
    HandlerLoader(true);
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
      AlertMessage(response.data.message, response.data.background);
      closeModalRegister(event);
      DataOngs();
    } catch (error) {
      const data = error.response.data;
      AlertMessage(data.message, data.background);
    } finally {
      HandlerLoader(false);
    }
  }

  async function editOngs(event) {
    event.preventDefault();
    HandlerLoader(true);
    try {
      const instanceForm = new FormData();
      if (edition.name) instanceForm.append("name", edition.name);
      if (edition.email) instanceForm.append("email", edition.email);
      if (edition.responsible)
        instanceForm.append("responsible", edition.responsible);
      if (edition.phone1) instanceForm.append("phone1", edition.phone1);
      if (edition.cep) instanceForm.append("cep", edition.cep);
      if (edition.address) instanceForm.append("address", edition.address);
      if (edition.district) instanceForm.append("district", edition.district);
      if (edition.city) instanceForm.append("city", edition.city);
      if (edition.uf) instanceForm.append("uf", edition.uf);
      if (edition.coverage) instanceForm.append("coverage", edition.coverage);
      // if (image) instanceForm.append("media", image);

      const address = edition.address ? edition.address : ong.address;

      if (edition.number)
        instanceForm.append("address", `${address},${edition.number}`);

      const response = await api.put(`/ongs/${ong.id}`, instanceForm);
      AlertMessage(response.data.message, response.data.background);
      console.log(response.data);
      closeModalData(event);
      DataOngs();
    } catch (error) {
      const data = error.response.data;
      AlertMessage(data.message, data.background);
    } finally {
      HandlerLoader(false);
    }
  }

  async function searchCep(event, status) {
    event.preventDefault();
    HandlerLoader(true);
    if (status === "cadastro") {
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
    } else {
      const apiCep = `https://viacep.com.br/ws/${edition.cep}/json/`;
      const response = await axios.get(apiCep);
      const { logradouro, localidade, uf, bairro } = response.data;
      setEdition({
        ...edition,
        address: logradouro,
        city: localidade,
        district: bairro,
        uf,
      });

      !editAddress.current?.value
        ? editAddress.current?.removeAttribute("disabled")
        : editAddress.current?.setAttribute("disabled", "false");

      !editDistrict.current?.value
        ? editDistrict.current?.removeAttribute("disabled")
        : editDistrict.current?.setAttribute("disabled", "false");
    }
    HandlerLoader(false);
  }
  function change(event) {
    setRegister({
      ...register,
      [event.target.name]: event.target.value,
    });
  }

  function changeEdit(event) {
    setEdition({
      ...edition,
      [event.target.name]: event.target.value,
    });
  }

  async function statusOng(ong) {
    HandlerLoader(true);
    const status = ong.deletedAt ? "true" : "false";
    try {
      await api.delete(`/ongs/${ong.id}`, { params: { status } });
      DataOngs();
    } catch (error) {
    } finally {
      HandlerLoader(false);
    }
  }

  async function exportOngs() {
    const pdf = new jspdf("l");
    const columns = [
      {
        header: "Id",
        dataKey: "id",
      },
      {
        header: "Nome",
        dataKey: "name",
      },
      {
        header: "Email",
        dataKey: "email",
      },
      {
        header: "Telefone",
        dataKey: "phone1",
      },
      {
        header: "Responsável",
        dataKey: "responsible",
      },
    ];
    HandlerLoader(true);
    try {
      const response = await api.get("/ongs/all");
      autotable(pdf, { columns, body: response.data });
      console.log(response.data);
      pdf.output(`dataurlnewwindow`);
    } catch (error) {
    } finally {
      HandlerLoader(false);
    }
  }
  return (
    <>
      <Header />
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
                    ariaHideApp={false}
                    portalClassName="ong"
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
                                maxLength={15}
                                mask="phone"
                              />
                              <Input
                                type="text"
                                placeholder="Abrangência"
                                name="coverage"
                                value={register.coverage}
                                onChange={change}
                              />
                            </div>
                          </div>

                          <div className="modal__cep">
                            <Input
                              type="text"
                              placeholder="CEP"
                              name="cep"
                              value={register.cep}
                              onChange={change}
                              mask="cep"
                              maxLength={9}
                            />
                            <Button
                              color="light"
                              onClick={(event) => searchCep(event, "cadastro")}
                              type="button"
                            >
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
                              ref={address}
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
                              placeholder="Numero"
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
                              name="district"
                              value={register.district}
                              onChange={change}
                              ref={district}
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
            <div className="ongs__create">
              <div className="ongs__create--container">
                <p className="ongs__create-title">Lista de ONGs</p>
                <Button color="primary" onClick={exportOngs}>
                  Ver relatório completo
                </Button>
              </div>
              <div className="ongs__body">
                {ongs &&
                  ongs.map((ong) => (
                    <div key={ong.id} className="ongs__body-container">
                      <div className="ongs__body-image">
                        {!ong.image ? (
                          <BiUserCircle />
                        ) : (
                          <img src={ong?.image} alt="avatar" />
                        )}
                      </div>
                      <div className="ongs__body-info">
                        <ul className="ongs__body-list">
                          <li className="item">Nome: {ong.name}</li>
                          <li className="item">Cidade: {ong.city}</li>
                          <li className="item">E-mail:{ong.email}</li>
                          <li className="item">Telefone: {ong.phone1}</li>
                          <li className="item">CEP: {ong.cep}</li>
                          <li className="item">
                            Responsável: {ong.responsible}
                          </li>
                          <li className="item">
                            {" "}
                            Status: {ong.deletedAt ? "inativo" : "ativo"}
                          </li>
                        </ul>

                        <div className="ongs__body-buttons">
                          <Button
                            color="primary"
                            onClick={() => infoOng(ong.id)}
                          >
                            Informações
                          </Button>
                          <Button
                            color={ong.deletedAt ? "success" : "disabled"}
                            className="btn"
                            onClick={() => statusOng(ong)}
                          >
                            {ong.deletedAt ? "Habilitar" : "Desabilitar"}
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                <Modal
                  isOpen={modalIsOpenData}
                  onRequestClose={closeModalData}
                  style={customStyles}
                  contentLabel="Example Modal Data"
                  ariaHideApp={false}
                  portalClassName="ong"
                >
                  <div className="modal__container">
                    <div className="modal__container-close">
                      <button onClick={closeModalData}>
                        <GrClose />
                      </button>
                    </div>
                    <div className="modal__header">
                      <h2 className="modal__header-title">Dados da ONG</h2>
                    </div>
                    <form onSubmit={editOngs} className="forms">
                      <div className="modal__body">
                        <div className="modal__image">
                          <img src={ong?.image} alt="avatar" />
                        </div>
                        <div className="modal__description">
                          <div className="modal__description-input">
                            <Input
                              type="text"
                              placeholder="Nome"
                              name="name"
                              onChange={changeEdit}
                              defaultValue={ong?.name}
                            />
                            <Input
                              type="text"
                              placeholder="Email"
                              name="email"
                              onChange={changeEdit}
                              defaultValue={ong?.email}
                            />

                            <Input
                              type="text"
                              placeholder="Responsável"
                              name="responsible"
                              onChange={changeEdit}
                              defaultValue={ong?.responsible}
                            />
                            <Input
                              type="text"
                              placeholder="Telefone"
                              name="phone1"
                              onChange={changeEdit}
                              defaultValue={ong?.phone1}
                            />
                            <Input
                              type="text"
                              placeholder="Abrangência"
                              name="coverage"
                              onChange={changeEdit}
                              defaultValue={ong?.coverage}
                            />
                          </div>
                        </div>

                        <div className="modal__cep">
                          <Input
                            type="text"
                            placeholder="CEP"
                            value={ong?.cep}
                            onChange={changeEdit}
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
                            value={edition.address}
                            onChange={changeEdit}
                            ref={editAddress}
                            disabled
                            name="address"
                          />
                          <Input
                            type="text"
                            placeholder="Complemento"
                            defaultValue={ong?.complement}
                            onChange={changeEdit}
                            name="complement"
                          />
                          <Input
                            type="text"
                            placeholder="Número"
                            defaultValue={ong?.number}
                            onChange={changeEdit}
                            name="number"
                          />
                        </div>

                        <div className="modal__address">
                          <Input
                            type="text"
                            placeholder="Bairro"
                            value={edition.district}
                            onChange={changeEdit}
                            ref={editDistrict}
                            disabled
                            name="district"
                          />
                          <Input
                            type="text"
                            placeholder="Cidade"
                            defaultValue={ong?.city}
                            onChange={changeEdit}
                            disabled
                            name="city"
                          />
                          <Input
                            type="text"
                            placeholder="Estado"
                            onChange={changeEdit}
                            disabled
                            name="uf"
                            defaultValue={ong?.uf}
                          />
                        </div>

                        <div className="modal__buttons">
                          <Button color="light" onClick={cancelButtonEdition}>
                            Cancelar
                          </Button>
                          <Button color="primary">Editar</Button>
                        </div>
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

export default Permission(["admin"])(Ongs);
