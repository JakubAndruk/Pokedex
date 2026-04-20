import { useMemo, useState } from "react";

export const usePokemonTable = (pokemons) => {
  const [sortConfig, setSortConfig] = useState({ key: "id", direction: "asc" });

  const requestSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const sortedPokemons = useMemo(() => {
    if (!pokemons) return [];

    return [...pokemons].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key])
        return sortConfig.direction === "asc" ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key])
        return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  });

  return { sortedPokemons, sortConfig, requestSort };
};
