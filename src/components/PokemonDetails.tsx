import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export function PokemonDetails() {
  const { pokemonID } = useParams();
  const [pokemonData, setPokemonData] = useState(null);

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonID}`)
      .then((response) => setPokemonData(response.data))
      .catch((error) => console.error("Error:", error));
  }, [pokemonID]);

  if (!pokemonData) {
    return <div>Loading...</div>;
  }

  const { id, name } = pokemonData;

  function padNumber(number: number): string {
    return number.toString().padStart(3, "0");
  }

  if (pokemonData) {
    return (
      <div className="card card-normal w-96 ml-40 mt-40 bg-base-100 shadow-xl basis-1/5 lg:1/6">
        <figure>
          <img
            src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${
              pokemonData ? padNumber(id) : "001"
            }.png`}
            alt="Picture of Pokemon"
          />
        </figure>
        <div>{name}</div>
        {/* <div className="card-body">
        <h2 className="card-title">
          #{padNumber(pokemonData.id)} {capitalize(name)}
        </h2>
        {typeswrapper}
      </div> */}
      </div>
    );
  }
}

export default PokemonDetails;
