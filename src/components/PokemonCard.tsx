/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { useEffect, useState } from "react";

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
            className="badge badge-primary bg-red-300 mr-2"
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
            {padNumber(data.id)} {capitalize(name)}
          </h2>
          {typeswrapper}
        </div>
      </div>
    );
  }

  return null;
}
