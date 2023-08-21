export function PokemonImage({ id }: { id: string }) {
  return (
    <figure>
      <img
        src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${id}.png`}
        alt="Picture of Pokemon"
        className="w-2/3"
      />
    </figure>
  );
}
