import { Input } from "../../../components/Input";
import { Button } from "../../../components/Button";
import { Radio } from "../../../components/Radio";
import { HeaderAdopter } from "../../../components/HeaderAdopter";
import { Select } from "../../../components/Select";
import photoSearch from "../../../assets/photos/photo-petch-search.svg";
import { BsSearch } from "react-icons/bs";
function Search() {
  return (
    <>
      <HeaderAdopter />
      <section className="container" id="search">
        <div className="row">
          <div className="col-md-12">
            <div className="search__container">
              <div className="search__header">Filtrar por:</div>
              <div className="search__image">
                <img src={photoSearch} alt="PhotoSearch" />
              </div>
              <div className="search__body">
                <div className="search__body--three">
                  <Select>
                    <option>Selecione o estado</option>
                    <option>SP</option>
                    <option>RJ</option>
                    <option>MG</option>
                  </Select>

                  <Input type="text" placeholder="Idade" />

                  <Select>
                    <option>Selecione o gênero</option>
                    <option>F</option>
                    <option>M</option>
                  </Select>
                </div>
                <div className="search__body--three">
                  <Select>
                    <option>Selecione a espécie</option>
                    <option>Canina</option>
                    <option>Felina</option>
                  </Select>
                  <Input type="text" placeholder="Peso" />

                  <div className="search__radio">
                    <p className="search__radio--title">Castrado?</p>
                    <Radio id="radio-button-3" name="radio-name-7" value="yes">
                      sim
                    </Radio>
                    <Radio
                      id="radio-button-4"
                      name="radio-name-7"
                      defaultChecked
                      value="not"
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
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export default Search;
