import { FaUserCircle } from "react-icons/fa";
import { Button } from "../../components/Button";
import { Link } from "react-router-dom";
import { useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";

export function Header() {
  const [menu, setMenu] = useState(false);

  return (
    <>
      <header className="header">
        <div className="header__container">
          <nav>
            <div className="menu__hamburguer" onClick={() => setMenu(true)}>
              <span></span>
              <span></span>
              <span></span>
            </div>
            <div className={`menu__background ${menu ? "active" : ""}`}>
              <div className={`menu__list ${menu ? "active" : ""}`}>
                <div className="menu__list-close">
                  <AiFillCloseCircle onClick={() => setMenu(false)} />
                </div>
                <div className="menu__list-itens">
                  <Link to="/Administrador">Administradores</Link>
                  <Link to="/CompanyPartner">Empresas Parceiras</Link>
                  <Link to="/Gifts">Brindes</Link>
                  <Link to="#">Espécieis</Link>
                  <Link to="#">Pets</Link>
                  <Link to="#">Adotantes</Link>
                  <Link to="#">ONGs</Link>
                  <Link to="#">Relatórios</Link>
                </div>
              </div>
            </div>
          </nav>
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
              <Button color="primary" className="btn">
                Sair
              </Button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
