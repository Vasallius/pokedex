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

  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon/?limit=1010")
      .then((response) => setData(response.data))
      .catch((error) => console.error("Error:", error));
  }, []);

  if (data) {
    console.log(data.results);
  }

  return (
    <>
      <h1>Pokedex</h1>
      <div className="flex flex-row flex-wrap gap-4 justify-center">
        {data &&
          data.results.map((pokemon) => {
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
