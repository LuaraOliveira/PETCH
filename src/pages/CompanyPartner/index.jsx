import { Breadcrumb } from "../../components/Breadcrumb";
import { BiUserCircle } from "react-icons/bi";
import { Button } from "../../components/Button";
import { useState, useEffect } from "react";
import api from "../../services/api";
import Modal from "react-modal";
import { Input } from "../../components/Input";
import { GrClose } from "react-icons/gr";
import { GrImage } from "react-icons/gr";
export function CompanyPartner() {
  const breadCrumb = [
    { href: "#", link: "Menu Inicial" },
    { href: "#", link: "Empresas Parceiras" },
  ];

  const [partners, setPartners] = useState([]);
  const [partner, setPartner] = useState(undefined);

  useEffect(() => {
    api.get("/partners").then((response) => setPartners(response.data));
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

  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal(event) {
    event.preventDefault();
    setIsOpen(true);
  }

  function closeModal(event) {
    event.preventDefault();
    setIsOpen(false);
    setPartner(undefined);
  }

  async function infoPartner(id) {
    try {
      const response = await api.get(`/partners/${id}`);
      setPartner(response.data);
      setIsOpen(true);
      console.log(response);
    } catch (error) {
      console.log(error.response);
    }
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
              <form className="company__forms">
                <p className="company__forms-title">Criar nova empresa</p>
                <div className="company__forms-content">
                  <Button onClick={openModal}>Adicionar empresa</Button>
                  <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                  >
                    <div className="modal__container">
                      <div className="modal__container-close">
                        <button onClick={closeModal}>
                          <GrClose />
                        </button>
                      </div>
                      <div className="modal__header">
                        <h2 className="modal__header-title">
                          {partner === undefined
                            ? "Adicionar Empresa Parceira"
                            : "Dados da Empresa Parceira"}
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
                              <input
                                type="file"
                                className="modal__image-file"
                                name="myfile"
                              />
                              <GrImage color="red" size="120px" />
                            </div>
                          </div>

                          <div className="modal__cep">
                            <Input
                              type="text"
                              placeholder="CEP"
                              defaultValue={partner?.cep}
                            />
                            <Button color="ligth">Consultar</Button>
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
                            <Button color="ligth">Cancelar</Button>
                            <Button color="primary">
                              {partner === undefined
                                ? "Cadastrar Parceiro"
                                : "Editar Parceiro"}
                            </Button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </Modal>
                </div>
              </form>
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
                          <li className="item">Status: Ativo</li>
                        </ul>
                        <div className="company__body-buttons">
                          <Button
                            color="primary"
                            onClick={() => infoPartner(partner.id)}
                          >
                            Informações
                          </Button>
                          <Button color="primary" className="btn">
                            Desabilitar
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
