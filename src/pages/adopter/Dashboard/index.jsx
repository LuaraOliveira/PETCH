import { HeaderAdopter } from "../../../components/HeaderAdopter";
import CardTinder from "../../../components/CardTinder";
import CardTinderInfo from "../../../components/CardTinderInfo";
import CardNotLike from "../../../components/CardNotLike";
import { useState, useEffect } from "react";
import api from "../../../services/api";
function DashboardAdopter() {
  const [pets, setPets] = useState([]);
  useEffect(() => {
    api.get("/pets/5").then((response) => setPets([response.data]));
  }, []);

  return (
    <>
      <HeaderAdopter />
      <section className="container" id="dashboardAdopter">
        <div className="row">
          <div className="col-md-12">
            <div className="dashboardAdopter__container">
              {/* {pets.length >= 1 ? (
                pets.map((pet) => (
                  <>
                    <CardTinder pet={pet} />
                  </>
                ))
              ) : (
                <CardTinderInfo />
              )} */}
              <CardNotLike />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export default DashboardAdopter;
