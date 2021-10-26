import { Button } from "../../components/Button";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { isLogout } from "../../services/auth";
import { AiOutlineClose, AiOutlineHome, AiOutlineUser } from "react-icons/ai";
import Cookie from "js-cookie";
import { BiSliderAlt } from "react-icons/bi";

import { RiLogoutBoxRLine } from "react-icons/ri";
import logo from "../../assets/logo/logo-color.svg";
import avatar from "../../assets/avatar/avatar.png";
export function HeaderAdopter() {
  const [menu, setMenu] = useState(false);
  const history = useHistory();
  const user = Cookie.getJSON(process.env.REACT_APP_USER);

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
                  <p
                    className="menuAdopter__list-itens-name"
                    onClick={() => changePage("/adopter/Settings")}
                  >
                    Olá, {user.name.split(" ").shift()}.
                  </p>
                  <p onClick={() => changePage("/adopter/Dashboard")}>
                    <AiOutlineHome />
                    Home
                  </p>
                  <p onClick={() => changePage("/adopter/Settings")}>
                    <AiOutlineUser />
                    Dados
                  </p>
                  <p onClick={() => changePage("/adopter/Search")}>
                    <BiSliderAlt />
                    Filtro de pesquisa
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
                <button onClick={() => changePage("/adopter/Settings")}>
                  <img src={user.avatar} alt="avatar" />
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
