import { Breadcrumb } from "../../components/Breadcrumb";
import { BiUserCircle } from "react-icons/bi";
import { Button } from "../../components/Button";
import { useState } from "react";
// import api from "../../services/api";
import { Radio } from "../../components/Radio";
import Modal from "react-modal";
import { Input } from "../../components/Input";
import { GrClose } from "react-icons/gr";
import { GrImage } from "react-icons/gr";
import { Select } from "../../components/Select";
export function Pets() {
  const breadCrumb = [
    { href: "#", link: "Menu Inicial" },
    { href: "#", link: "Animais" },
  ];

  // const [pets, setPets] = useState([]);

  // useEffect(() => {
  //   api.get("/pets").then((response) => setPets(response.data));
  // }, []);

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
      <section className="container" id="pets">
        <div className="row">
          <div className="col-md-12">
            <Breadcrumb list={breadCrumb} />
          </div>
          <div className="col-md-12">
            <div className="pets__create">
              <form className="pets__forms">
                <p className="pets__forms-title">Criar novo Animal</p>
                <div className="pets__forms-content">
                  <Button onClick={openModal}>Adicionar animal</Button>
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
                          Adicionar Animal
                        </h2>
                      </div>
                      <form className="forms">
                        <div className="modal__body">
                          <div className="modal__description">
                            <div className="modal__description-input">
                              <Input type="text" placeholder="Nome do animal" />
                              <div className="modal__description-ong">
                                <Input
                                  type="text"
                                  placeholder="Código da ONG"
                                />
                                <Button color="ligth">Consultar</Button>
                              </div>
                              <Input type="text" placeholder="Espécie" />
                              <Input type="text" placeholder="Sexo" />
                              <div className="modal__description-age">
                                <Input type="number" placeholder="Idade" />
                                <Radio
                                  id="radio-button-1"
                                  name="radio-button-name6"
                                  checked
                                >
                                  meses
                                </Radio>
                                <Radio
                                  id="radio-button-2"
                                  name="radio-button-name6"
                                  checked
                                >
                                  anos
                                </Radio>
                              </div>
                              <div className="modal__description-castration">
                                <p className="modal_description-castration-title">
                                  Castrado?
                                </p>
                                <div className="modal__description-castration-radio">
                                  <Radio
                                    id="radio-button-3"
                                    name="radio-button-name7"
                                  >
                                    sim
                                  </Radio>
                                  <Radio
                                    id="radio-button-4"
                                    name="radio-button-name7"
                                    checked
                                  >
                                    não
                                  </Radio>
                                </div>
                              </div>

                              <div className="modal__description-weigth">
                                <Input type="number" placeholder="Peso(kg)" />
                                <Select name="status">
                                  <option value="">Ativo</option>
                                  <option value="">Indisponível</option>
                                </Select>
                              </div>
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

                          <Input type="text" placeholder="Nome da Espécie" />

                          <p className="modal__pets-title">
                            Dados de vacinação
                          </p>
                          <div className="modal__pets">
                            <div className="modal__pets-container">
                              <Input type="text" placeholder="Data" />
                              <Input
                                type="text"
                                placeholder="Código da vacina"
                              />
                              <Input type="text" placeholder="Dose" />
                            </div>
                            <label className="label" for="coverage">
                              Descrição
                            </label>

                            <textarea id="coverage" rows="3" cols="20" />

                            <label className="label" for="coverage">
                              Observação
                            </label>

                            <textarea id="coverage" rows="3" cols="20" />
                          </div>

                          <div className="modal__buttons">
                            <Button color="ligth">Cancelar</Button>
                            <Button color="primary">Criar Cadastro</Button>
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
            <div className="pets__create">
              <p className="pets__create-title">Lista de Espécies</p>
              <div className="pets__body">
                <div className="pets__body-container">
                  <div className="pets__body-image">
                    <BiUserCircle />
                  </div>
                  <div className="pets__body-info">
                    <ul className="pets__body-list">
                      <li className="item">Nome do Animal: Juca</li>
                      <li className="item">Idade: 2 anos</li>
                      <li className="item">Sexo: Masculino</li>
                      <li className="item">Espécie: Canina</li>
                      <li className="item">Peso(kg): 12kg</li>
                      <li className="item">Fotos(kg): Sim(5)</li>
                      <li className="item">Ong: Kapa</li>
                      <li className="item">Publicado em: 04/06/2021</li>
                      <li className="item">Status: Ativo(Sem matches)</li>
                    </ul>
                    <div className="pets__body-buttons">
                      <Button color="primary" className="btn">
                        Informações
                      </Button>
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
