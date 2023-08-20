import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { capitalize, padNumber, typeColors } from "../utils/pokemonUtils";
interface Stat {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}
export function PokemonDetails() {
  const { pokemonID } = useParams();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [pokemonData, setPokemonData] = useState<any>(null);

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonID}`)
      .then((response) => setPokemonData(response.data))
      .catch((error) => console.error("Error:", error));
  }, [pokemonID]);

  if (!pokemonData) {
    return <div>Loading...</div>;
  }

  const { id, name, types, height, weight, stats } = pokemonData;

  const pokemonTypes = types.map(
    (type: { slot: number; type: { name: string } }) => (
      <>
        <div
          key={type.type.name}
          className="badge text-white mr-2 "
          style={{ backgroundColor: typeColors[type.type.name] }}
        >
          {capitalize(type.type.name)}
        </div>
      </>
    )
  );
  if (pokemonData) {
    return (
      <>
        <div className="flex flex-col items-center justify-center mt-12">
          <div className="w-full flex flex-col items-center">
            <div className="card card-side max-w-3xl bg-base-100 shadow-xl p-8 w-full mb-12">
              <figure>
                <img
                  src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${
                    pokemonData ? padNumber(id) : "001"
                  }.png`}
                  alt="Picture of Pokemon"
                  className="w-2/3"
                />
              </figure>
              <div className="card-body">
                <h1 className="card-title">
                  # {padNumber(id)} {capitalize(name)}
                </h1>
                <div>{pokemonTypes}</div>
                <div>Height: {height}</div>
                <div>Weight: {weight}</div>
                {stats.map((stat: Stat) => (
                  <div key={stat.stat.name}>
                    {capitalize(stat.stat.name)}: {stat.base_stat}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-8">
              <Link to="/">
                <button className="btn btn-primary normal-case bg-[#3e7dca]">
                  Home
                </button>
              </Link>
              <Link to={`/${id === 1 ? id : id - 1}`}>
                <button className="btn btn-primary normal-case bg-[#3e7dca]">
                  Previous
                </button>
              </Link>
              <Link to={`/${id === 1010 ? id : id + 1}`}>
                <button className="btn btn-primary normal-case bg-[#3e7dca]">
                  Next
                </button>
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }
}
