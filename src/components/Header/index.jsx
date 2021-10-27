import { FaUserCircle } from "react-icons/fa";
import { Button } from "../../components/Button";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { isLogout } from "../../services/auth";
import { AiOutlineClose } from "react-icons/ai";
import logo from "../../assets/logo/logo.svg";
import Cookie from "js-cookie";
export function Header() {
  const [menu, setMenu] = useState(false);
  const history = useHistory();
  const user = Cookie.getJSON(process.env.REACT_APP_USER);

  function changePage(name) {
    history.push(name);
    setMenu(false);
  }
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
                  <AiOutlineClose onClick={() => setMenu(false)} />
                </div>
                <div className="menu__list-itens">
                  <p onClick={() => changePage("/admin/Administrador")}>
                    Administradores
                  </p>
                  <p onClick={() => changePage("/admin/CompanyPartner")}>
                    Empresas Parceiras
                  </p>
                  <p onClick={() => changePage("/admin/Gifts")}>Brindes</p>
                  <p onClick={() => changePage("/admin/Species")}>Espécies</p>
                  <p onClick={() => changePage("/admin/Pets")}>Pets</p>
                  <p onClick={() => changePage("/admin/Adopters")}>Adotantes</p>
                  <p onClick={() => changePage("/admin/Ongs")}>ONGs</p>
                  <p onClick={() => changePage("/admin/Dashboard")}>
                    Relatórios
                  </p>
                </div>
              </div>
            </div>
          </nav>
          <div className="header__content">
            <div className="header__logo">
              <img src={logo} alt="Petch" />
            </div>
          </div>
          <div className="header__info">
            <div className="header__user">
              <div className="header__user-image">
                {!user.avatar ? (
                  <FaUserCircle className="header__user-image-icon" />
                ) : (
                  <img src={user.avatar} alt="avatar" />
                )}
              </div>
              <p className="header__user-title">
                Olá, {user.name.split(" ").shift()}.
              </p>
            </div>
            <div className="header__info-exit">
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
