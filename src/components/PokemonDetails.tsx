import axios from "axios";
import { useEffect, useState } from "react";
import "react-circular-progressbar/dist/styles.css";
import { useParams } from "react-router-dom";
import {
  calculateWeakness,
  capitalize,
  padNumber,
  typeColors,
} from "../utils/pokemonUtils";
import { NavigationButtons } from "./NavigationButtons";
import { PokemonImage } from "./PokemonImage";
import { Stat } from "./Stats";

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
  type PokemonType = {
    slot: number;
    type: {
      name: string;
    };
  };
  const pokemonTypes = types.map((type: PokemonType) => (
    <div
      key={type.type.name}
      className="badge text-white mr-2 "
      style={{ backgroundColor: typeColors[type.type.name] }}
    >
      {capitalize(type.type.name)}
    </div>
  ));

  const weaknessTypes = calculateWeakness(
    types[0].type.name,
    types[1]?.type.name
  ).map((type: string) => (
    <div
      key={type}
      className="badge text-white mr-2 font-primary"
      style={{ backgroundColor: typeColors[type.toLowerCase()] }}
    >
      {capitalize(type)}
    </div>
  ));
  if (pokemonData) {
    return (
      <>
        <div className="flex flex-col items-center justify-center mt-12">
          <div className="w-full flex flex-col items-center">
            <div className="card card-side max-w-3xl bg-base-100 shadow-xl p-8 w-full mb-12">
              <PokemonImage id={padNumber(id)} lazy={false} />
              <div className="card-body">
                <h1 className="card-title text-[30px] text-white font-primary tracking-wider">
                  # {padNumber(id)} {capitalize(name)}
                </h1>
                <div>{pokemonTypes}</div>
                <p className="font-primary">Height: {height}</p>
                <p className="font-primary">Weight: {weight}</p>
                <p className="font-primary">Weakness: {weaknessTypes}</p>
                <div className="flex flex-wrap justify-between">
                  {stats.map((stat: Stat) => (
                    <Stat key={stat.stat.name} stat={stat} types={types} />
                  ))}
                </div>
              </div>
            </div>
            <NavigationButtons id={id} />
          </div>
        </div>
      </>
    );
  }
}
