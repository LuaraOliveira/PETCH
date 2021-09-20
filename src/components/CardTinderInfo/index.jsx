// import TinderCard from "react-tinder-card";
import photo from "../../assets/photos/photo-mini.png";
import photoEnd from "../../assets/photos/photo-petch-end.png";
import { ImNext2 } from "react-icons/im";
import { FaPaw } from "react-icons/fa";
// import { AiOutlineShareAlt } from "react-icons/ai";
import { FaSlidersH } from "react-icons/fa";
import { AiOutlineHeart } from "react-icons/ai";
import { Button } from "../Button";
function CardTinderInfo() {
  // const onSwipe = (direction) => {
  //   console.log("You swiped: " + direction);
  // };

  // const onCardLeftScreen = (myIdentifier) => {
  //   console.log(myIdentifier + " left the screen");
  // };
  return (
    <>
      <section id="CardTinderInfo">
        <div className="card__container">
          <div className="card__content">
            <div className="card__header">
              <div className="card__header-image-end">
                <img src={photoEnd} alt="avatar" />
              </div>
            </div>
            <div className="card__info">
              <p className="card__info-title">
                Refine sua pesquisa ou reveja os pets que ainda estão
                disponíveis.
              </p>
            </div>
            <div className="card__buttons">
              <Button color="gradient">
                <FaSlidersH />
              </Button>
              <Button color="circle">
                <ImNext2 />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default CardTinderInfo;
