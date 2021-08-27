import { Breadcrumb } from "../../components/Breadcrumb";
import { Input } from "../../components/Input";
import { BiUserCircle } from "react-icons/bi";
import { Button } from "../../components/Button";
import { useState, useEffect } from "react";
import api from "../../services/api";

export function Administrador() {
  const breadCrumb = [
    { href: "#", link: "Menu Inicial" },
    { href: "#", link: "Administrador" },
  ];

  const [users, setUsers] = useState([]);

  useEffect(() => {
    api.get("/users").then((response) => setUsers(response.data));
  }, []);

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
                  <Button color="primary" className="btn">
                    Criar Conta
                  </Button>
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
                {users &&
                  users.map((user) => (
                    <div key={user.id} className="administrador__body-container">
                      <div className="administrador__body-image">
                        {user.avatar ? (
                          <img src={user.avatar} alt={user.name} />
                        ) : (
                          <BiUserCircle />
                        )}
                      </div>
                      <div className="administrador__body-info">
                        <ul className="administrador__body-list">
                          <li className="item">Nome: {user.name}</li>
                          <li className="item">Email: {user.email}</li>
                          <li className="item">Status: Ativo</li>
                        </ul>
                        <div className="administrador__body-buttons">
                          <Button color="primary" className="btn">
                            Alterar dados
                          </Button>
                          <Button color="primary" className="btn">
                            Desabilitar Conta
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
