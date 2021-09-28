import photoNotFound from "../../assets/photos/photo-petch-not.png";
import { AiOutlineSearch } from "react-icons/ai";
import { Button } from "../Button";
import { useHistory } from "react-router-dom";
function CardNotLike() {
  const history = useHistory();

  function changePage(name) {
    history.push(name);
  }
  return (
    <>
      <section id="CardNoLike">
        <div className="card__container">
          <div className="card__content">
            <div className="card__header">
              <div className="card__header-image-end">
                <img src={photoNotFound} alt="avatar" />
              </div>
            </div>
            <div className="card__info">
              <p className="card__info-title">
                Você ainda não curtiu nenhum pet. Está bem vazio por aqui...
              </p>
            </div>
            <div className="card__buttons">
              <Button
                color="gradient"
                onClick={() => changePage("/adopter/Dashboard")}
              >
                <AiOutlineSearch />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default CardNotLike;
