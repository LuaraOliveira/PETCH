import { Breadcrumb } from "../../components/Breadcrumb";
import { BiUserCircle } from "react-icons/bi";
import { Button } from "../../components/Button";
// import { Select } from "../../components/Select";
import { useState } from "react";

import Modal from "react-modal";
import { Input } from "../../components/Input";
import { GrClose } from "react-icons/gr";
import { GrImage } from "react-icons/gr";

function Adopters() {
  const breadCrumb = [
    { href: "#", link: "Menu Inicial" },
    { href: "#", link: "Adotantes" },
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
      <section className="container" id="adopters">
        <div className="row">
          <div className="col-md-12">
            <Breadcrumb list={breadCrumb} />
          </div>
          <div className="col-md-12">
            <div className="adopters__create">
              <form className="adopters__forms">
                <p className="adopters__forms-title">Criar novo adotante</p>
                <div className="adopters__forms-content">
                  <Button onClick={openModal}>Adicionar adotante</Button>
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
                          Adicionar novo adotante
                        </h2>
                      </div>
                      <form className="forms">
                        <div className="modal__body">
                          <div className="modal__description">
                            <div className="modal__description-input">
                              <Input type="text" placeholder="Nome do Brinde" />
                              <label className="label" for="coverage">
                                Descrição
                              </label>

                              <textarea id="coverage" rows="3" cols="20" />
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

                          <div className="modal__address">
                            <Input type="text" placeholder="Cor" />
                            <Input type="text" placeholder="Tamanho" />
                            <Input type="text" placeholder="Peso" />
                          </div>

                          <div className="modal__textarea">
                            <label className="label" for="coverage">
                              Abrangência
                            </label>

                            <textarea id="coverage" rows="3" cols="20" />
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
              </form>
            </div>
          </div>
          <div className="col-md-12">
            <div className="adopters__create">
              <p className="adopters__create-title">Lista de adotantes</p>
              <div className="adopters__body">
                <div className="adopters__body-container">
                  <div className="adopters__body-image">
                    <BiUserCircle />
                  </div>
                  <div className="adopters__body-info">
                    <ul className="adopters__body-list">
                      <li className="item">Nome:</li>
                      <li className="item">Descrição:</li>
                      <li className="item">Tamanho: </li>
                      <li className="item">Cor: </li>
                      <li className="item">Peso:</li>
                      <li className="item">Gosto: </li>
                    </ul>
                    <div className="adopters__body-buttons">
                      <Button color="primary">Informações</Button>
                      <Button color="primary" className="btn">
                        Desativar
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Adopters;
