/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { useEffect, useState } from "react";

import axiosRetry from "axios-retry";
axiosRetry(axios, { retries: 10 });
type PokemonCardProps = {
  name: string;
  link: string;
};

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function padNumber(number: number): string {
  return number.toString().padStart(3, "0");
}

interface TypeColors {
  [key: string]: string;
}

const typeColors: TypeColors = {
  normal: "#A8A878",
  fire: "#F08030",
  water: "#6890F0",
  grass: "#78C850",
  electric: "#F8D030",
  ice: "#98D8D8",
  fighting: "#C03028",
  poison: "#A040A0",
  ground: "#E0C068",
  flying: "#A890F0",
  psychic: "#F85888",
  bug: "#A8B820",
  rock: "#B8A038",
  ghost: "#705898",
  dark: "#705848",
  dragon: "#7038F8",
  steel: "#B8B8D0",
  fairy: "#EE99AC",
  undefined: "red-500",
};

export function PokemonCard({ name, link }: PokemonCardProps) {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    axios
      .get(link)
      .then((response) => setData(response.data))
      .catch((error) => console.error("Error:", error));
  }, [link]);

  if (data) {
    const types = data.types.map(
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

    const typeswrapper = <div>{types}</div>;

    return (
      <div className="card card-normal w-96 bg-base-100 shadow-xl basis-1/5 lg:1/6">
        <figure>
          <img
            src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${
              data ? padNumber(data.id) : "001"
            }.png`}
            className="w-48"
            alt="Picture of Pokemon"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            #{padNumber(data.id)} {capitalize(name)}
          </h2>
          {typeswrapper}
        </div>
      </div>
    );
  }

  return null;
}
