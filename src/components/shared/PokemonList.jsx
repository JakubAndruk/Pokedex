import { usePokemonContext } from "../../context/PokemonContext";
import { usePokemonList } from "../../hooks/usePokemonList";
import { Button } from "./Button";
import { PokemonCard } from "./PokemonCard";

export const PokemonList = () => {
  const { pokemons, isLoading, error } = usePokemonContext();
  const {
    searchQuery,
    setSearchQuery,
    currentPage,
    setCurrentPage,
    paginatedPokemons,
    totalPages,
  } = usePokemonList(pokemons);

  if (isLoading) return <p>Ladowanie</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <div className="flex flex-wrap gap-4 justify-center">
      <div className="flex justify-center ">
        <input
          type="text"
          placeholder="Szukaj pokemona..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border border-gray-800"
        />
      </div>
      <div className="flex flex-wrap p-4 gap-4 justify-left">
        {paginatedPokemons.map((pokemon) => (
          <PokemonCard key={pokemon.id} data={pokemon} />
        ))}
      </div>
      <div className="flex gap-4 justify-center">
        <Button
          onClick={() => setCurrentPage((prev) => prev - 1)}
          disabled={currentPage === 1}
          hidden={currentPage === 1}
        >
          Poprzednia
        </Button>
        <span className="w-16 text-center">
          {currentPage} / {totalPages}
        </span>
        <Button
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={currentPage === totalPages}
          hidden={currentPage === totalPages}
        >
          Następna
        </Button>
      </div>
    </div>
  );
};
