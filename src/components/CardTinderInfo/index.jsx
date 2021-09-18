import TinderCard from "react-tinder-card";
import photo from "../../assets/photos/photo-mini.png";
import { ImNext2 } from "react-icons/im";
import { FaPaw } from "react-icons/fa";
import { AiOutlineShareAlt } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";
import { Button } from "../Button";
function CardTinderInfo() {
  const onSwipe = (direction) => {
    console.log("You swiped: " + direction);
  };

  const onCardLeftScreen = (myIdentifier) => {
    console.log(myIdentifier + " left the screen");
  };
  return (
    <>
      <section id="CardTinderInfo">
        <TinderCard
          onSwipe={onSwipe}
          onCardLeftScreen={() => onCardLeftScreen("fooBar")}
          preventSwipe={["right", "left"]}
          className="card__container"
        >
          <div className="card__content">
            <div className="card__header">
              <div className="card__header-info">
                <h2 className="card__header-title">Pipoca</h2>
                <p className="card__header-genre">♂ - 2 anos e 3 meses︎︎</p>
              </div>
              <div className="card__header-image">
                <img src={photo} alt="avatar" />
              </div>
            </div>
            <div className="card__info">
              <ul className="card__info-list">
                <li className="text">Castrado: Sim</li>
                <li className="text">Peso: 8kg</li>
                <li className="text">
                  Onde ele está?
                  <br /> São Paulo - SP
                </li>
                <li className="text">
                  ONG responsável:
                  <br /> Casa do Cão Feliz
                </li>
              </ul>

              <p className="card__info-title">
                Gostou? Aperte no coração que o pet vai para a lista de curtidos
                para possível adoção.
              </p>
            </div>
            <div className="card__buttons">
              <Button color="circle">
                <AiOutlineShareAlt />
              </Button>
              <Button color="gradient">
                <AiOutlineHeart />
              </Button>
              <Button color="circle">
                <ImNext2 />
              </Button>
            </div>
          </div>
        </TinderCard>
      </section>
    </>
  );
}

export default CardTinderInfo;
