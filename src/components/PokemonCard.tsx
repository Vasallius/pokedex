export function PokemonCard() {
  return (
    <div className="card card-normal w-96 bg-base-100 shadow-xl basis-1/4 lg:basis-1/5">
      <figure>
        <img
          src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png"
          className="w-48"
          alt="Picture of Pokemon"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">Bulbasaur #001</h2>
        <div className="badge badge-secondary">Grass</div>
        <p></p>
      </div>
    </div>
  );
}
