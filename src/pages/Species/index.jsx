import { Breadcrumb } from "../../components/Breadcrumb";
import { BiUserCircle } from "react-icons/bi";
import { Button } from "../../components/Button";
import { useState, useEffect } from "react";
import api from "../../services/api";
import Modal from "react-modal";
import { Input } from "../../components/Input";
import { GrClose } from "react-icons/gr";
import { GrImage } from "react-icons/gr";
export function Species() {
  const breadCrumb = [
    { href: "#", link: "Menu Inicial" },
    { href: "#", link: "Espécies" },
  ];

  const [partners, setPartners] = useState([]);

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
  }
  return (
    <>
      <section className="container" id="species">
        <div className="row">
          <div className="col-md-12">
            <Breadcrumb list={breadCrumb} />
          </div>
          <div className="col-md-12">
            <div className="species__create">
              <form className="species__forms">
                <p className="species__forms-title">Criar nova espécie</p>
                <div className="species__forms-content">
                  <Button onClick={openModal}>Adicionar espécie</Button>
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
                          Adicionar Espécie
                        </h2>
                      </div>
                      <form className="forms">
                        <div className="modal__body">
                          <div className="modal__description center">
                            <div className="modal__image">
                              <input
                                type="file"
                                className="modal__image-file"
                                name="myfile"
                              />
                              <GrImage color="red" size="120px" />
                            </div>
                          </div>

                          <Input type="text" placeholder="Nome da Espécie" />

                          <p className="modal__species-title">Portes</p>
                          <div className="modal__species">
                            <div className="modal__species-container">
                              <Input type="text" placeholder="Descrição" />
                              <Input type="text" placeholder="Peso Inicial" />
                              <Input type="text" placeholder="Peso Final" />
                              <Button color="ligth">Editar</Button>
                              <Button color="secondary">Excluir</Button>
                            </div>
                            <div className="modal__species-description">
                              <Input type="text" placeholder="Descrição" />
                              <Input type="text" placeholder="Peso Inicial" />
                              <Input type="text" placeholder="Peso Final" />
                              <Button color="primary">Adicionar Porte</Button>
                            </div>
                          </div>

                          <div className="modal__buttons">
                            <Button color="ligth">Cancelar</Button>
                            <Button color="primary">Criar Espécie</Button>
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
            <div className="species__create">
              <p className="species__create-title">Lista de Espécies</p>
              <div className="species__body">
                {partners &&
                  partners.map((partner) => (
                    <div key={partner.id} className="species__body-container">
                      <div className="species__body-image">
                        <BiUserCircle />
                      </div>
                      <div className="species__body-info">
                        <ul className="species__body-list">
                          <li className="item">
                            Espécie: {partner.fantasyName}
                          </li>
                          <li className="item">
                            Avatar Cadastrado: {partner.cnpj}
                          </li>
                          <li className="item">Portes: {partner.email}</li>
                          <li className="item">Status: {partner.phone1}</li>
                        </ul>
                        <div className="species__body-buttons">
                          <Button color="primary" className="btn">
                            Informações
                          </Button>
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
