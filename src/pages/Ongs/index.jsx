import { Breadcrumb } from "../../components/Breadcrumb";
import { BiUserCircle } from "react-icons/bi";
import { Button } from "../../components/Button";
import { Select } from "../../components/Select";
import { useState } from "react";
import { Radio } from "../../components/Radio";
import Modal from "react-modal";
import { Input } from "../../components/Input";
import { GrClose } from "react-icons/gr";
import { GrImage } from "react-icons/gr";

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
      <section className="container" id="ongs">
        <div className="row">
          <div className="col-md-12">
            <Breadcrumb list={breadCrumb} />
          </div>

          <div className="col-md-12">
            <div className="ongs__create">
              <p className="ongs__create-title">Lista de ONGs</p>
              <div className="ongs__body">
                <div className="ongs__body-container">
                  <div className="ongs__body-image">
                    <BiUserCircle />
                  </div>
                  <div className="ongs__body-info">
                    <ul className="ongs__body-list">
                      <li className="item">Nome: Luara Oliveira</li>
                      <li className="item">CPF: 419.XXX-XXX-16</li>
                      <li className="item">
                        Login(e-mail): luara.oliveira8@gmail.com
                      </li>
                      <li className="item">Status: Ativo</li>
                    </ul>
                    <div className="ongs__body-buttons">
                      <Button onClick={openModal}>Informações</Button>
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
                              Mais informações
                            </h2>
                          </div>
                          <form className="forms">
                            <div className="modal__body">
                              <ul className="modal__body-list">
                                <li className="item">Nome: Luara Oliveira</li>
                                <li className="item">CPF: 419.XXX-XXX-16</li>
                                <li className="item">
                                  E-mail: luara.oliveira8@gmail.com
                                </li>
                                <li className="item">Gênero: Feminino</li>
                                <li className="item">
                                  Telefone: (19) 997111194
                                </li>
                                <li className="item">CEP: 13841-155</li>
                                <li className="item">
                                  Endereço: Rua Carlos Manoel Franco de Campos ,
                                  130
                                </li>
                                <li className="item">
                                  Bairro: Jardim Nova Mogi Guaçu
                                </li>
                                <li className="item">Cidade: Mogi Guaçu</li>
                                <li className="item">UF: SP</li>
                                <li className="item">Status: Ativo</li>
                              </ul>

                              <div className="modal__buttons">
                                <Button color="ligth">Cancelar</Button>
                                <Button color="primary">Desabilitar</Button>
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
                <div className="ongs__body-container">
                  <div className="ongs__body-image">
                    <BiUserCircle />
                  </div>
                  <div className="ongs__body-info">
                    <ul className="ongs__body-list">
                      <li className="item">Nome: Luara Oliveira</li>
                      <li className="item">CPF: 419.XXX-XXX-16</li>
                      <li className="item">
                        E-mail: luara.oliveira8@gmail.com
                      </li>
                      <li className="item">Status: Ativo</li>
                    </ul>
                    <div className="ongs__body-buttons">
                      <Button onClick={openModal}>Informações</Button>
                      <Button color="primary" className="btn">
                        Desativar
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="ongs__body-container">
                  <div className="ongs__body-image">
                    <BiUserCircle />
                  </div>
                  <div className="ongs__body-info">
                    <ul className="ongs__body-list">
                      <li className="item">Nome: Luara Oliveira</li>
                      <li className="item">CPF: 419.XXX-XXX-16</li>
                      <li className="item">
                        E-mail: luara.oliveira8@gmail.com
                      </li>
                      <li className="item">Status: Ativo</li>
                    </ul>
                    <div className="ongs__body-buttons">
                      <Button onClick={openModal}>Informações</Button>
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

export default Ongs;
