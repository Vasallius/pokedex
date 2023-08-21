import axios, { AxiosError } from "axios";
import axiosRetry from "axios-retry";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { capitalize, padNumber, typeColors } from "../utils/pokemonUtils";
axiosRetry(axios, {
  retries: 10,
  retryDelay: axiosRetry.exponentialDelay,
  retryCondition: (error: AxiosError) => {
    console.log(`Retrying request to ${error.config!.url}`);
    return true;
  },
});
type PokemonCardProps = {
  name: string;
  link: string;
};

export function PokemonCard({ name, link }: PokemonCardProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
        <div
          key={type.type.name}
          className="badge text-white mr-2 "
          style={{ backgroundColor: typeColors[type.type.name] }}
        >
          {capitalize(type.type.name)}
        </div>
      )
    );

    return (
      <Link to={`/${data.id}`}>
        <div className="card card-normal  w-96 bg-base-100 shadow-xl basis-1/5 lg:1/6">
          <figure>
            <img
              loading="lazy"
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
            <div>{types}</div>
          </div>
        </div>
      </Link>
    );
  }

  return null;
}
