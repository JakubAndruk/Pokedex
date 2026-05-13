import { Link } from "react-router-dom";
import { usePokemonContext } from "../../../context/PokemonContext";
import { Button } from "../../shared/Button";
import { EditPokemonListItem } from "./EditPokemonListItem";
import { LoadingErrorInfo } from "../../shared/LoadingErrorInfo";

export const Edit = () => {
  const { pokemons, isLoading, error } = usePokemonContext();

  return (
    <div className="flex flex-col gap-4 items-center">
      <div>
        <Link to={"/edit/create"} className="flex flex-col w-114 gap-4">
          <Button>Stwórz pokemona</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 gap-x-12">
        <LoadingErrorInfo isLoading={isLoading} error={error} />

        {!isLoading &&
          pokemons.map((pokemon) => (
            <EditPokemonListItem key={pokemon.id} pokemon={pokemon} />
          ))}
      </div>
    </div>
  );
};
