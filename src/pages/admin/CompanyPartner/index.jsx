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

import { usePetch } from "../../../context/petchcontext";
import api from "../../../services/api";
import Permission from "../../../utils/Permission";

const initialState = {
  fantasyName: "",
  companyName: "",
  cnpj: "",
  stateRegistration: "",
  cep: "",
  address: "",
  complement: "",
  number: "",
  district: "",
  city: "",
  uf: "",
  responsible: "",
  phone1: "",
  phone2: "",
  phone3: "",
  email: "",
  website: "",
};

function CompanyPartner() {
  const breadCrumb = [
    { href: "#", link: "Home" },
    { href: "#", link: "Empresas Parceiras" },
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

  const { partners, DataPartners } = usePetch();

  const preview = useMemo(() => {
    return image ? URL.createObjectURL(image) : null;
  }, [image]);

  const address = useRef(null);
  const district = useRef(null);
  const editAddress = useRef(null);
  const editDistrict = useRef(null);

  const [partner, setPartner] = useState(undefined);
  const [image, setImage] = useState(null);
  const [modalIsOpenRegister, setIsOpenRegister] = useState(false);
  const [modalIsOpenData, setIsOpenData] = useState(false);
  const [edition, setEdition] = useState(initialState);
  const [register, setRegister] = useState(initialState);

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
    setPartner(undefined);
    setImage(null);
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

  async function infoPartner(id) {
    try {
      const response = await api.get(`/partners/${id}?inactives=true`);
      const [address, number] = response.data.address
        .split(",")
        .map((param) => param.trim());
      setPartner({ ...response.data, address, number });
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
    }
  }

  async function registerPartner(event) {
    event.preventDefault();
    try {
      const instanceForm = new FormData();
      instanceForm.append("fantasyName", register.fantasyName);
      instanceForm.append("companyName", register.companyName);
      instanceForm.append("cnpj", register.cnpj);
      instanceForm.append("stateRegistration", register.stateRegistration);
      instanceForm.append("cep", register.cep);
      instanceForm.append("address", `${register.address},${register.number}`);
      instanceForm.append("complement", register.complement);
      instanceForm.append("district", register.district);
      instanceForm.append("city", register.city);
      instanceForm.append("uf", register.uf);
      instanceForm.append("responsible", register.responsible);
      instanceForm.append("phone1", register.phone1);
      instanceForm.append("phone2", register.phone2);
      instanceForm.append("phone3", register.phone3);
      instanceForm.append("email", register.email);
      instanceForm.append("website", register.website);
      instanceForm.append("media", image);
      const response = await api.post("/partners", instanceForm);
      console.log(response.data);
      AlertMessage(response.data.message, response.data.background);
      closeModalRegister(event);
      DataPartners();
    } catch (error) {
      const data = error.response.data;
      AlertMessage(data.message, data.background);
    }
  }

  async function editPartner(event) {
    event.preventDefault();
    try {
      const instanceForm = new FormData();
      if (edition.fantasyName)
        instanceForm.append("fantasyName", edition.fantasyName);
      if (edition.companyName)
        instanceForm.append("companyName", edition.companyName);
      if (edition.cnpj) instanceForm.append("cnpj", edition.cnpj);
      if (edition.stateRegistration)
        instanceForm.append("stateRegistration", edition.stateRegistration);
      if (edition.cep) instanceForm.append("cep", edition.cep);
      if (edition.complement)
        instanceForm.append("complement", edition.complement);
      if (edition.district) instanceForm.append("district", edition.district);
      if (edition.city) instanceForm.append("city", edition.city);
      if (edition.uf) instanceForm.append("uf", edition.uf);
      if (edition.responsible)
        instanceForm.append("responsible", edition.responsible);
      if (edition.phone1) instanceForm.append("phone1", edition.phone1);
      if (edition.phone2) instanceForm.append("phone2", edition.phone2);
      if (edition.phone3) instanceForm.append("phone3", edition.phone3);
      if (edition.email) instanceForm.append("email", edition.email);
      if (edition.website) instanceForm.append("website", edition.website);
      // if (image) instanceForm.append("media", image);

      const address = edition.address ? edition.address : partner.address;

      if (edition.number)
        instanceForm.append("address", `${address},${edition.number}`);

      const response = await api.put(`/partners/${partner.id}`, instanceForm);
      console.log(response.data);
      AlertMessage(response.data.message, response.data.background);
      closeModalData(event);
      DataPartners();
    } catch (error) {
      const data = error.response.data;
      AlertMessage(data.message, data.background);
    }
  }

  async function searchCep(event, status) {
    event.preventDefault();
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

  async function statusPartner(partner) {
    const status = partner.deletedAt ? "true" : "false";
    try {
      await api.delete(`/partners/${partner.id}`, { params: { status } });
      DataPartners();
    } catch (error) {}
  }

  async function exportPartner() {
    const pdf = new jspdf("l");
    const columns = [
      {
        header: "Id",
        dataKey: "id",
      },
      {
        header: "Nome",
        dataKey: "fantasyName",
      },
      {
        header: "Email",
        dataKey: "email",
      },
      {
        header: "Cnpj",
        dataKey: "cnpj",
      },
      {
        header: "Telefone",
        dataKey: "phone1",
      },
    ];
    try {
      const response = await api.get("/partners/all");
      autotable(pdf, { columns, body: response.data });
      console.log(response.data);
      pdf.output(`dataurlnewwindow`);
    } catch (error) {}
  }
  return (
    <>
      <Header />
      <section className="container" id="company">
        <div className="row">
          <div className="col-md-12">
            <Breadcrumb list={breadCrumb} />
          </div>
          <div className="col-md-12">
            <div className="company__create">
              <div className="company__forms">
                <p className="company__forms-title">Criar nova empresa</p>
                <div className="company__forms-content">
                  <Button onClick={openModalRegister}>Adicionar empresa</Button>
                  <Modal
                    isOpen={modalIsOpenRegister}
                    onRequestClose={closeModalRegister}
                    style={customStyles}
                    contentLabel="Example Modal"
                    ariaHideApp={false}
                    portalClassName="companyPartner"
                  >
                    <div className="modal__container">
                      <div className="modal__container-close">
                        <button onClick={closeModalRegister}>
                          <GrClose />
                        </button>
                      </div>
                      <div className="modal__header">
                        <h2 className="modal__header-title">
                          Adicionar Empresa Parceira
                        </h2>
                      </div>
                      <form onSubmit={registerPartner} className="forms">
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
                                placeholder="Nome fantasia"
                                value={register.fantasyName}
                                onChange={change}
                                name="fantasyName"
                              />
                              <Input
                                type="text"
                                placeholder="Razão Social"
                                value={register.companyName}
                                onChange={change}
                                name="companyName"
                              />
                              <Input
                                type="text"
                                placeholder="CNPJ"
                                value={register.cnpj}
                                onChange={change}
                                name="cnpj"
                                maxLength={18}
                                mask="cnpj"
                              />
                              <Input
                                type="text"
                                placeholder="Inscrição Estadual"
                                value={register.stateRegistration}
                                onChange={change}
                                name="stateRegistration"
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
                              value={register.address}
                              onChange={change}
                              ref={address}
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
                              value={register.district}
                              ref={district}
                              onChange={change}
                              disabled
                              name="district"
                            />
                            <Input
                              type="text"
                              placeholder="Cidade"
                              value={register.city}
                              onChange={change}
                              disabled
                              name="city"
                            />
                            <Input
                              type="text"
                              placeholder="Estado"
                              value={register.uf}
                              onChange={change}
                              disabled
                              name="uf"
                            />
                          </div>

                          <div className="modal__responsible">
                            <Input
                              type="text"
                              placeholder="Responsável"
                              value={register.responsible}
                              onChange={change}
                              name="responsible"
                            />
                            <Input
                              type="text"
                              placeholder="Celular"
                              value={register.phone1}
                              onChange={change}
                              name="phone1"
                              maxLength={15}
                              mask="phone"
                            />
                            <Input
                              type="text"
                              placeholder="Telefone"
                              value={register.phone2}
                              onChange={change}
                              name="phone2"
                              maxLength={15}
                              mask="phone"
                            />
                            <Input
                              type="text"
                              placeholder="Telefone 2"
                              value={register.phone3}
                              onChange={change}
                              name="phone3"
                              maxLength={15}
                              mask="phone"
                            />
                            <Input
                              type="text"
                              placeholder="E-mail"
                              value={register.email}
                              onChange={change}
                              name="email"
                            />
                            <Input
                              type="text"
                              placeholder="Site"
                              value={register.website}
                              onChange={change}
                              name="website"
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
            <div className="company__create">
              <div className="company__create--container">
                <p className="company__create-title">Lista de Empresas</p>
                <Button color="primary" onClick={exportPartner}>
                  Ver relatório completo
                </Button>
              </div>
              <div className="company__body">
                {partners &&
                  partners.map((partner) => (
                    <div key={partner.id} className="company__body-container">
                      <div className="company__body-image">
                        {!partner.image ? (
                          <BiUserCircle />
                        ) : (
                          <img src={partner?.image} alt="avatar" />
                        )}
                      </div>
                      <div className="company__body-info">
                        <ul className="company__body-list">
                          <li className="item">Nome: {partner.fantasyName}</li>
                          <li className="item">CNPJ: {partner.cnpj}</li>
                          <li className="item">Email: {partner.email}</li>
                          <li className="item">Telefone: {partner.phone1}</li>
                          <li className="item">
                            Responsável: {partner.responsible}
                          </li>
                          <li className="item">
                            Status: {partner.deletedAt ? "inativo" : "ativo"}
                          </li>
                        </ul>
                        <div className="company__body-buttons">
                          <Button onClick={() => infoPartner(partner.id)}>
                            Informações
                          </Button>
                          <Button
                            color={partner.deletedAt ? "success" : "disabled"}
                            className="btn"
                            onClick={() => statusPartner(partner)}
                          >
                            {partner.deletedAt ? "Habilitar" : "Desabilitar"}
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
                  portalClassName="companyPartner"
                >
                  <div className="modal__container">
                    <div className="modal__container-close">
                      <button onClick={closeModalData}>
                        <GrClose />
                      </button>
                    </div>
                    <div className="modal__header">
                      <h2 className="modal__header-title">
                        Dados da Empresa Parceira
                      </h2>
                    </div>
                    <form onSubmit={editPartner} className="forms">
                      <div className="modal__body">
                        <div className="modal__image">
                          <img src={partner?.image} alt="avatar" />
                        </div>
                        <div className="modal__description">
                          <div className="modal__description-input">
                            <Input
                              type="text"
                              placeholder="Nome fantasia"
                              defaultValue={partner?.fantasyName}
                              onChange={changeEdit}
                              name="fantasyName"
                            />
                            <Input
                              type="text"
                              placeholder="Razão Social"
                              defaultValue={partner?.companyName}
                              onChange={changeEdit}
                              name="companyName"
                            />
                            <Input
                              type="text"
                              placeholder="CNPJ"
                              defaultValue={partner?.cnpj}
                              onChange={changeEdit}
                              name="cnpj"
                              maxLength={18}
                              mask="cnpj"
                            />
                            <Input
                              type="text"
                              placeholder="Inscrição Estadual"
                              defaultValue={partner?.stateRegistration}
                              onChange={changeEdit}
                              name="stateRegistration"
                            />
                          </div>
                        </div>

                        <div className="modal__cep">
                          <Input
                            type="text"
                            placeholder="CEP"
                            value={partner?.cep}
                            onChange={changeEdit}
                            name="cep"
                            mask="cep"
                            maxLength={9}
                          />
                          <Button
                            color="light"
                            onClick={(event) => searchCep(event, "edicao")}
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
                            defaultValue={partner?.complement}
                            onChange={changeEdit}
                            name="complement"
                          />
                          <Input
                            type="text"
                            placeholder="Número"
                            defaultValue={partner?.number}
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
                            defaultValue={partner?.city}
                            onChange={changeEdit}
                            disabled
                            name="city"
                          />
                          <Input
                            type="text"
                            placeholder="Estado"
                            defaultValue={partner?.uf}
                            onChange={changeEdit}
                            disabled
                            name="uf"
                          />
                        </div>

                        <div className="modal__responsible">
                          <Input
                            type="text"
                            placeholder="Responsável"
                            defaultValue={partner?.responsible}
                            onChange={changeEdit}
                            name="responsible"
                          />
                          <Input
                            type="text"
                            placeholder="Celular"
                            defaultValue={partner?.phone1}
                            onChange={changeEdit}
                            name="phone1"
                            maxLength={15}
                            mask="phone"
                          />
                          <Input
                            type="text"
                            placeholder="Telefone"
                            defaultValue={partner?.phone2}
                            onChange={changeEdit}
                            name="phone2"
                            maxLength={15}
                            mask="phone"
                          />
                          <Input
                            type="text"
                            placeholder="Telefone 2"
                            defaultValue={partner?.phone3}
                            onChange={changeEdit}
                            name="phone3"
                            maxLength={15}
                            mask="phone"
                          />
                          <Input
                            type="text"
                            placeholder="E-mail"
                            defaultValue={partner?.email}
                            onChange={changeEdit}
                            name="email"
                          />
                          <Input
                            type="text"
                            placeholder="Site"
                            defaultValue={partner?.website}
                            onChange={changeEdit}
                            name="website"
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

export default Permission(["admin"])(CompanyPartner);
