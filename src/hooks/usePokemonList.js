import { useEffect, useState } from "react";
import { PAGE_SIZE } from "../services/api";

export const usePokemonList = (pokemons) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const filteredPokemons = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const totalPages = Math.max(
    1,
    Math.ceil(filteredPokemons.length / PAGE_SIZE),
  );

  const paginatedPokemons = filteredPokemons.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  return {
    searchQuery,
    setSearchQuery,
    currentPage,
    setCurrentPage,
    paginatedPokemons,
    totalPages,
  };
};
