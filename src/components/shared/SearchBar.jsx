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
        className="bg-gray-200 dark:bg-gray-600 h-10 w-110 p-2 rounded-xl"
      />
    </>
  );
};
