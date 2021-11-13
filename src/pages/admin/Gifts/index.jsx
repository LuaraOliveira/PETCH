import jspdf from "jspdf";
import autotable from "jspdf-autotable";
import { useState, useMemo } from "react";
import { BiUserCircle } from "react-icons/bi";
import { GrClose, GrImage } from "react-icons/gr";
import Modal from "react-modal";

import { AlertMessage } from "../../../components/Alert";
import { Breadcrumb } from "../../../components/Breadcrumb";
import { Button } from "../../../components/Button";
import { Footer } from "../../../components/Footer";
import { Header } from "../../../components/Header";
import { Input } from "../../../components/Input";

import { useLoader } from "../../../context/loadercontext";
import { usePetch } from "../../../context/petchcontext";
import api from "../../../services/api";
import Permission from "../../../utils/Permission";

const initialState = {
  name: "",
};

function Gifts() {
  const breadCrumb = [
    { href: "#", link: "Menu Inicial" },
    { href: "#", link: "Brindes" },
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
      height: "550px",
      overflowY: "scroll",
    },

    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.84)",
    },
  };
  const { HandlerLoader } = useLoader();
  const { gifts, DataGifts } = usePetch();

  const [gift, setGift] = useState(undefined);
  const [image, setImage] = useState(null);
  const [register, setRegister] = useState(initialState);
  const [edition, setEdition] = useState(initialState);
  const [modalIsOpenRegister, setIsOpenRegister] = useState(false);
  const [modalIsOpenData, setIsOpenData] = useState(false);

  const preview = useMemo(() => {
    return image ? URL.createObjectURL(image) : null;
  }, [image]);

  function openModalRegister(event) {
    event.preventDefault();
    setIsOpenRegister(true);
  }

  function closeModalRegister(event) {
    event.preventDefault();
    setIsOpenRegister(false);
    setRegister(initialState);
    setImage(null);
  }

  function closeModalData(event) {
    event.preventDefault();
    setIsOpenData(false);
    setGift(undefined);
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

  async function registerGift(event) {
    event.preventDefault();
    HandlerLoader(true);
    try {
      const instanceForm = new FormData();
      instanceForm.append("name", register.name);
      instanceForm.append("media", image);
      const response = await api.post("/gifts", instanceForm);
      console.log(response.data);
      AlertMessage(response.data.message, response.data.background);
      closeModalRegister(event);
      DataGifts();
    } catch (error) {
      const data = error.response.data;
      AlertMessage(data.message, data.background);
    } finally {
      HandlerLoader(false);
    }
  }
  async function editGift(event) {
    event.preventDefault();
    HandlerLoader(true);
    try {
      const instanceForm = new FormData();
      if (edition.name) instanceForm.append("name", edition.name);
      const response = await api.put(`/gifts/${gift.id}`, instanceForm);
      console.log(response.data);
      AlertMessage(response.data.message, response.data.background);
      closeModalData(event);
      DataGifts();
    } catch (error) {
      const data = error.response.data;
      AlertMessage(data.message, data.background);
    } finally {
      HandlerLoader(false);
    }
  }

  async function infoGift(id) {
    HandlerLoader(true);
    try {
      const response = await api.get(`/gifts/${id}?inactives=true`);
      setGift(response.data);
      setIsOpenData(true);
      console.log(response);
    } catch (error) {
      const data = error.response.data;
      AlertMessage(data.message, data.background);
    } finally {
      HandlerLoader(false);
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

  async function statusGifts(gift) {
    const status = gift.deletedAt ? "true" : "false";
    HandlerLoader(true);
    try {
      await api.delete(`/gifts/${gift.id}`, { params: { status } });
      DataGifts();
    } catch (error) {
    } finally {
      HandlerLoader(false);
    }
  }

  async function exportGifts() {
    const pdf = new jspdf("l");
    const columns = [
      {
        header: "Id",
        dataKey: "id",
      },
      {
        header: "Nome",
        dataKey: "name",
      },
    ];
    HandlerLoader(true);
    try {
      const response = await api.get("/gifts/all");
      autotable(pdf, { columns, body: response.data });
      console.log(response.data);
      pdf.output(`dataurlnewwindow`);
    } catch (error) {
    } finally {
      HandlerLoader(false);
    }
  }
  return (
    <>
      <Header />
      <section className="container" id="gifts">
        <div className="row">
          <div className="col-md-12">
            <Breadcrumb list={breadCrumb} />
          </div>
          <div className="col-md-12">
            <div className="gifts__create">
              <div className="gifts__forms">
                <p className="gifts__forms-title">Criar novo brinde</p>
                <div className="gifts__forms-content">
                  <Button onClick={openModalRegister}>Adicionar brinde</Button>
                  <Modal
                    isOpen={modalIsOpenRegister}
                    onRequestClose={closeModalRegister}
                    style={customStyles}
                    contentLabel="Example Modal"
                    ariaHideApp={false}
                    portalClassName="gift"
                  >
                    <div className="modal__container">
                      <div className="modal__container-close">
                        <button onClick={closeModalRegister}>
                          <GrClose />
                        </button>
                      </div>
                      <div className="modal__header">
                        <h2 className="modal__header-title">
                          Adicionar Novo Brinde
                        </h2>
                      </div>
                      <form onSubmit={registerGift} className="forms">
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
                              <GrImage />
                            </label>
                          </div>
                          <div className="modal__description">
                            <div className="modal__description-input">
                              <Input
                                type="text"
                                placeholder="Nome do Brinde"
                                value={register.name}
                                onChange={change}
                                name="name"
                              />
                            </div>
                          </div>

                          <div className="modal__buttons">
                            <Button color="light" onClick={cancelButton}>
                              Cancelar
                            </Button>
                            <Button color="primary">Cadastrar</Button>
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
            <div className="gifts__create">
              <div className="gifts__create--container">
                <p className="gifts__create-title">Lista de Brindes</p>
                <Button color="primary" onClick={exportGifts}>
                  Ver relatório completo
                </Button>
              </div>
              <div className="gifts__body">
                {gifts &&
                  gifts.map((gift) => (
                    <div key={gift.id} className="gifts__body-container">
                      <div className="gifts__body-image">
                        {!gift.image ? (
                          <BiUserCircle />
                        ) : (
                          <img src={gift?.image} alt="avatar" />
                        )}
                      </div>
                      <div className="gifts__body-info">
                        <ul className="gifts__body-list">
                          <li className="item">Nome: {gift.name}</li>
                          <li className="item">
                            {" "}
                            Status: {gift.deletedAt ? "inativo" : "ativo"}
                          </li>
                        </ul>
                        <div className="gifts__body-buttons">
                          <Button onClick={() => infoGift(gift.id)}>
                            Informações
                          </Button>
                          <Button
                            color={gift.deletedAt ? "success" : "disabled"}
                            className="btn"
                            onClick={() => statusGifts(gift)}
                          >
                            {gift.deletedAt ? "Habilitar" : "Desabilitar"}
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                <Modal
                  isOpen={modalIsOpenData}
                  onRequestClose={closeModalData}
                  style={customStyles}
                  contentLabel="Example Modal"
                  ariaHideApp={false}
                  portalClassName="gift"
                >
                  <div className="modal__container">
                    <div className="modal__container-close">
                      <button onClick={closeModalData}>
                        <GrClose />
                      </button>
                    </div>
                    <div className="modal__header">
                      <h2 className="modal__header-title">Dados do Brinde</h2>
                    </div>
                    <form onSubmit={editGift} className="forms">
                      <div className="modal__body">
                        <div className="modal__image">
                          <img src={gift?.image} alt="avatar" />
                        </div>
                        <div className="modal__description">
                          <div className="modal__description-input">
                            <Input
                              type="text"
                              placeholder="Nome do Brinde"
                              defaultValue={gift?.name}
                              onChange={changeEdit}
                              name="name"
                            />
                          </div>
                        </div>

                        <div className="modal__buttons">
                          <Button color="light" onClick={cancelButtonEdition}>
                            Cancelar
                          </Button>
                          <Button color="primary">Editar</Button>
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

export default Permission(["admin"])(Gifts);
