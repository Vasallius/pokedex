import axios from "axios";
import axiosRetry from "axios-retry";
import { useEffect, useState } from "react";
import "./App.css";
import { PokemonCard } from "./components/PokemonCard";

axiosRetry(axios, { retries: 3 });

type ApiData = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Pokemon[];
};

type Pokemon = {
  name: string;
  url: string;
};

function App() {
  const [data, setData] = useState<ApiData | null>(null);
  const [pokemonList, setpokemonList] = useState<Pokemon[]>([]);

  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon/?limit=1010")
      .then((response) => {
        setData(response.data);
        setpokemonList(response.data.results);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  function sortByNameAZ() {
    if (data) {
      const sortedData = [...pokemonList].sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      setpokemonList(sortedData);
    }
  }

  function sortByIDAsc() {
    if (data) {
      const sortedData = [...pokemonList].sort((a, b) => {
        const idA = parseInt(a.url.split("/").slice(-2, -1)[0]);
        const idB = parseInt(b.url.split("/").slice(-2, -1)[0]);
        return idA - idB;
      });
      setpokemonList(sortedData);
    }
  }

  function sortByIDDesc() {
    if (data) {
      const sortedData = [...pokemonList].sort((a, b) => {
        const idA = parseInt(a.url.split("/").slice(-2, -1)[0]);
        const idB = parseInt(b.url.split("/").slice(-2, -1)[0]);
        return idB - idA;
      });
      setpokemonList(sortedData);
    }
  }

  function sortByNameZA() {
    if (data) {
      const sortedData = [...pokemonList].sort((a, b) =>
        b.name.localeCompare(a.name)
      );
      setpokemonList(sortedData);
    }
  }
  return (
    <>
      <div className="flex flex-col items-center">
        <h1 className="mx-auto">Pokedex</h1>
        <div className="flex">
          <button onClick={sortByNameAZ} className="btn btn-primary">
            Sort by name (A-Z)
          </button>
          <button onClick={sortByNameZA} className="btn btn-primary">
            Sort by name (Z-A)
          </button>
          <button onClick={sortByIDAsc} className="btn btn-primary">
            {" "}
            Sort by ID (1-1010)
          </button>
          <button onClick={sortByIDDesc} className="btn btn-primary">
            {" "}
            Sort by ID (1010-1)
          </button>
        </div>
      </div>
      <div className="flex flex-row flex-wrap gap-4 justify-center">
        {data &&
          pokemonList.map((pokemon) => {
            return (
              <PokemonCard
                key={pokemon.name}
                name={pokemon.name}
                link={pokemon.url}
              />
            );
          })}
      </div>
    </>
  );
}

export default App;
