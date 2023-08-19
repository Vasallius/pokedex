import axios from "axios";
import axiosRetry from "axios-retry";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Pokedex from "./assets/pokedex.svg";
import { PokemonCard } from "./components/PokemonCard";
import { PokemonDetails } from "./components/PokemonDetails";

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
  const [searchInput, setSearchInput] = useState("");

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

  function handleSearchInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchInput(event.target.value);
  }

  function filter(pokemon: Pokemon) {
    const searchValue = searchInput.toLowerCase();
    if (/^\d+$/.test(searchValue)) {
      // Filter by ID
      const id = parseInt(searchValue);
      const pokemonId = parseInt(pokemon.url.split("/").slice(-2, -1)[0]);
      return pokemonId === id;
    } else {
      // Filter by name
      return pokemon.name.toLowerCase().includes(searchValue);
    }
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <div className="flex flex-col items-center">
              <img src={Pokedex} className="w-80" alt="Pokedex Logo" />

              <input
                type="text"
                placeholder="Search Pokemon by ID or Name"
                className="input input-bordered w-full max-w-xs"
                value={searchInput}
                onChange={handleSearchInputChange}
              />
              <div className="flex gap-2">
                <button onClick={sortByNameAZ} className="btn btn-primary">
                  Sort by name (A-Z)
                </button>
                <button onClick={sortByNameZA} className="btn btn-primary">
                  Sort by name (Z-A)
                </button>
                <button onClick={sortByIDAsc} className="btn btn-primary">
                  Sort by ID (1-1010)
                </button>
                <button onClick={sortByIDDesc} className="btn btn-primary">
                  Sort by ID (1010-1)
                </button>
              </div>
            </div>
            <div className="flex flex-row flex-wrap gap-4 justify-center">
              {data &&
                pokemonList.filter(filter).map((pokemon) => {
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
        }
      />
      <Route path="/:pokemonID" element={<PokemonDetails />} />
    </Routes>
  );
}

export default App;
