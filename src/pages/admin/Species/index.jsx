import { Breadcrumb } from "../../../components/Breadcrumb";
import { BiUserCircle } from "react-icons/bi";
import { Button } from "../../../components/Button";
import { useState, useMemo } from "react";
import api from "../../../services/api";
import Modal from "react-modal";
import { Input } from "../../../components/Input";
import { GrClose } from "react-icons/gr";
import { GrImage } from "react-icons/gr";
import { usePetch } from "../../../context/petchcontext";
import Permission from "../../../utils/Permission";
const initialState = {
  name: "",
};

function Species() {
  const breadCrumb = [
    { href: "#", link: "Menu Inicial" },
    { href: "#", link: "Espécies" },
  ];

  const { species, DataSpecies } = usePetch();
  const [specie, setSpecie] = useState(undefined);
  const [image, setImage] = useState(null);
  const preview = useMemo(() => {
    return image ? URL.createObjectURL(image) : null;
  }, [image]);
  const [register, setRegister] = useState(initialState);
  const [edition, setEdition] = useState(initialState);

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

  const [modalIsOpenRegister, setIsOpenRegister] = useState(false);
  const [modalIsOpenData, setIsOpenData] = useState(false);

  function openModalRegister(event) {
    event.preventDefault();
    setIsOpenRegister(true);
  }

  function closeModalRegister(event) {
    event.preventDefault();
    setIsOpenRegister(false);
    setSpecie(undefined);
  }

  function closeModalData(event) {
    event.preventDefault();
    setIsOpenData(false);
    setSpecie(undefined);
    setImage(null);
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

  async function infoSpecies(id) {
    try {
      const response = await api.get(`/species/${id}?inactives=true`);
      setSpecie(response.data);
      setIsOpenData(true);
      console.log(response);
    } catch (error) {
      console.log(error.response);
    }
  }

  async function registerSpecies(event) {
    event.preventDefault();
    try {
      const instanceForm = new FormData();
      instanceForm.append("name", register.name);
      instanceForm.append("media", image);
      const response = await api.post("/species", instanceForm);
      console.log(response.data);
      closeModalRegister(event);
      DataSpecies();
    } catch (error) {
      console.log(error.response);
    }
  }

  async function editSpecie(event) {
    event.preventDefault();
    try {
      const instanceForm = new FormData();
      if (edition.name) instanceForm.append("name", edition.name);
      const response = await api.put(`/species/${specie.id}`, instanceForm);
      console.log(response.data);
      closeModalData(event);
      DataSpecies();
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

  async function statusSpecies(specie) {
    const status = specie.deletedAt ? "true" : "false";
    try {
      await api.delete(`/species/${specie.id}`, { params: { status } });
      DataSpecies();
    } catch (error) {}
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
              <div className="species__forms">
                <p className="species__forms-title">Criar nova espécie</p>
                <div className="species__forms-content">
                  <Button onClick={openModalRegister}>Adicionar Espécie</Button>
                  <Modal
                    isOpen={modalIsOpenRegister}
                    onRequestClose={closeModalRegister}
                    style={customStyles}
                    contentLabel="Example Modal Register"
                    ariaHideApp={false}
                    portalClassName="species"
                  >
                    <div className="modal__container">
                      <div className="modal__container-close">
                        <button onClick={closeModalRegister}>
                          <GrClose />
                        </button>
                      </div>
                      <div className="modal__header">
                        <h2 className="modal__header-title">
                          Adicionar Espécie
                        </h2>
                      </div>
                      <form onSubmit={registerSpecies} className="forms">
                        <div className="modal__body">
                          <div className="modal__description center">
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
                          </div>

                          <Input
                            type="text"
                            placeholder="Nome da Espécie"
                            value={register.name}
                            onChange={change}
                            name="name"
                          />

                          <div className="modal__buttons">
                            <Button color="light" onClick={cancelButton}>
                              Cancelar
                            </Button>
                            <Button color="primary">Criar Espécie</Button>
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
            <div className="species__create">
              <p className="species__create-title">Lista de Espécies</p>
              <div className="species__body">
                {species &&
                  species.map((specie) => (
                    <div key={specie.id} className="species__body-container">
                      <div className="species__body-image">
                        {!specie.image ? (
                          <BiUserCircle />
                        ) : (
                          <img src={specie?.image} alt="avatar" />
                        )}
                      </div>
                      <div className="species__body-info">
                        <ul className="species__body-list">
                          <li className="item">Espécie: {specie.name}</li>
                          <li className="item">
                            {" "}
                            Status: {specie.deletedAt ? "inativo" : "ativo"}
                          </li>
                        </ul>
                        <div className="species__body-buttons">
                          <Button onClick={() => infoSpecies(specie.id)}>
                            Informações
                          </Button>

                          <Button
                            color={specie.deletedAt ? "success" : "disabled"}
                            className="btn"
                            onClick={() => statusSpecies(specie)}
                          >
                            {specie.deletedAt ? "Habilitar" : "Desabilitar"}
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                <Modal
                  isOpen={modalIsOpenData}
                  onRequestClose={closeModalData}
                  style={customStyles}
                  contentLabel="Example Modal Register"
                  ariaHideApp={false}
                  portalClassName="species"
                >
                  <div className="modal__container">
                    <div className="modal__container-close">
                      <button onClick={closeModalData}>
                        <GrClose />
                      </button>
                    </div>
                    <div className="modal__header">
                      <h2 className="modal__header-title">Dados da Espécie</h2>
                    </div>
                    <form onSubmit={editSpecie} className="forms">
                      <div className="modal__body">
                        <div className="modal__description center">
                          <div className="modal__image">
                            <img src={specie?.image} alt="avatar" />
                          </div>
                        </div>

                        <Input
                          type="text"
                          placeholder="Nome da Espécie"
                          defaultValue={specie?.name}
                          onChange={changeEdit}
                          name="name"
                        />
                        <div className="modal__buttons">
                          <Button color="light" onClick={cancelButtonEdition}>
                            Cancelar
                          </Button>
                          <Button color="primary">Criar Espécie</Button>
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

export default Permission(["admin"])(Species);
