import { GoAlert } from "react-icons/go";
import iconVaccine from "../../assets/icons/icon_vaccine.svg";
import iconMedication from "../../assets/icons/icon_medication.svg";
import iconStar from "../../assets/icons/icon_star.svg";
import iconSad from "../../assets/icons/icon_sad.svg";
import iconDog from "../../assets/icons/icon_dog.svg";
import iconHouse from "../../assets/icons/icon_home.svg";
import { Button } from "../../components/Button";
export function Dashboard() {
  return (
    <>
      <section className="container" id="dashboard">
        <div className="row">
          <div className="col-md-12">
            <div className="alert alert-lighter">
              <div className="alert-icon">
                <GoAlert />
              </div>
              Há 12 propostas de adoção que ainda não foram analisadas.
              <Button color="primary" className="btn">
                Ver Informaçõesrmações
              </Button>
            </div>

            <div className="dashboard__container">
              <div className="dashboard__card">
                <div className="dashboard__card-header">
                  <p className="dashboard__card-header-title">
                    Acessos médios em cada pet (dia)
                  </p>
                  <span className="dashboard__card-header-info">28</span>
                </div>
                <div className="dashboard__card-body">
                  <p className="dashboard__card-header-title">
                    Acessos em cada pet (Julho/2021)
                  </p>
                  <span className="dashboard__card-body-info">18.384</span>

                  <p className="dashboard__card-header-title">
                    Proposta de adoções aceitas (Julho/2021)
                  </p>
                  <span className="dashboard__card-body-info">1.093</span>
                </div>
                <div className="dashboard__card-footer">
                  <Button color="primary" className="btn">
                    Ver relatório completo
                  </Button>
                </div>
              </div>

              <div className="dashboard__card">
                <div className="dashboard__card-header">
                  <p className="dashboard__card-header-title">
                    Total de pets cadastrados por ONG
                  </p>
                </div>
                <div className="dashboard__card-body">
                  <div className="dashboard__table">
                    <div className="dashboard__table-content">
                      <p className="dashboard__table-title">1 Amigo Cão</p>
                      <p className="dashboard__table-title">
                        2 ONG Anjos de 4 Patas
                      </p>
                      <p className="dashboard__table-title">
                        3 Morada dos Pets de São Roque
                      </p>
                      <p className="dashboard__table-title">4 ONG AmiCÃO</p>
                      <p className="dashboard__table-title">
                        5 Lar dos Gatinhos Perdidos
                      </p>
                      <p className="dashboard__table-title">6 Patas Dadas</p>
                      <p className="dashboard__table-title">7 ONG Colaborar</p>
                      <p className="dashboard__table-title">
                        8 Casa dos Felinos
                      </p>
                      <p className="dashboard__table-title">
                        9 Ajudar Cão Próximo
                      </p>
                      <p className="dashboard__table-title">
                        10 Amo de 4 Patas
                      </p>
                    </div>
                    <div className="dashboard__table-content">
                      <p className="dashboard__table-number">103</p>
                      <p className="dashboard__table-number">87</p>
                      <p className="dashboard__table-number">85</p>
                      <p className="dashboard__table-number">74</p>
                      <p className="dashboard__table-number">31</p>
                      <p className="dashboard__table-number">27</p>
                      <p className="dashboard__table-number">21</p>
                      <p className="dashboard__table-number">12</p>
                      <p className="dashboard__table-number">8</p>
                      <p className="dashboard__table-number">5</p>
                    </div>
                  </div>
                </div>
                <div className="dashboard__card-footer">
                  <Button color="primary" className="btn">
                    Ver relatório completo
                  </Button>
                </div>
              </div>

              <div className="dashboard__card">
                <div className="dashboard__card-header">
                  <p className="dashboard__card-header-title">
                    Sexo dos pets cadastrados
                  </p>
                  <span className="dashboard__card-header-subinfo">
                    483 animais cadastrados
                  </span>
                </div>
                <div className="dashboard__card-body">
                  <div className="dashboard__card-graphs">
                    <div className="loader"></div>

                    <div className="loader"></div>
                  </div>
                </div>
                <div className="dashboard__card-footer">
                  <Button color="primary" className="btn">
                    Ver pets cadastrados
                  </Button>
                </div>
              </div>

              <div className="dashboard__card">
                <div className="dashboard__card-header">
                  <p className="dashboard__card-header-title">
                    Total de brindes distribuídos no mês Junho/2021
                  </p>
                </div>
                <div className="dashboard__card-body">
                  <div className="dashboard__card-body-itens">
                    <div className="item">
                      <img src={iconVaccine} alt="Icon Vacine" />
                      <span className="item">Vacina</span>
                      <span className="value">1.093</span>
                    </div>
                    <div className="item">
                      <img src={iconMedication} alt="Icon Medication" />
                      <span className="item">Medicação</span>
                      <span className="value">293</span>
                    </div>
                    <div className="item">
                      <img src={iconStar} alt="Icon Bem Estar" />
                      <span className="item">Bem estar</span>
                      <span className="value">2.494</span>
                    </div>
                  </div>
                </div>
                <div className="dashboard__card-footer">
                  <Button color="primary" className="btn">
                    Ver relatório completo
                  </Button>
                </div>
              </div>

              <div className="dashboard__card">
                <div className="dashboard__card-header">
                  <p className="dashboard__card-header-title">
                    Número de Solicitações (Julho/2021)
                  </p>
                </div>
                <div className="dashboard__card-body">
                  <div className="dashboard__card-body-itens">
                    <div className="item">
                      <img src={iconHouse} alt="Icon House" />
                      <span className="item">Em aberto</span>
                      <span className="value">12</span>
                    </div>
                    <div className="item">
                      <img src={iconDog} alt="Icon Dog" />
                      <span className="item">Confirmadas</span>
                      <span className="value">312</span>
                    </div>
                    <div className="item">
                      <img src={iconSad} alt="Icon Desistencia" />
                      <span className="item">Desistência</span>
                      <span className="value">4</span>
                    </div>
                  </div>
                </div>
                <div className="dashboard__card-footer">
                  <Button color="primary" className="btn">
                    Ver relatório completo
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
