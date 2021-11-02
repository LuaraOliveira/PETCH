import { Input } from "../../../components/Input";
import { Button } from "../../../components/Button";
import { HeaderAdopter } from "../../../components/HeaderAdopter";
import { usePetch } from "../../../context/petchcontext";
import { FooterAdopter } from "../../../components/FooterAdopter";
import { Select } from "../../../components/Select";
function Scheduling() {
  const {} = usePetch();
  return (
    <>
      <HeaderAdopter />
      <section className="container" id="Scheduling">
        <div className="row">
          <div className="col-12">
            <h1 className="Scheduling__title">Agendamento</h1>

            <div className="Scheduling__body">
              <Select>
                <option value="" defaultChecked disabled>
                  Tipo de Agendamento
                </option>
                <option>Dúvida</option>
                <option>Dúvida</option>
              </Select>

              <Input type="text" placeholder="Insira a data" />

              <Button color="pink">Buscar</Button>
            </div>
          </div>
        </div>
      </section>
      <FooterAdopter />
    </>
  );
}
export default Scheduling;
