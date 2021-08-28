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
// import Permission from "../../utils/Permission";
function Gifts() {
  const breadCrumb = [
    { href: "#", link: "Menu Inicial" },
    { href: "#", link: "Brindes" },
  ];

  const [gifts, setGifts] = useState([]);
  const [gift, setGift] = useState(undefined);

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
    setGift(undefined);
  }

  async function infoGift(id) {
    try {
      const response = await api.get(`/gifts/${id}`);
      setGift(response.data);
      setIsOpen(true);
      console.log(response);
    } catch (error) {
      console.log(error.response);
    }
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
              <form className="gifts__forms">
                <p className="gifts__forms-title">Criar novo brinde</p>
                <div className="gifts__forms-content">
                  <Button onClick={openModal}>Adicionar brinde</Button>
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
                          {gift === undefined
                            ? " Adicionar Novo Brinde"
                            : "Dados do Brinde"}
                        </h2>
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
                              <label className="label" for="coverage">
                                Descrição
                              </label>

                              <textarea
                                id="coverage"
                                rows="3"
                                cols="20"
                                defaultValue={gift?.description}
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

                          <div className="modal__address">
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

                          <div className="modal__textarea">
                            <label className="label" for="coverage">
                              Abrangência
                            </label>

                            <textarea id="coverage" rows="3" cols="20" />
                          </div>

                          <div className="modal__buttons">
                            <Button color="ligth">Cancelar</Button>
                            <Button color="primary">
                              {gift === undefined
                                ? "Cadastrar Brinde"
                                : "Editar Brinde"}
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
            <div className="gifts__create">
              <p className="gifts__create-title">Lista de brindes criados</p>
              <div className="gifts__body">
                {gifts &&
                  gifts.map((gift) => (
                    <div key={gift.id} className="gifts__body-container">
                      <div className="gifts__body-image">
                        <BiUserCircle />
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
                          <Button
                            color="primary"
                            onClick={() => infoGift(gift.id)}
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

// export default Permission(["admin"])(Gifts); isso aqui serve para eu diferenciar o admin / adotante.

export default Gifts;
