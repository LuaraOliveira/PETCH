import TinderCard from "react-tinder-card";
import photo from "../../assets/photos/photo.jpg";
import photo2 from "../../assets/photos/photo-mini.png";
import { ImNext2 } from "react-icons/im";
import { FaPaw } from "react-icons/fa";
import { AiOutlineHeart } from "react-icons/ai";
import { Button } from "../../components/Button";
import { BsArrowReturnLeft } from "react-icons/bs";
import { useState } from "react";
function CardTinder(props) {
  const [transition, setTransition] = useState(true);

  const onSwipe = (direction) => {
    console.log("You swiped: " + direction);
  };

  const onCardLeftScreen = (myIdentifier) => {
    console.log(myIdentifier + " left the screen");
  };
  return (
    <>
      <section id="CardTinder">
        <TinderCard
          // onSwipe={onSwipe}
          // onCardLeftScreen={() => onCardLeftScreen("fooBar")}
          // preventSwipe={["right", "left"]}
          className="card__container"
        >
          <div className="card__content">
            {transition ? (
              <>
                <div className="card__content-image">
                  <img src={props.pet.photos} alt="photo" />
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
                    <img src={props.pet.photos} alt="avatar" />
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
        </TinderCard>
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
