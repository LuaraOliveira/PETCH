import { Breadcrumb } from "../../components/Breadcrumb";
import { Input } from "../../components/Input";
import { BiUserCircle } from "react-icons/bi";

export function Administrador() {
  const breadCrumb = [
    { href: "#", link: "Menu Inicial" },
    { href: "#", link: "Administrador" },
  ];
  return (
    <>
      <section className="container" id="administrador">
        <div className="row">
          <div className="col-md-12">
            <Breadcrumb list={breadCrumb} />
          </div>
          <div className="col-md-12">
            <div className="administrador__create">
              <form className="administrador__forms">
                <p className="administrador__forms-title">
                  Criar novo administrador
                </p>
                <div className="administrador__forms-content">
                  <Input type="text" placeholder="Primeiro nome" />
                  <Input type="text" placeholder="Sobrenome" />
                  <Input type="text" placeholder="Email" />
                  <button type="button" className="btn">
                    Criar conta
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="col-md-12">
            <div className="administrador__create">
              <p className="administrador__create-title">
                Lista de Administradores
              </p>
              <div className="administrador__body">
                <div className="administrador__body-container">
                  <div className="administrador__body-image">
                    <BiUserCircle />
                  </div>
                  <div className="administrador__body-info">
                    <ul className="administrador__body-list">
                      <li className="item">Nome: Luara Silva</li>
                      <li className="item">
                        Email: luara.oliveira4@outlook.com
                      </li>
                      <li className="item">Status: Ativo</li>
                    </ul>
                  </div>
                </div>
                <div className="administrador__body-buttons">
                  <button type="button" className="btn">
                    Nova Senha
                  </button>
                  <button type="button" className="btn">
                    Alterar Senha
                  </button>
                  <button type="button" className="btn">
                    Desabilitar Conta
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
