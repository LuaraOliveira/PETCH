import { Button } from "../Button";
import { AiFillCamera } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
import { useState } from "react";
import photoBig from "../../assets/photos/photo-big.jpg";
import Modal from "react-modal";
function CardAdoption() {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      borderRadius: "16px",
      padding: "16px",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal(event) {
    setIsOpen(true);
    event.preventDefault();
  }

  function closeModal(event) {
    setIsOpen(false);
    event.preventDefault();
  }

  return (
    <>
      <section id="CardAdoption">
        <div className="card__container">
          <div className="card__content">
            <div className="card__header">
              <div className="card__header-info">
                <h2 className="card__header-title">Pipoca </h2>
                <p className="card__header-genre">♂ - 2 anos e 3 meses</p>
              </div>
              <div className="card__header-image">
                <img src={photoBig} alt="avatar" className="image-modal" />
                <Button color="camera" onClick={openModal}>
                  <AiFillCamera />
                </Button>
                <Modal
                  isOpen={modalIsOpen}
                  onRequestClose={closeModal}
                  style={customStyles}
                  contentLabel="Example Modal"
                >
                  <Button color="camera" onClick={closeModal}>
                    <AiOutlineClose />
                  </Button>
                  <img src={photoBig} alt="avatar" className="image-modal" />
                </Modal>
              </div>
            </div>
            <div className="card__info">
              <ul className="card__info-list">
                <li className="text">
                  ONG responsável:
                  <br /> Casa do Cão Feliz
                </li>
                <li className="text">
                  Telefone para Contato:
                  <br />
                  (11) 99999-9999
                </li>
                <li className="text">
                  Falar com:
                  <br /> Sandra Helena
                </li>
              </ul>

              <p className="card__info-subtitle">
                Entre em contato em até 48 horas para fazer uma visita ao pet
                para confirmar o interesse!
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default CardAdoption;
