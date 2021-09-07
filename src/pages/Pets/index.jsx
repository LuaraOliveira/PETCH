import { Breadcrumb } from "../../components/Breadcrumb";
import { BiUserCircle } from "react-icons/bi";
import { Button } from "../../components/Button";
import { useState, useEffect, useMemo } from "react";
import api from "../../services/api";
import { Radio } from "../../components/Radio";
import Modal from "react-modal";
import { Input } from "../../components/Input";
import { GrClose } from "react-icons/gr";
import { GrImage } from "react-icons/gr";
import { Select } from "../../components/Select";
function Pets() {
  const breadCrumb = [
    { href: "#", link: "Menu Inicial" },
    { href: "#", link: "Animais" },
  ];

  const [pets, setPets] = useState([]);
  const [pet, setPet] = useState(undefined);
  const [image, setImage] = useState(null);
  const preview = useMemo(() => {
    return image ? URL.createObjectURL(image) : null;
  }, [image]);
  const [register, setRegister] = useState({
    name: "",
    age: "",
    weight: "",
    gender: "",
    ong: "",
    species: "",
    breed: "",
  });
  useEffect(() => {
    api.get("/pets").then((response) => setPets(response.data));
  }, []);

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      width: "100%",
      maxHeight: "900px",
      maxWidth: "900px",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },

    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.84)",
    },
  };

  const [modalIsOpenRegister, setIsOpenRegister] = useState(false);
  const [modalIsOpenData, setIsOpenData] = useState(false);

  function openModalRegister(event) {
    event.preventDefault();
    setIsOpenRegister(true);
  }

  function closeModalRegister(event) {
    event.preventDefault();
    setIsOpenRegister(false);
    setPet(undefined);
  }

  function openModalData(event) {
    event.preventDefault();
    setIsOpenData(true);
  }

  function closeModalData(event) {
    event.preventDefault();
    setIsOpenData(false);
    setPet(undefined);
  }

  async function infoPet(id) {
    try {
      const response = await api.get(`/pets/${id}`);
      setPet(response.data);
      setIsOpenData(true);
      console.log(response);
    } catch (error) {
      console.log(error.response);
    }
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
              <div className="pets__forms">
                <p className="pets__forms-title">Criar novo Animal</p>
                <div className="pets__forms-content">
                  <Button onClick={openModalRegister}>Adicionar Animal</Button>
                  <Modal
                    isOpen={modalIsOpenRegister}
                    onRequestClose={closeModalRegister}
                    style={customStyles}
                    contentLabel="Example Modal Register"
                    ariaHideApp={false}
                  >
                    <div className="modal__container">
                      <div className="modal__container-close">
                        <button onClick={closeModalRegister}>
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
                              <Input
                                type="text"
                                placeholder="Nome do animal"
                                value={register.name}
                              />
                              <div className="modal__description-ong">
                                <Input
                                  type="text"
                                  placeholder="Raça"
                                  value={register.breed}
                                />
                                <Input
                                  type="text"
                                  placeholder="Sexo"
                                  value={register.gender}
                                />
                              </div>
                              <Select name="status">
                                <option value="">ONG</option>
                                <option value="">Kapa</option>
                                <option value="">Anjos de focinho</option>
                              </Select>
                              <div className="modal__description-age">
                                <Input type="text" placeholder="Idade" />
                                <p className="modal__description-castration-title">
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
                                <Input
                                  type="text"
                                  placeholder="Peso(kg)"
                                  value={register.weight}
                                />
                                <Select name="status">
                                  <option value="">Ativo</option>
                                  <option value="">Indisponível</option>
                                </Select>
                              </div>
                              <Select name="status">
                                <option value="">Espécie</option>
                                <option value="">Canina</option>
                                <option value="">Canina</option>
                              </Select>
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
                                <GrImage color="red" />
                              </label>

                              {/* <ul className="modal__image-list">
                                <li>
                                  <div className="modal__image-container">
                                    {" "}
                                    <GrImage color="red" size="90px" />
                                    <Button color="secondary">Remover</Button>
                                  </div>
                                </li>
                                <li>
                                  <div className="modal__image-container">
                                    {" "}
                                    <GrImage color="red" size="90px" />
                                    <Button color="secondary">Remover</Button>
                                  </div>
                                </li>
                                <li>
                                  <div className="modal__image-container">
                                    {" "}
                                    <GrImage color="red" size="90px" />
                                    <Button color="secondary">Remover</Button>
                                  </div>
                                </li>
                                <li>
                                  <div className="modal__image-container">
                                    {" "}
                                    <GrImage color="red" size="90px" />
                                    <Button color="secondary">Remover</Button>
                                  </div>
                                </li>
                              </ul> */}
                            </div>
                          </div>

                          <div className="modal__buttons">
                            <Button color="light">Cancelar</Button>
                            <Button color="primary">Criar Cadastro</Button>
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
            <div className="pets__create">
              <p className="pets__create-title">Lista de Animais</p>
              <div className="pets__body">
                {pets &&
                  pets.map((pet) => (
                    <div className="pets__body-container">
                      <div className="pets__body-image">
                        <BiUserCircle />
                      </div>
                      <div className="pets__body-info">
                        <ul className="pets__body-list">
                          <li className="item">Nome do Animal: {pet.name}</li>
                          <li className="item">Idade: {pet.age}</li>
                          <li className="item">Sexo: {pet.gender}</li>
                          <li className="item">Espécie: {pet.species.name}</li>
                          <li className="item">Peso(kg): {pet.weight}</li>
                          <li className="item">Fotos(kg): Sim(5)</li>
                          <li className="item">Ong: {pet.ong.name}</li>
                          <li className="item">Publicado em: 04/06/2021</li>
                          <li className="item">Status: Ativo(Sem matches)</li>
                        </ul>
                        <div className="pets__body-buttons">
                          <Button
                            color="primary"
                            onClick={() => infoPet(pet.id)}
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
                <Modal
                  isOpen={modalIsOpenData}
                  onRequestClose={closeModalData}
                  style={customStyles}
                  contentLabel="Example Modal Data"
                  ariaHideApp={false}
                >
                  <div className="modal__container">
                    <div className="modal__container-close">
                      <button onClick={closeModalData}>
                        <GrClose />
                      </button>
                    </div>
                    <div className="modal__header">
                      <h2 className="modal__header-title">
                        Informações do Animal
                      </h2>
                    </div>
                    <form className="forms">
                      <div className="modal__body">
                        <div className="modal__description">
                          <div className="modal__description-input">
                            <Input
                              type="text"
                              placeholder="Nome do animal"
                              defaultValue={pet?.name}
                            />
                            <div className="modal__description-ong">
                              <Input
                                type="text"
                                placeholder="Raça"
                                defaultValue={pet?.breed}
                              />
                              <Input
                                type="text"
                                placeholder="Sexo"
                                defaultValue={pet?.gender}
                              />
                            </div>
                            <Select name="status">
                              <option defaultValue={pet?.ongId}>
                                {pet?.ong?.name}
                              </option>
                            </Select>
                            <div className="modal__description-age">
                              <Input type="text" placeholder="Idade" />
                              <p className="modal__description-castration-title">
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
                              <Input type="text" placeholder="Peso(kg)" />
                              <Select name="status">
                                <option value="">Ativo</option>
                                <option value="">Indisponível</option>
                              </Select>
                            </div>
                          </div>
                          <div className="modal__image">
                            <label
                              style={{
                                backgroundImage: `url(${preview})`,
                                width: 500,
                                height: 300,
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

                            <ul className="modal__image-list">
                              <li>
                                <div className="modal__image-container">
                                  {" "}
                                  <GrImage color="red" size="90px" />
                                  <Button color="secondary">Remover</Button>
                                </div>
                              </li>
                              <li>
                                <div className="modal__image-container">
                                  {" "}
                                  <GrImage color="red" size="90px" />
                                  <Button color="secondary">Remover</Button>
                                </div>
                              </li>
                              <li>
                                <div className="modal__image-container">
                                  {" "}
                                  <GrImage color="red" size="90px" />
                                  <Button color="secondary">Remover</Button>
                                </div>
                              </li>
                              <li>
                                <div className="modal__image-container">
                                  {" "}
                                  <GrImage color="red" size="90px" />
                                  <Button color="secondary">Remover</Button>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>

                        <Select
                          name="status"
                          defaultValue={pet?.species?.name}
                        ></Select>

                        <div className="modal__buttons">
                          <Button color="light">Cancelar</Button>
                          <Button color="primary">Criar Cadastro</Button>
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

export default Pets;
