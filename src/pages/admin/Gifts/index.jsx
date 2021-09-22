import { Breadcrumb } from "../../../components/Breadcrumb";
import { BiUserCircle } from "react-icons/bi";
import { Button } from "../../../components/Button";
import { useState, useMemo } from "react";
import api from "../../../services/api";
import Modal from "react-modal";
import { Select } from "../../../components/Select";
import { Input } from "../../../components/Input";
import { GrClose } from "react-icons/gr";
import { GrImage } from "react-icons/gr";
import Permission from "../../../utils/Permission";
import { usePetch } from "../../../context/petchcontext";
function Gifts() {
  const breadCrumb = [
    { href: "#", link: "Menu Inicial" },
    { href: "#", link: "Brindes" },
  ];

  const [gift, setGift] = useState(undefined);
  const [image, setImage] = useState(null);
  const { gifts, partners } = usePetch();

  const preview = useMemo(() => {
    return image ? URL.createObjectURL(image) : null;
  }, [image]);
  const [register, setRegister] = useState({
    name: "",
    size: "",
    color: "",
    weight: "",
    taste: "",
    description: "",
    coverage: "",
    partnerId: "",
  });

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
    setGift(undefined);
  }

  function closeModalData(event) {
    event.preventDefault();
    setIsOpenData(false);
    setGift(undefined);
    setImage(null);
  }

  async function registerGift(event) {
    event.preventDefault();
    try {
      const instanceForm = new FormData();
      instanceForm.append("name", register.name);
      instanceForm.append("size", register.size);
      instanceForm.append("color", register.color);
      instanceForm.append("weight", register.weight);
      instanceForm.append("description", register.description);
      instanceForm.append("coverage", register.coverage);
      instanceForm.append("taste", register.taste);
      instanceForm.append("media", image);
      instanceForm.append("partnerId", register.partnerId);
      const response = await api.post("/gifts", instanceForm);
      console.log(response.data);
    } catch (error) {
      console.log(error.response);
    }
  }

  async function infoGift(id) {
    try {
      const response = await api.get(`/gifts/${id}`);
      setGift(response.data);
      setIsOpenData(true);
      console.log(response);
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

  async function statusGifts(gift) {
    const status = gift.deletedAt ? "true" : "false";
    try {
      await api.delete(`/gifts/${gift.id}`, { params: { status } });
    } catch (error) {}
  }
  return (
    <>
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
                          <div className="modal__description">
                            <div className="modal__description-input">
                              <Input
                                type="text"
                                placeholder="Nome do Brinde"
                                value={register.name}
                                onChange={change}
                                name="name"
                              />
                              <Input
                                type="text"
                                placeholder="Cor"
                                value={register.color}
                                onChange={change}
                                name="color"
                              />
                              <Input
                                type="text"
                                placeholder="Tamanho"
                                value={register.size}
                                onChange={change}
                                name="size"
                              />
                              <Input
                                type="text"
                                placeholder="Peso"
                                value={register.weight}
                                onChange={change}
                                name="weight"
                              />
                              <Select
                                name="partnerId"
                                onChange={change}
                                value={register.partnerId}
                              >
                                <option value="" defaultChecked disabled>
                                  Selecionar Parceiro
                                </option>
                                {partners &&
                                  partners.map((partner) => (
                                    <option value={partner.id} key={partner.id}>
                                      {partner.fantasyName}
                                    </option>
                                  ))}
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
                                <GrImage color="red" size="120px" />
                              </label>
                            </div>
                          </div>
                          <div className="modal__textarea">
                            <label className="label" htmlFor="coverage">
                              Descrição
                            </label>

                            <textarea
                              id="coverage"
                              rows="3"
                              cols="20"
                              value={register.description}
                              onChange={change}
                              name="description"
                            />
                          </div>

                          <div className="modal__textarea">
                            <label className="label" htmlFor="coverage">
                              Abrangência
                            </label>

                            <textarea
                              id="coverage"
                              rows="3"
                              cols="20"
                              value={register.coverage}
                              onChange={change}
                              name="coverage"
                            />
                          </div>

                          <div className="modal__buttons">
                            <Button color="light">Cancelar</Button>
                            <Button color="primary">Cadastrar Brinde</Button>
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
              <p className="gifts__create-title">Lista de brindes criados</p>
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
                            Descrição: {gift.description}
                          </li>
                          <li className="item">Tamanho: {gift.size}</li>
                          <li className="item">Cor: {gift.color}</li>
                          <li className="item">Peso: {gift.weight}</li>
                          <li className="item">Gosto: {gift.taste}</li>
                          {/* <li className="item">
                            Meio de Comunicação: {gift.media}
                          </li> */}
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
                    <form className="forms">
                      <div className="modal__body">
                        <div className="modal__description">
                          <div className="modal__description-input">
                            <Input
                              type="text"
                              placeholder="Nome do Brinde"
                              defaultValue={gift?.name}
                            />
                            <Input
                              type="text"
                              placeholder="Cor"
                              defaultValue={gift?.color}
                            />
                            <Input
                              type="text"
                              placeholder="Tamanho"
                              defaultValue={gift?.size}
                            />
                            <Input
                              type="text"
                              placeholder="Peso"
                              defaultValue={gift?.weight}
                            />
                          </div>

                          <div className="modal__image">
                            <img src={gift?.image} alt="avatar" />
                          </div>
                        </div>

                        <div className="modal__textarea">
                          <label className="label" htmlFor="description">
                            Descrição
                          </label>

                          <textarea
                            id="description"
                            rows="3"
                            cols="20"
                            defaultValue={gift?.description}
                          />
                        </div>

                        <div className="modal__textarea">
                          <label className="label" htmlFor="coverage">
                            Abrangência
                          </label>

                          <textarea
                            id="coverage"
                            rows="3"
                            cols="20"
                            defaultValue={gift?.coverage}
                          />
                        </div>

                        <div className="modal__buttons">
                          <Button color="light">Cancelar</Button>
                          <Button color="primary">Cadastrar Brinde</Button>
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

export default Permission(["admin"])(Gifts);

// export default Gifts;
