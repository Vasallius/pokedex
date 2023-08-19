import { useParams } from "react-router-dom";
export function PokemonDetails() {
  const { pokemonName } = useParams();
  console.log(pokemonName);
  return (
    <>
      <h1>HELLO</h1>
      <h1>{pokemonName}</h1>
    </>
  );
}
