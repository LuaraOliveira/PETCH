import { format, parseISO, isAfter } from "date-fns";
import { useEffect, useState } from "react";

import { AlertMessage } from "../../../components/Alert";
import { Button } from "../../../components/Button";
import { FooterAdopter } from "../../../components/FooterAdopter";
import { HeaderAdopter } from "../../../components/HeaderAdopter";

import { useLoader } from "../../../context/loadercontext";
import api from "../../../services/api";
import Permission from "../../../utils/Permission";

function ListScheduling(props) {
  const { HandlerLoader } = useLoader();
  const [schedulings, setSchedulings] = useState([]);
  useEffect(() => {
    api.get("/schedulings").then((response) => setSchedulings(response.data));
  }, []);

  async function CancelScheduling(SchedulingId) {
    HandlerLoader(true);
    try {
      const response = await api.put(`/schedulings/${SchedulingId}`);
      AlertMessage(response.data.message, response.data.background);
      api.get("/schedulings").then((response) => setSchedulings(response.data));
    } catch (error) {
      const data = error.response.data;
      AlertMessage(data.message, data.background);
    } finally {
      HandlerLoader(false);
    }
  }

  return (
    <>
      <HeaderAdopter />
      <section className="container" id="ListScheduling">
        <div className="row">
          <div className="col-12">
            <h1 className="ListScheduling__title">Meus agendamentos</h1>
            <div className="ListScheduling__body">
              {schedulings &&
                schedulings.map((scheduling) => (
                  <section key={scheduling.id} id="SchedulingCard">
                    <div className="card__container">
                      <div className="card__content">
                        <div className="card__info">
                          <p className="card__info-title">
                            Data:{" "}
                            {format(parseISO(scheduling.date), "dd/MM/yyyy")}
                          </p>
                          <p className="card__info-description">
                            Hora: {scheduling.hour}
                          </p>
                          <p className="card__info-description">
                            Tipo de agendamento:{" "}
                            {scheduling.schedulingTypes.name}
                          </p>
                        </div>
                        <div className="card__buttons">
                          <Button
                            color="pink"
                            onClick={() => CancelScheduling(scheduling.id)}
                            disabled={
                              isAfter(new Date(), parseISO(scheduling.date)) ||
                              scheduling.canceledAt
                            }
                          >
                            Cancelar
                          </Button>
                        </div>
                      </div>
                    </div>
                  </section>
                ))}
            </div>
          </div>
        </div>
      </section>

      <FooterAdopter />
    </>
  );
}

export default Permission(["adotante"])(ListScheduling);
