import photoEnd from "../../assets/photos/photo-petch-end.png";

function CardTinderInfo() {
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
          </div>
        </div>
      </section>
    </>
  );
}

export default CardTinderInfo;
