import Modal from "react-modal";
import { ImNext2 } from "react-icons/im";
import { FaPaw } from "react-icons/fa";
import { AlertMessage } from "../../components/Alert";
import { Button } from "../../components/Button";
import { BsArrowReturnLeft } from "react-icons/bs";
import { useState } from "react";
import { usePetch } from "../../context/petchcontext";
import {
  AiFillCamera,
  AiOutlineClose,
  AiOutlineHeart,
  AiFillStar,
  AiOutlineStar,
  AiOutlineDislike,
} from "react-icons/ai";
import api from "../../services/api";

function CardTinder(props) {
  const { pets, DataFilterPet, favorites } = usePetch();

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

  async function Favorite(PetId) {
    try {
      await api.patch(`/favorites/${PetId}`);
      DataFilterPet(pets.filter((params) => params.id !== PetId));
    } catch (error) {}
  }

  async function Adopter(PetId) {
    try {
      const response = await api.patch(`/pets/${PetId}`);
      AlertMessage(response.data.message, response.data.background);
    } catch (error) {}
  }

  async function Dislike(PetId) {
    try {
      await api.patch(`/dislikes/${PetId}`);
      DataFilterPet(pets.filter((params) => params.id !== PetId));
    } catch (error) {}
  }

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
          <Button color="circle dislike" onClick={() => Dislike(props.pet.id)}>
            <AiOutlineDislike />
          </Button>
          <Button color="circle fav" onClick={() => Favorite(props.pet.id)}>
            {/* {favorites.find((param) =>
              param.id === props.pet.id ? <AiFillStar /> : <AiOutlineStar />
            )} */}

            <AiOutlineStar />
          </Button>
          <Button color="gradient" onClick={() => Adopter(props.pet.id)}>
            <AiOutlineHeart />
          </Button>
        </div>
      </section>
    </>
  );
}

export default CardTinder;
