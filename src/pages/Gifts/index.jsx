import { Breadcrumb } from "../../components/Breadcrumb";
import { BiUserCircle } from "react-icons/bi";
import { Button } from "../../components/Button";
import { Select } from "../../components/Select";
import { useState, useEffect } from "react";
import api from "../../services/api";
import Modal from "react-modal";
import { Input } from "../../components/Input";
import { GrClose } from "react-icons/gr";
import { GrImage } from "react-icons/gr";
export function Gifts() {
  const breadCrumb = [
    { href: "#", link: "Menu Inicial" },
    { href: "#", link: "Brindes" },
  ];

  const [gifts, setGifts] = useState([]);

  useEffect(() => {
    api.get("/gifts").then((response) => setGifts(response.data));
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
                <p className="administrador__forms-title">Criar novo brinde</p>
                <div className="administrador__forms-content">
                  <Button onClick={openModal}>Criar novo brinde</Button>
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
                          Adicionar Novo Brinde
                        </h2>
                      </div>
                      <form className="forms">
                        <div className="modal__body">
                          <div className="modal__description">
                            <div className="modal__description-input">
                              <Input type="text" placeholder="Nome do Brinde" />
                              <Select name="Empresa da Campanha">
                                <option value="">Empresa da Campanha</option>
                                <option value="">Petz</option>
                                <option value="">Cobasi</option>
                              </Select>
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

                          <div className="modal__textarea">
                            <label className="label" for="coverage">
                              Descrição
                            </label>

                            <textarea id="coverage" rows="3" cols="20" />
                          </div>

                          <div className="modal__buttons">
                            <Button color="ligth">Cancelar</Button>
                            <Button color="primary">Criar Brinde</Button>
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
                Lista de brindes criados
              </p>
              <div className="administrador__body">
                {gifts &&
                  gifts.map((gift) => (
                    <div
                      key={gift.id}
                      className="administrador__body-container"
                    >
                      <div className="administrador__body-image">
                        <BiUserCircle />
                      </div>
                      <div className="administrador__body-info">
                        <ul className="administrador__body-list">
                          <li className="item">Nome: {gift.name}</li>
                          <li className="item">
                            Descrição: {gift.description}
                          </li>
                          <li className="item">
                            Oferecido por: {gift.partner.fantasyName}
                          </li>
                          <li className="item">Abrangência: SP,RG,MG</li>
                          <li className="item">Status: Ativo</li>
                        </ul>
                        <div className="administrador__body-buttons">
                          <Button color="primary" className="btn">
                            Mais info
                          </Button>
                          <Button color="primary" className="btn">
                            Desativar Brinde
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
