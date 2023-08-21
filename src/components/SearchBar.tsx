type SearchBarProps = {
  searchInput: string;
  onSearchInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};
export function SearchBar({
  searchInput,
  onSearchInputChange,
}: SearchBarProps) {
  return (
    <input
      type="text"
      placeholder="Search Pokemon by ID or Name"
      className="input input-bordered w-full max-w-xs shrink-0 font-primary"
      value={searchInput}
      onChange={onSearchInputChange}
    />
  );
}
