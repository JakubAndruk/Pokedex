import { usePokemonTable } from "../../hooks/usePokemonTable";

const COLUMNS = [
  { key: "id", label: "#" },
  { key: "name", label: "Nazwa" },
  { key: "height", label: "Wysokość" },
  { key: "weight", label: "Waga" },
  { key: "base_experience", label: "Punkty doświadczenia" },
  { key: "ability", label: "Zdolność" },
  { key: "fight_wins", label: "Liczba wygranych walk" },
];

const getSortIcon = (sortConfig, key) => {
  if (sortConfig.key !== key) return "↕";
  return sortConfig.direction === "asc" ? "↑" : "↓";
};

export const RankingTable = ({ pokemons, isLoading, error }) => {
  const { sortedPokemons, sortConfig, requestSort } = usePokemonTable(pokemons);

  if (isLoading) return <p>Ładowanie...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <div>
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr>
            <th>Sprite</th>
            {COLUMNS.map((column) => (
              <th
                key={column.key}
                onClick={() => requestSort(column.key)}
                className="cursor-pointer"
              >
                {column.label}
                {getSortIcon(sortConfig, column.key)}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {sortedPokemons.map((pokemon) => (
            <tr key={pokemon.id}>
              <td className="p-2 flex justify-center">
                <img
                  src={pokemon.sprite}
                  alt={pokemon.name}
                  className="p-2 h-12
                  "
                />
              </td>
              {COLUMNS.map((column) => (
                <td key={column.key} className="p-2 text-center">
                  {pokemon[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
