import { Button } from "../../components/Button";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { isLogout } from "../../services/auth";
import { AiOutlineClose } from "react-icons/ai";
import { BsGear, BsBookmarks } from "react-icons/bs";
import { BiSliderAlt } from "react-icons/bi";

import { RiLogoutBoxRLine } from "react-icons/ri";
import logo from "../../assets/logo/logo-color.svg";
import avatar from "../../assets/avatar/avatar.png";
export function HeaderAdopter() {
  const [menu, setMenu] = useState(false);
  const history = useHistory();

  function changePage(name) {
    history.push(name);
    setMenu(false);
  }
  return (
    <>
      <header className="headerAdopter">
        <div className="headerAdopter__container">
          <nav>
            <div
              className="menuAdopter__hamburguer"
              onClick={() => setMenu(true)}
            >
              <span></span>
              <span></span>
              <span></span>
            </div>
            <div className={`menuAdopter__background ${menu ? "active" : ""}`}>
              <div className={`menuAdopter__list ${menu ? "active" : ""}`}>
                <div className="menuAdopter__list-close">
                  <AiOutlineClose onClick={() => setMenu(false)} />
                </div>
                <div className="menuAdopter__list-itens">
                  <p className="menuAdopter__list-itens-name">Olá, Luara!</p>

                  <p onClick={() => changePage("/adopters/Settings")}>
                    <BsGear />
                    Configurações
                  </p>
                  <p onClick={() => changePage()}>
                    <BiSliderAlt />
                    Filtro de pesquisa
                  </p>
                  <p onClick={() => changePage()}>
                    {" "}
                    <BsBookmarks />
                    Pets Curtidos
                  </p>
                  <p onClick={isLogout}>
                    <RiLogoutBoxRLine />
                    Sair
                  </p>
                </div>
              </div>
            </div>
          </nav>
          <div className="headerAdopter__content">
            <div className="headerAdopter__logo">
              <img src={logo} alt="Petch" />
            </div>
          </div>
          <div className="headerAdopter__info">
            <div className="headerAdopter__user">
              <div className="headerAdopter__user-image">
                {/* <FaUserCircle className="headerAdopter__user-image-icon" /> */}
                <button onClick={() => changePage("/adopters/Settings")}>
                  <img src={avatar} alt="avatar" />
                </button>
              </div>
              <p className="headerAdopter__user-title">Olá, Luara.</p>
            </div>
            <div className="headerAdopter__info-exit">
              <Button color="primary" className="btn" onClick={isLogout}>
                Sair
              </Button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
