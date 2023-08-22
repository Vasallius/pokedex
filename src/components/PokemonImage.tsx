import { useState } from "react";
import Pokeball from "../assets/pokeball.png";
export function PokemonImage({ id, lazy }: { id: string; lazy: boolean }) {
  const [loaded, setLoaded] = useState(false);

  const handleImageLoad = () => {
    setLoaded(true);
  };

  return (
    <figure>
      <img
        loading={lazy ? "lazy" : "eager"}
        src={
          loaded
            ? `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${id}.png`
            : Pokeball
        }
        alt="Picture of Pokemon"
        className="w-2/3"
        onLoad={handleImageLoad}
      />
    </figure>
  );
}
