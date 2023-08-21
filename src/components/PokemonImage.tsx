export function PokemonImage({ id, lazy }: { id: string; lazy: boolean }) {
  return (
    <figure>
      <img
        loading={lazy ? "lazy" : "eager"}
        src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${id}.png`}
        alt="Picture of Pokemon"
        className="w-2/3"
      />
    </figure>
  );
}
