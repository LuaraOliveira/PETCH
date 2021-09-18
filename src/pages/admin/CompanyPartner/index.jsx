import { Breadcrumb } from "../../../components/Breadcrumb";
import { BiUserCircle } from "react-icons/bi";
import { Button } from "../../../components/Button";
import { useState, useEffect, useMemo, useRef } from "react";
import api from "../../../services/api";
import Modal from "react-modal";
import { Input } from "../../../components/Input";
import { GrClose } from "react-icons/gr";
import { GrImage } from "react-icons/gr";
import axios from "axios";
import { usePetch } from "../../../context/petchcontext";
function CompanyPartner() {
  const breadCrumb = [
    { href: "#", link: "Menu Inicial" },
    { href: "#", link: "Empresas Parceiras" },
  ];

  const address = useRef(null);
  const district = useRef(null);
  const [partner, setPartner] = useState(undefined);
  const [image, setImage] = useState(null);
  const [modalIsOpenRegister, setIsOpenRegister] = useState(false);
  const [modalIsOpenData, setIsOpenData] = useState(false);
  const { partners } = usePetch();

  const preview = useMemo(() => {
    return image ? URL.createObjectURL(image) : null;
  }, [image]);

  const [register, setRegister] = useState({
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
  });

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

  function openModalRegister(event) {
    event.preventDefault();
    setIsOpenRegister(true);
  }

  function closeModalRegister(event) {
    event.preventDefault();
    setIsOpenRegister(false);
    setPartner(undefined);
  }

  function closeModalData(event) {
    event.preventDefault();
    setIsOpenData(false);
    setPartner(undefined);
    setImage(null);
  }
  async function infoPartner(id) {
    try {
      const response = await api.get(`/partners/${id}`);
      setPartner(response.data);
      setIsOpenData(true);
      console.log(response);
    } catch (error) {
      console.log(error.response);
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

  function change(event) {
    setRegister({
      ...register,
      [event.target.name]: event.target.value,
    });
  }
  return (
    <>
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
                              />
                              <Input
                                type="text"
                                placeholder="Inscrição Estadual"
                                value={register.stateRegistration}
                                onChange={change}
                                name="stateRegistration"
                              />
                            </div>

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
                                <GrImage color="red" size="120px" />
                              </label>
                            </div>
                          </div>

                          <div className="modal__cep">
                            <Input
                              type="text"
                              placeholder="CEP"
                              value={register.cep}
                              onChange={change}
                              name="cep"
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
                            />
                            <Input
                              type="text"
                              placeholder="Telefone"
                              value={register.phone2}
                              onChange={change}
                              name="phone2"
                            />
                            <Input
                              type="text"
                              placeholder="Telefone 2"
                              value={register.phone3}
                              onChange={change}
                              name="phone3"
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
                            <Button color="light">Cancelar</Button>
                            <Button color="primary">Cadastrar Parceiro</Button>
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
              <p className="company__create-title">Lista de Empresas</p>
              <div className="company__body">
                {partners &&
                  partners.map((partner) => (
                    <div key={partner.id} className="company__body-container">
                      <div className="company__body-image">
                        <BiUserCircle />
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
                    <form className="forms">
                      <div className="modal__body">
                        <div className="modal__description">
                          <div className="modal__description-input">
                            <Input
                              type="text"
                              placeholder="Nome fantasia"
                              defaultValue={partner?.fantasyName}
                            />
                            <Input
                              type="text"
                              placeholder="Razão Social"
                              defaultValue={partner?.companyName}
                            />
                            <Input
                              type="text"
                              placeholder="CNPJ"
                              defaultValue={partner?.cnpj}
                            />
                            <Input
                              type="text"
                              placeholder="Inscrição Estadual"
                              defaultValue={partner?.stateRegistration}
                            />
                          </div>

                          <div className="modal__image">
                            <img src={partner?.image} alt="avatar" />
                          </div>
                        </div>

                        <div className="modal__cep">
                          <Input
                            type="text"
                            placeholder="CEP"
                            defaultValue={partner?.cep}
                          />
                          <Button color="light">Consultar</Button>
                        </div>

                        <div className="modal__address">
                          <Input
                            type="text"
                            placeholder="Endereço"
                            defaultValue={partner?.address}
                            disabled
                          />
                          <Input
                            type="text"
                            placeholder="Complemento"
                            defaultValue={partner?.complement}
                            disabled
                          />
                          <Input
                            type="text"
                            placeholder="Número"
                            defaultValue={partner?.number}
                            disabled
                          />
                        </div>

                        <div className="modal__address">
                          <Input
                            type="text"
                            placeholder="Bairro"
                            defaultValue={partner?.district}
                            disabled
                          />
                          <Input
                            type="text"
                            placeholder="Cidade"
                            defaultValue={partner?.city}
                            disabled
                          />
                          <Input
                            type="text"
                            placeholder="Estado"
                            defaultValue={partner?.uf}
                            disabled
                          />
                        </div>

                        <div className="modal__responsible">
                          <Input
                            type="text"
                            placeholder="Responsável"
                            defaultValue={partner?.responsible}
                          />
                          <Input
                            type="text"
                            placeholder="Celular"
                            defaultValue={partner?.phone1}
                          />
                          <Input
                            type="text"
                            placeholder="Telefone"
                            defaultValue={partner?.phone2}
                          />
                          <Input
                            type="text"
                            placeholder="Telefone 2"
                            defaultValue={partner?.phone3}
                          />
                          <Input
                            type="text"
                            placeholder="E-mail"
                            defaultValue={partner?.email}
                          />
                          <Input
                            type="text"
                            placeholder="Site"
                            defaultValue={partner?.website}
                          />
                        </div>

                        <div className="modal__buttons">
                          <Button color="light">Cancelar</Button>
                          <Button color="primary">Cadastrar Parceiro</Button>
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
    </>
  );
}
export default CompanyPartner;
