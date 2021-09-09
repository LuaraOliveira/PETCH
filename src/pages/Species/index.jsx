import { Breadcrumb } from "../../components/Breadcrumb";
import { BiUserCircle } from "react-icons/bi";
import { Button } from "../../components/Button";
import { useState, useEffect, useMemo } from "react";
import api from "../../services/api";
import Modal from "react-modal";
import { Input } from "../../components/Input";
import { GrClose } from "react-icons/gr";
import { GrImage } from "react-icons/gr";

function Species() {
  const breadCrumb = [
    { href: "#", link: "Menu Inicial" },
    { href: "#", link: "Espécies" },
  ];

  const [species, setSpecies] = useState([]);
  const [specie, setSpecie] = useState(undefined);
  const [image, setImage] = useState(null);
  const preview = useMemo(() => {
    return image ? URL.createObjectURL(image) : null;
  }, [image]);
  const [register, setRegister] = useState({
    fantasyName: "",
    cnpj: "",
    email: "",
    phone1: "",
  });

  useEffect(() => {
    api
      .get("/species?inactives=true")
      .then((response) => setSpecies(response.data));
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

  async function infoSpecies(id) {
    try {
      const response = await api.get(`/species/${id}`);
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
      instanceForm.append("fantasyName", register.fantasyName);
      instanceForm.append("cnpj", register.cnpj);
      instanceForm.append("email", register.email);
      instanceForm.append("phone1", register.phone1);
      instanceForm.append("media", image);
      const response = await api.post("/species", instanceForm);
      console.log(response.data);
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
                          />

                          <p className="modal__species-title">Portes</p>
                          <div className="modal__species">
                            <div className="modal__species-container">
                              <Input type="text" placeholder="Descrição" />
                              <Input
                                type="text"
                                placeholder="Peso Inicial"
                                value={register.initWeight}
                                onChange={change}
                              />
                              <Input
                                type="text"
                                placeholder="Peso Final"
                                value={register.endWeight}
                                onChange={change}
                              />
                              <Button color="light">Editar</Button>
                              <Button color="secondary">Excluir</Button>
                            </div>
                            <div className="modal__species-description">
                              <Input type="text" placeholder="Descrição" />
                              <Input
                                type="text"
                                placeholder="Peso Inicial"
                                value={register.initWeight}
                                onChange={change}
                              />
                              <Input
                                type="text"
                                placeholder="Peso Final"
                                value={register.endWeight}
                                onChange={change}
                              />
                              <Button color="primary">Adicionar Porte</Button>
                            </div>
                          </div>

                          <div className="modal__buttons">
                            <Button color="light">Cancelar</Button>
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
                        <BiUserCircle />
                      </div>
                      <div className="species__body-info">
                        <ul className="species__body-list">
                          <li className="item">Espécie: {specie.name}</li>
                          <li className="item">
                            Avatar Cadastrado: {specie.cnpj}
                          </li>
                          <li className="item">Portes: {specie.initWeight}</li>
                          <li className="item">
                            {" "}
                            Status: {specie.deletedAt ? "inativo" : "ativo"}
                          </li>
                        </ul>
                        <div className="species__body-buttons">
                          <Button onClick={() => infoSpecies(specie.id)}>
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
                    <form className="forms">
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
                        />

                        <p className="modal__species-title">Portes</p>
                        <div className="modal__species">
                          {specie?.sizes &&
                            specie?.sizes.map((specie) => (
                              <div className="modal__species-container">
                                <Input
                                  type="text"
                                  placeholder="Descrição"
                                  defaultValue={specie?.name}
                                />
                                <Input
                                  type="text"
                                  placeholder="Peso Inicial"
                                  defaultValue={specie?.initWeight}
                                />
                                <Input
                                  type="text"
                                  placeholder="Peso Final"
                                  defaultValue={specie?.endWeight}
                                />
                                <Button color="light">Editar</Button>
                                <Button color="secondary">Excluir</Button>
                              </div>
                            ))}
                        </div>

                        <div className="modal__buttons">
                          <Button color="light">Cancelar</Button>
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
export default Species;
