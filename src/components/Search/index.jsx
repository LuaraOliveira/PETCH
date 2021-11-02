import { Input } from "../Input";
import { Button } from "../Button";
import { Radio } from "../Radio";
import api from "../../services/api";
import { Select } from "../Select";
import photoSearch from "../../assets/photos/photo-petch-search.svg";
import { BsSearch } from "react-icons/bs";
import { usePetch } from "../../context/petchcontext";
import { useState } from "react";
const initialState = {
  uf: "",
  age: "",
  weight: "",
  cut: "",
  gender: "",
  speciesId: "",
};

function Search() {
  const [filter, setFilter] = useState(initialState);
  const { species, DataFilterPet, DataPets } = usePetch();

  function change(event) {
    setFilter({
      ...filter,
      [event.target.name]: event.target.value,
    });
  }

  async function RadioSelect(e) {
    e.preventDefault();
    try {
      const response = await api.get("/pets", {
        params: filter,
      });
      DataFilterPet(response.data);
    } catch (error) {}
  }

  function CleanFilter() {
    setFilter(initialState);
    DataPets();
  }

  return (
    <>
      <section id="search">
        <div className="row">
          <div className="col-md-12">
            <div className="search__container">
              <div className="search__header">Filtrar por:</div>
              <div className="search__image">
                <img src={photoSearch} alt="PhotoSearch" />
              </div>
              <form onSubmit={RadioSelect}>
                <div className="search__body">
                  <div className="search__body--three">
                    <Select name="uf" onChange={change} value={filter.uf}>
                      <option value="" defaultChecked disabled>
                        Selecione o estado
                      </option>
                      <option value="AC">AC</option>
                      <option value="AL">AL</option>
                      <option value="AP">AP</option>
                      <option value="AM">AM</option>
                      <option value="BA">BA</option>
                      <option value="CE">CE</option>
                      <option value="DF">DF</option>
                      <option value="ES">ES</option>
                      <option value="GO">GO</option>
                      <option value="MA">MA</option>
                      <option value="MT">MT</option>
                      <option value="MS">MS</option>
                      <option value="MG">MG</option>
                      <option value="PA">PA</option>
                      <option value="PB">PB</option>
                      <option value="PR">PR</option>
                      <option value="PE">PE</option>
                      <option value="PI">PI</option>
                      <option value="RJ">RJ</option>
                      <option value="RN">RN</option>
                      <option value="RS">RS</option>
                      <option value="RO">RO</option>
                      <option value="RR">RR</option>
                      <option value="SC">SC</option>
                      <option value="SP">SP</option>
                      <option value="SE">SE</option>
                      <option value="TO">TO</option>
                    </Select>

                    <Input
                      type="text"
                      placeholder="Idade"
                      value={filter.age}
                      name="age"
                      onChange={change}
                    />

                    <Select
                      name="gender"
                      onChange={change}
                      value={filter.gender}
                    >
                      <option value="" defaultChecked disabled>
                        Selecione o gênero
                      </option>
                      <option value="F">F</option>
                      <option value="M">M</option>
                    </Select>
                  </div>
                  <div className="search__body--three">
                    <Select
                      name="speciesId"
                      onChange={change}
                      value={filter.speciesId}
                    >
                      <option value="" defaultChecked disabled>
                        Selecionar Espécie
                      </option>
                      {species &&
                        species.map((specie) => (
                          <option value={specie.id} key={specie.id}>
                            {specie.name}
                          </option>
                        ))}
                    </Select>
                    <Input
                      type="text"
                      placeholder="Peso"
                      value={filter.weight}
                      onChange={change}
                      name="weight"
                    />

                    <div className="search__radio">
                      <p className="search__radio--title">Castrado?</p>
                      <Radio
                        id="radio-button-3"
                        name="radio-name-7"
                        value="true"
                        onChange={(e) =>
                          setFilter({
                            ...filter,
                            cut: e.target.value,
                          })
                        }
                        checked={filter.cut === "true"}
                      >
                        sim
                      </Radio>
                      <Radio
                        id="radio-button-4"
                        name="radio-name-7"
                        value="false"
                        onChange={(e) =>
                          setFilter({
                            ...filter,
                            cut: e.target.value,
                          })
                        }
                        checked={filter.cut === "false"}
                      >
                        não
                      </Radio>
                    </div>
                  </div>
                </div>
                <div className="search__butons">
                  <Button color="pink">
                    <BsSearch />
                    Pesquisar Pets
                  </Button>
                  <Button color="pink" onClick={CleanFilter} type="reset">
                    Limpar Filtro
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export default Search;
