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

  const newId = padNumber(data?.id);
  return (
    <div className="card card-normal w-96 bg-base-100 shadow-xl basis-1/4 lg:basis-1/5">
      <figure>
        <img
          src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${newId}.png`}
          className="w-48"
          alt="Picture of Pokemon"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {padNumber(data?.id)} {capitalize(name)}
        </h2>
        <div className="badge badge-secondary">Grass</div>
        <p></p>
      </div>
      <h2>{link}</h2>
    </div>
  );
}
