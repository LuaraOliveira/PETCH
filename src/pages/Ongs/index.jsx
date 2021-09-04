import { Breadcrumb } from "../../components/Breadcrumb";
import { BiUserCircle } from "react-icons/bi";
import { Button } from "../../components/Button";
import { useState, useEffect } from "react";
import api from "../../services/api";
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

  const [ongs, setOngs] = useState([]);
  const [ong, setOng] = useState(undefined);

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

  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal(event) {
    event.preventDefault();
    setIsOpen(true);
  }

  function closeModal(event) {
    event.preventDefault();
    setIsOpen(false);
    setOng(undefined);
  }

  async function infoOng(id) {
    try {
      const response = await api.get(`/ongs/${id}`);
      setOng(response.data);
      setIsOpen(true);
      console.log(response);
    } catch (error) {
      console.log(error.response);
    }
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
              <form className="ongs__forms">
                <p className="ongs__forms-title">Criar nova ONG</p>
                <div className="ongs__forms-content">
                  <Button onClick={openModal}>Adicionar ONG</Button>
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
                          {ong === undefined ? "Adicionar ONG" : "Dados da ONG"}
                        </h2>
                      </div>
                      <form className="forms">
                        <div className="modal__body">
                          <div className="modal__description">
                            <div className="modal__description-input">
                              <Input
                                type="text"
                                placeholder="Nome"
                                defaultValue={ong?.name}
                              />
                              <Input
                                type="text"
                                placeholder="Email"
                                defaultValue={ong?.email}
                              />

                              <Input
                                type="text"
                                placeholder="Responsável"
                                defaultValue={ong?.responsible}
                              />

                              <Input
                                type="text"
                                placeholder="Abrangência"
                                defaultValue={ong?.coverage}
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
                              defaultValue={ong?.cep}
                            />
                            <Button color="ligth">Consultar</Button>
                          </div>
                          <div className="modal__address">
                            <Input
                              type="text"
                              placeholder="Endereço"
                              disabled
                              defaultValue={ong?.address}
                            />
                            <Input
                              type="text"
                              placeholder="Complemento"
                              disabled
                              defaultValue={ong?.complement}
                            />
                          </div>

                          <div className="modal__address">
                            <Input
                              type="text"
                              placeholder="Bairro"
                              disabled
                              defaultValue={ong?.district}
                            />
                            <Input
                              type="text"
                              placeholder="Cidade"
                              disabled
                              defaultValue={ong?.city}
                            />
                            <Input
                              type="text"
                              placeholder="Estado"
                              disabled
                              defaultValue={ong?.uf}
                            />
                          </div>

                          <div className="modal__buttons">
                            <Button color="ligth">Cancelar</Button>
                            <Button color="primary">
                              {" "}
                              {ong === undefined
                                ? "Cadastrar ONG"
                                : "Editar ONG"}
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
