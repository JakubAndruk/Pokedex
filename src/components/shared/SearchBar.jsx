export const SearchBar = ({ value, onChange }) => {
  return (
    <>
      <label htmlFor="searchBar" className="sr-only">
        Szukaj pokemona
      </label>
      <input
        id="searchBar"
        type="text"
        placeholder="Szukaj pokemona..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border border-gray-800"
      />
    </>
  );
};
