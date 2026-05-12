import { usePokemonList } from "../../hooks/usePokemonList";
import { Button } from "./Button";
import { PokemonCard } from "./PokemonCard";
import { SearchBar } from "./SearchBar";

export const PokemonList = ({ pokemons, isLoading, error }) => {
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
    <div className="flex flex-col gap-4 justify-center">
      <div className="flex justify-center ">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
      </div>
      <div className="flex flex-wrap p-4 gap-4 lg:max-w-[90%] md:max-w-[100%]  mx-auto w-full">
        {paginatedPokemons.map((pokemon) => (
          <PokemonCard key={pokemon.id} data={pokemon} />
        ))}
      </div>
      <div className="flex gap-4 justify-center items-center">
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
