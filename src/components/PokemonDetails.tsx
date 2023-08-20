import axios from "axios";
import { useEffect, useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
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
                <h1 className="card-title text-[30px] text-white">
                  # {padNumber(id)} {capitalize(name)}
                </h1>
                <div>{pokemonTypes}</div>
                <div>Height: {height}</div>
                <div>Weight: {weight}</div>
                <div className="flex flex-wrap justify-between">
                  {stats.map((stat: Stat) => {
                    let statName = stat.stat.name;
                    if (statName === "special-attack") {
                      statName = "sp-Atk";
                    } else if (statName === "special-defense") {
                      statName = "sp-Def";
                    } else if (statName === "hp") {
                      statName = "HP";
                    } else {
                      statName = capitalize(statName);
                    }

                    return (
                      <div key={stat.stat.name} className="w-1/2 p-2">
                        <h2>{capitalize(statName)}</h2>
                        <div style={{ width: "50px", height: "50px" }}>
                          <CircularProgressbar
                            value={stat.base_stat}
                            maxValue={200}
                            text={`${stat.base_stat}`}
                            counterClockwise
                            styles={{
                              path: {
                                stroke: `${typeColors[types[0].type.name]}`,
                              },
                              text: {
                                fill: "white",
                                fontSize: "24px",
                              },
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-8">
              <Link to="/">
                <button className="btn  text-white normal-case bg-[#3e7dca]">
                  Home
                </button>
              </Link>
              <Link to={`/${id === 1 ? id : id - 1}`}>
                <button className="btn  text-white normal-case bg-[#3e7dca]">
                  Previous
                </button>
              </Link>
              <Link to={`/${id === 1010 ? id : id + 1}`}>
                <button className="btn  text-white normal-case bg-[#3e7dca]">
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
