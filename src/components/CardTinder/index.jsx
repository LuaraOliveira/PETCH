import Modal from "react-modal";
import { ImNext2 } from "react-icons/im";
import { FaPaw } from "react-icons/fa";
import { AiOutlineHeart } from "react-icons/ai";
import { Button } from "../../components/Button";
import { BsArrowReturnLeft } from "react-icons/bs";
import { useState } from "react";
import { AiFillCamera } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";

function CardTinder(props) {
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

  const [transition, setTransition] = useState(true);

  return (
    <>
      <section id="CardTinder">
        <div className="card__container">
          <div className="card__content">
            {transition ? (
              <>
                <div className="card__content-image">
                  <img
                    src={props.pet.image}
                    alt="animal"
                    className="image-modal"
                  />
                </div>
                <div className="card__info">
                  <h2 className="card__info-title">{props.pet.name} ♂</h2>
                  <p className="card__info-description">
                    {props.pet.description}
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="card__header">
                  <div className="card__header-info">
                    <h2 className="card__header-title">{props.pet.name} </h2>
                    <p className="card__header-genre">♂ - {props.pet.age}</p>
                  </div>
                  <div className="card__header-image">
                    <img
                      src={props.pet.image}
                      alt="avatar"
                      className="image-modal"
                    />
                    <Button color="camera" onClick={openModal}>
                      <AiFillCamera />
                    </Button>
                    <Modal
                      isOpen={modalIsOpen}
                      onRequestClose={closeModal}
                      style={customStyles}
                      contentLabel="Example Modal"
                      ariaHideApp={false}
                    >
                      <Button color="camera" onClick={closeModal}>
                        <AiOutlineClose />
                      </Button>

                      <img
                        src={props.pet.image}
                        alt="animal"
                        className="image-modal"
                      />
                    </Modal>
                  </div>
                </div>
                <div className="card__info">
                  <ul className="card__info-list">
                    <li className="text">
                      Castrado: {props.pet.cut ? "sim" : "não"}
                    </li>
                    <li className="text">Peso: {props.pet.weight}</li>
                    <li className="text">
                      Onde ele está?
                      <br /> {props.pet.ong.city}
                    </li>
                    <li className="text">
                      ONG responsável:
                      <br /> {props.pet.ong.name}
                    </li>
                  </ul>

                  <p className="card__info-subtitle">
                    Gostou? Aperte no coração que o pet vai para a lista de
                    curtidos para possível adoção.
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
        <div className="card__buttons">
          <Button color="circle" onClick={() => setTransition(!transition)}>
            {transition ? <FaPaw /> : <BsArrowReturnLeft />}
          </Button>
          <Button color="gradient">
            <AiOutlineHeart />
          </Button>
          <Button color="circle">
            <ImNext2 />
          </Button>
        </div>
      </section>
    </>
  );
}

export default CardTinder;
