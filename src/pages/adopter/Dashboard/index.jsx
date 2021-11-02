import { HeaderAdopter } from "../../../components/HeaderAdopter";
import { FooterAdopter } from "../../../components/FooterAdopter";
import CardTinder from "../../../components/CardTinder";
import CardTinderInfo from "../../../components/CardTinderInfo";
import Search from "../../../components/Search";
import { usePetch } from "../../../context/petchcontext";
import Permission from "../../../utils/Permission";
import { useEffect } from "react";
function DashboardAdopter() {
  const { pets, VisiblePets } = usePetch();
  useEffect(() => {
    VisiblePets();
  }, []);

  return (
    <>
      <HeaderAdopter />
      <section className="container" id="dashboardAdopter">
        <div className="row">
          <div className="col-xl-6 col-sm-12">
            <Search />
          </div>
          <div className="col-xl-6 col-sm-12">
            <section className="CartTinderContainer">
              {pets.length >= 1 ? (
                pets.map((pet) => <CardTinder pet={pet} key={pet.id} />)
              ) : (
                <CardTinderInfo />
              )}
            </section>
          </div>
        </div>
      </section>
      <FooterAdopter />
    </>
  );
}
export default Permission(["adotante"])(DashboardAdopter);
