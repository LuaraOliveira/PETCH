import { HeaderAdopter } from "../../../components/HeaderAdopter";
import CardTinder from "../../../components/CardTinder";
import CardTinderInfo from "../../../components/CardTinderInfo";
import { usePetch } from "../../../context/petchcontext";
import Permission from "../../../utils/Permission";
function DashboardAdopter() {
  const { pets } = usePetch();

  return (
    <>
      <HeaderAdopter />
      <section className="container" id="dashboardAdopter">
        <div className="row">
          <div className="col-md-12">
            <div className="dashboardAdopter__container">
              {pets.length >= 1 ? (
                pets.map((pet) => <CardTinder pet={pet} key={pet.id} />)
              ) : (
                <CardTinderInfo />
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export default Permission(["adotante"])(DashboardAdopter);
