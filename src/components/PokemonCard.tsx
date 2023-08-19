/* eslint-disable @typescript-eslint/no-explicit-any */
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
  //   any is NOT ideal however the data that is being returned from the API is a lot and we will only use a small portion of it
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch(link)
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error:", error));
  }, [link]);

  if (data) {
    const types = data.types.map(
      (type: { slot: number; type: { name: string } }) => (
        <>
          <div key={type.type.name} className="badge badge-secondary mr-2">
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
}
