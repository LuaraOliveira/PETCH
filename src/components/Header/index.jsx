import { FaUserCircle } from "react-icons/fa";

export function Header() {
  return (
    <>
      <header className="header">
        <div className="header__container">
          <div></div>
          <div className="header__content">
            <div className="header__logo">
              <h1 className="header__logo-title">PETCH</h1>
            </div>
          </div>
          <div className="header__info">
            <div className="header__user">
              <div className="header__user-image">
                <FaUserCircle className="header__user-image-icon" />
              </div>
              <p className="header__user-title">Olá, Luara.</p>
            </div>
            <div className="header__info-exit">
              <button type="button" className="btn">
                Sair
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
