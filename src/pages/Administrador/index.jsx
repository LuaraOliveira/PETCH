import { Breadcrumb } from "../../components/Breadcrumb";
import { Input } from "../../components/Input";
import { BiUserCircle } from "react-icons/bi";
import { Button } from "../../components/Button";
import { useState, useEffect } from "react";
import api from "../../services/api";
import Modal from "react-modal";
import { Select } from "../../components/Select";
import { GrClose } from "react-icons/gr";
import { GrImage } from "react-icons/gr";

export function Administrador() {
  const breadCrumb = [
    { href: "#", link: "Menu Inicial" },
    { href: "#", link: "Administrador" },
  ];

  const [users, setUsers] = useState([]);

  useEffect(() => {
    api.get("/users").then((response) => setUsers(response.data));
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
      <section className="container" id="administrador">
        <div className="row">
          <div className="col-md-12">
            <Breadcrumb list={breadCrumb} />
          </div>
          <div className="col-md-12">
            <div className="administrador__create">
              <form className="administrador__forms">
                <p className="administrador__forms-title">
                  Criar novo administrador
                </p>
                <div className="administrador__forms-content">
                  <Button onClick={openModal}>Adicionar administrador</Button>
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
                          Adicionar novo administrador
                        </h2>
                      </div>
                      <form className="forms">
                        <div className="modal__body">
                          <div className="modal__description">
                            <div className="modal__description-input">
                              <Input type="text" placeholder="Nome" />
                              <Input type="text" placeholder="Email" />
                              <Input type="text" placeholder="Telefone" />
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

                          <div className="modal__genre">
                            <Input
                              type="text"
                              placeholder="Data de Nascimento"
                            />
                            <Input type="text" placeholder="Gênero" />
                            <Input type="text" placeholder="CPF" />
                          </div>

                          <div className="modal__cep">
                            <Input type="text" placeholder="CEP" />
                            <Button color="ligth">Consultar</Button>
                          </div>
                          <div className="modal__address">
                            <Input
                              type="text"
                              placeholder="Endereço"
                              disabled
                            />
                            <Input
                              type="text"
                              placeholder="Complemento"
                              disabled
                            />
                          </div>

                          <div className="modal__address">
                            <Input type="text" placeholder="Bairro" disabled />
                            <Input type="text" placeholder="Cidade" disabled />
                            <Input type="text" placeholder="Estado" disabled />
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
                          <Button color="primary" className="btn">
                            Desabilitar Conta
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
