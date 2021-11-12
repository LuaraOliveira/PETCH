import { useState } from "react";
import { BsCheckCircle, BsSearch } from "react-icons/bs";

import { AlertMessage } from "../../../components/Alert";
import { Button } from "../../../components/Button";
import { FooterAdopter } from "../../../components/FooterAdopter";
import { HeaderAdopter } from "../../../components/HeaderAdopter";
import { Input } from "../../../components/Input";
import { Select } from "../../../components/Select";

import { usePetch } from "../../../context/petchcontext";
import api from "../../../services/api";

function Scheduling() {
  const { schedulingTypes } = usePetch();
  const [schedulingType, setSchedulingType] = useState({
    schedulingTypeId: "",
    date: "",
  });
  const [hours, setHours] = useState([]);
  const [hoursSelected, setHoursSelected] = useState("");
  function change(event) {
    setSchedulingType({
      ...schedulingType,
      [event.target.name]: event.target.value,
    });
  }
  async function searchScheduling(e) {
    e.preventDefault();
    try {
      const date = schedulingType.date.split("/").reverse().join("-");
      const response = await api.get(
        `/schedulings/${schedulingType.schedulingTypeId}/available?date=${date}`
      );
      setHours(response.data);
    } catch (error) {
      const data = error.response.data;
      AlertMessage(data.message, data.background);
    }
  }

  function selectHours(params) {
    if (!params.available) return;
    setHoursSelected(params.value);
  }

  async function sendConfirmation() {
    try {
      const response = await api.post("/schedulings", {
        schedulingTypesId: schedulingType.schedulingTypeId,
        date: hoursSelected,
      });
      AlertMessage(response.data.message, response.data.background);
    } catch (error) {
      const data = error.response.data;
      AlertMessage(data.message, data.background);
    }
  }

  return (
    <>
      <HeaderAdopter />
      <section className="container" id="Scheduling">
        <div className="row">
          <div className="col-12">
            <h1 className="Scheduling__title">Agendamento</h1>

            <form onSubmit={searchScheduling} className="Scheduling__body">
              <Select
                onChange={change}
                value={schedulingType.schedulingTypeId}
                name="schedulingTypeId"
              >
                <option value="" defaultChecked disabled>
                  Tipo de Agendamento
                </option>
                {schedulingTypes &&
                  schedulingTypes.map((schedulingType) => (
                    <option value={schedulingType.id} key={schedulingType.id}>
                      {schedulingType.name}
                    </option>
                  ))}
              </Select>

              <Input
                type="text"
                placeholder="Insira a data"
                name="date"
                onChange={change}
                value={schedulingType.date}
                mask="birthday"
                maxLength={10}
              />
              <div className="Button__scheduling--search">
                <Button color="pink">
                  <BsSearch />
                  Buscar
                </Button>
              </div>
            </form>

            <div className="Scheduling__card__container">
              {hours &&
                hours.map((hour, index) => (
                  <div
                    key={index}
                    onClick={() => selectHours(hour)}
                    className={`Scheduling__card ${
                      hour.available ? "" : "disabled"
                    } 
                    ${hoursSelected === hour.value ? "active" : ""}`}
                  >
                    <div className="Scheduling__card--header">
                      <p className="Scheduling__card--header--title">
                        {" "}
                        Status: {hour.available ? "disponível" : "indisponível"}
                      </p>
                      <p className="Scheduling__card--header--time">
                        {hour.time}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
            <div className="Button__scheduling">
              {hours.length > 0 && (
                <Button type="button" color="pink" onClick={sendConfirmation}>
                  <BsCheckCircle /> Confirmar
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>
      <FooterAdopter />
    </>
  );
}
export default Scheduling;
