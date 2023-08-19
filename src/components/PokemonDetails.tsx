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

  const { id, name, types } = pokemonData;

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
  function padNumber(number: number): string {
    return number.toString().padStart(3, "0");
  }

  function capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  if (pokemonData) {
    return (
      <>
        <div className="flex justify-center mt-12">
          <div className="card max-w-xl bg-base-100 shadow-xl p-8">
            <figure>
              <img
                src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${
                  pokemonData ? padNumber(id) : "001"
                }.png`}
                alt="Picture of Pokemon"
              />
            </figure>
            <div className="card-body">
              <h1 className="card-title">
                # {padNumber(id)} {capitalize(name)}
              </h1>
              <div>{pokemonTypes}</div>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Buy Now</button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
