import { Breadcrumb } from "../../../components/Breadcrumb";
import { BiUserCircle } from "react-icons/bi";
import { Button } from "../../../components/Button";
import { useState, useMemo } from "react";
import api from "../../../services/api";
import { Radio } from "../../../components/Radio";
import Modal from "react-modal";
import { Input } from "../../../components/Input";
import { GrClose } from "react-icons/gr";
import { GrImage } from "react-icons/gr";
import { Select } from "../../../components/Select";
import { usePetch } from "../../../context/petchcontext";
import { Alert } from "../../../components/Alert";
import Permission from "../../../utils/Permission";
import { Header } from "../../../components/Header";
import { Footer } from "../../../components/Footer";
const initialState = {
  name: "",
  cut: "not",
  age: "",
  weight: "",
  gender: "",
  ong: "",
  speciesId: "",
  breed: "",
  ongId: "",
  color: "",
  description: "",
};

function Pets() {
  const breadCrumb = [
    { href: "#", link: "Menu Inicial" },
    { href: "#", link: "Animais" },
  ];

  const { pets, ongs, species, DataPets } = usePetch();
  const [pet, setPet] = useState(undefined);
  const [image, setImage] = useState(null);
  const preview = useMemo(() => {
    return image ? URL.createObjectURL(image) : null;
  }, [image]);
  const [register, setRegister] = useState(initialState);
  const [alert, setAlert] = useState({
    message: "",
    status: "",
    background: "",
  });
  const [edition, setEdition] = useState(initialState);

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
      height: "550px",
      overflowY: "scroll",
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

  function closeModalData(event) {
    event.preventDefault();
    setIsOpenData(false);
    setPet(undefined);
  }

  function cancelButton(event) {
    event.preventDefault();
    setRegister(initialState);
    closeModalRegister(event);
  }

  function cancelButtonEdition(event) {
    event.preventDefault();
    setEdition(initialState);
    closeModalData(event);
  }

  async function infoPet(id) {
    try {
      const response = await api.get(`/pets/${id}?inactives=true`);
      setPet(response.data);
      setIsOpenData(true);
      console.log(response);
    } catch (error) {
      console.log(error.response);
    }
  }

  async function registerPet(event) {
    event.preventDefault();
    try {
      const instanceForm = new FormData();
      instanceForm.append("name", register.name);
      instanceForm.append("cut", register.cut === "yes" && "true");
      instanceForm.append("age", register.age);
      instanceForm.append("weight", register.weight);
      instanceForm.append("gender", register.gender);
      instanceForm.append("ong", register.ong);
      instanceForm.append("speciesId", register.speciesId);
      instanceForm.append("breed", register.breed);
      instanceForm.append("color", register.color);
      instanceForm.append("description", register.description);
      instanceForm.append("ongId", register.ongId);
      instanceForm.append("media", image);
      const response = await api.post("/pets", instanceForm);
      console.log(response.data);
      closeModalRegister(event);
      DataPets();
    } catch (error) {
      const data = error.response.data;
      setAlert({
        message: data.message,
        status: String(data.status || data.statusCode),
        background: "error",
      });
    }
  }

  async function editPet(event) {
    event.preventDefault();
    try {
      const instanceForm = new FormData();
      if (edition.name) instanceForm.append("name", edition.name);
      if (edition.cut)
        instanceForm.append("cut", edition.cut === "yes" && "true");
      if (edition.cnpj) instanceForm.append("age", edition.age);
      if (edition.email) instanceForm.append("weight", edition.weight);
      if (edition.gender) instanceForm.append("gender", edition.gender);
      if (edition.ong) instanceForm.append("ong", edition.ong);
      if (edition.speciesId)
        instanceForm.append("speciesId", edition.speciesId);
      if (edition.breed) instanceForm.append("breed", edition.breed);
      if (edition.color) instanceForm.append("color", edition.color);
      if (edition.description)
        instanceForm.append("description", edition.description);
      if (edition.ongId) instanceForm.append("ongId", edition.ongId);

      const response = await api.put(`/pets/${pet.id}`, instanceForm);
      console.log(response.data);
      closeModalData(event);
      DataPets();
    } catch (error) {
      console.log(error.response);
    }
  }

  function change(event) {
    setRegister({
      ...register,
      [event.target.name]: event.target.value,
    });
  }

  function changeEdit(event) {
    setEdition({
      ...edition,
      [event.target.name]: event.target.value,
    });
  }

  async function statusPets(pet) {
    const status = pet.deletedAt ? "true" : "false";
    try {
      await api.delete(`/pets/${pet.id}`, { params: { status } });
      DataPets();
    } catch (error) {}
  }
  function closeAlert() {
    setAlert({ message: "", status: "", background: "" });
  }
  return (
    <>
      <Alert background={alert.background} onClick={closeAlert}>
        {alert.message}
      </Alert>
      <Header />
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
                    portalClassName="pet"
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
                      <form onSubmit={registerPet} className="forms">
                        <div className="modal__body">
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
                          </div>
                          <div className="modal__description">
                            <div className="modal__description-input">
                              <Input
                                type="text"
                                placeholder="Nome do animal"
                                value={register.name}
                                onChange={change}
                                name="name"
                              />
                              <div className="modal__description-ong">
                                <Input
                                  type="text"
                                  placeholder="Raça"
                                  value={register.breed}
                                  onChange={change}
                                  name="breed"
                                />
                                <Input
                                  type="text"
                                  placeholder="Sexo"
                                  value={register.gender}
                                  onChange={change}
                                  name="gender"
                                />
                              </div>{" "}
                              <Select
                                name="ongId"
                                onChange={change}
                                value={register.ongId}
                              >
                                <option value="" defaultChecked disabled>
                                  Selecionar Ong
                                </option>
                                {ongs &&
                                  ongs.map((ong) => (
                                    <option value={ong.id} key={ong.id}>
                                      {ong.name}
                                    </option>
                                  ))}
                              </Select>
                              <div className="modal__description-age">
                                <Input
                                  type="text"
                                  placeholder="Idade"
                                  onChange={change}
                                  name="age"
                                />
                                <p className="modal__description-castration-title">
                                  Castrado?
                                </p>
                                <div className="modal__description-castration-radio">
                                  <Radio
                                    id="radio-button-3"
                                    name="radio-name-7"
                                    value="yes"
                                    onChange={(e) =>
                                      setRegister({
                                        ...register,
                                        cut: e.target.value,
                                      })
                                    }
                                    checked={register.cut === "yes"}
                                  >
                                    sim
                                  </Radio>
                                  <Radio
                                    id="radio-button-4"
                                    name="radio-name-7"
                                    value="not"
                                    onChange={(e) =>
                                      setRegister({
                                        ...register,
                                        cut: e.target.value,
                                      })
                                    }
                                    checked={register.cut === "not"}
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
                                  onChange={change}
                                  name="weight"
                                />
                              </div>
                              <Select
                                name="speciesId"
                                onChange={change}
                                value={register.speciesId}
                              >
                                <option value="" defaultChecked disabled>
                                  Selecionar Espécie
                                </option>
                                {species &&
                                  species.map((specie) => (
                                    <option value={specie.id} key={specie.id}>
                                      {specie.name}
                                    </option>
                                  ))}
                              </Select>
                              <Input
                                type="text"
                                placeholder="Cor"
                                value={register.color}
                                onChange={change}
                                name="color"
                              />
                              <div className="modal__textarea">
                                <label className="label" htmlFor="coverage">
                                  Descrição
                                </label>

                                <textarea
                                  id="description"
                                  rows="3"
                                  cols="20"
                                  value={register.description}
                                  onChange={change}
                                  name="description"
                                />
                              </div>
                            </div>
                          </div>

                          <div className="modal__buttons">
                            <Button color="light" onClick={cancelButton}>
                              Cancelar
                            </Button>
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
                    <div key={pet.id} className="pets__body-container">
                      <div className="pets__body-image">
                        {!pet.image ? (
                          <BiUserCircle />
                        ) : (
                          <img src={pet?.image} alt="avatar" />
                        )}
                      </div>
                      <div className="pets__body-info">
                        <ul className="pets__body-list">
                          <li className="item">Nome do Animal: {pet.name}</li>
                          <li className="item">Idade: {pet.age}</li>
                          <li className="item">Sexo: {pet.gender}</li>
                          <li className="item">Espécie: {pet.species.name}</li>
                          <li className="item">
                            Status: {pet?.deletedAt ? "inativo" : "ativo"}
                          </li>
                        </ul>
                        <div className="pets__body-buttons">
                          <Button
                            color="primary"
                            onClick={() => infoPet(pet.id)}
                          >
                            Informações
                          </Button>

                          <Button
                            color={pet.deletedAt ? "success" : "disabled"}
                            className="btn"
                            onClick={() => statusPets(pet)}
                          >
                            {pet.deletedAt ? "Habilitar" : "Desabilitar"}
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
                  portalClassName="pet"
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
                    <form onSubmit={editPet} className="forms">
                      <div className="modal__body">
                        <div className="modal__image">
                          <img src={pet?.image} alt="avatar" />
                        </div>
                        <div className="modal__description">
                          <div className="modal__description-input">
                            <Input
                              type="text"
                              placeholder="Nome do animal"
                              defaultValue={pet?.name}
                              onChange={changeEdit}
                              name="name"
                            />
                            <div className="modal__description-ong">
                              <Input
                                type="text"
                                placeholder="Raça"
                                defaultValue={pet?.breed}
                                onChange={changeEdit}
                                name="breed"
                              />
                              <Input
                                type="text"
                                placeholder="Sexo"
                                defaultValue={pet?.gender}
                                onChange={changeEdit}
                                name="gender"
                              />
                            </div>
                            <div className="modal__description-input">
                              <Select
                                name="ongId"
                                onChange={changeEdit}
                                defaultValue={pet?.ongId}
                              >
                                {ongs &&
                                  ongs.map((ong) => (
                                    <option value={ong.id} key={ong.id}>
                                      {ong.name}
                                    </option>
                                  ))}
                              </Select>

                              <Select
                                name="speciesId"
                                onChange={changeEdit}
                                defaultValue={pet?.speciesId}
                              >
                                {species &&
                                  species.map((specie) => (
                                    <option value={specie.id} key={specie.id}>
                                      {specie.name}
                                    </option>
                                  ))}
                              </Select>
                            </div>

                            <div className="modal__description-age">
                              <Input
                                type="text"
                                placeholder="Idade"
                                defaultValue={pet?.age}
                                onChange={changeEdit}
                                name="age"
                              />
                              <p className="modal__description-castration-title">
                                Castrado?
                              </p>
                              <div className="modal__description-castration-radio">
                                <Radio
                                  id="radio-button-3"
                                  name="radio-button-name-8"
                                  defaultChecked={pet?.cut}
                                  value="yes"
                                  onChange={(e) =>
                                    setEdition({
                                      ...edition,
                                      cut: e.target.value,
                                    })
                                  }
                                >
                                  sim
                                </Radio>
                                <Radio
                                  id="radio-button-4"
                                  name="radio-button-name-8"
                                  defaultChecked={!pet?.cut}
                                  value="not"
                                  onChange={(e) =>
                                    setEdition({
                                      ...edition,
                                      cut: e.target.value,
                                    })
                                  }
                                >
                                  não
                                </Radio>
                              </div>
                            </div>
                            <div className="modal__description-weigth">
                              <Input
                                type="text"
                                placeholder="Peso(kg)"
                                defaultValue={pet?.weight}
                                onChange={changeEdit}
                                name="weight"
                              />
                            </div>
                            <div className="modal__description-weigth">
                              <Input
                                type="text"
                                placeholder="Peso(kg)"
                                defaultValue={pet?.color}
                                onChange={changeEdit}
                                name="color"
                              />
                            </div>

                            <div className="modal__textarea">
                              <label className="label" htmlFor="description">
                                Descrição
                              </label>

                              <textarea
                                id="description"
                                rows="3"
                                cols="20"
                                defaultValue={pet?.description}
                                onChange={changeEdit}
                                name="breed"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="modal__buttons">
                          <Button color="light" onClick={cancelButtonEdition}>
                            Cancelar
                          </Button>
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
      <Footer />
    </>
  );
}

export default Permission(["admin"])(Pets);
