type ButtonGroupProps = {
  sortByNameAZ: () => void;
  sortByNameZA: () => void;
  sortByIDAsc: () => void;
  sortByIDDesc: () => void;
  loadMorePokemon: () => void;
};

export function ButtonGroup({
  sortByNameAZ,
  sortByNameZA,
  sortByIDAsc,
  sortByIDDesc,
  loadMorePokemon,
}: ButtonGroupProps) {
  return (
    <>
      <button
        onClick={sortByNameAZ}
        className="btn text-white font-primary bg-[#3e7dca] tracking-wider"
      >
        Sort by name (A-Z)
      </button>
      <button
        onClick={sortByNameZA}
        className="btn text-white font-primary bg-[#3e7dca] tracking-wide"
      >
        Sort by name (Z-A)
      </button>
      <button
        onClick={sortByIDAsc}
        className="btn text-white font-primary bg-[#3e7dca] tracking-wide"
      >
        Sort by ID (1-1010)
      </button>
      <button
        onClick={sortByIDDesc}
        className="btn text-white font-primary bg-[#3e7dca] tracking-wide"
      >
        Sort by ID (1010-1)
      </button>
      <button
        onClick={loadMorePokemon}
        className="btn text-white font-primary bg-[#3e7dca] tracking-wide"
      >
        Load All Pokemon
      </button>
    </>
  );
}
