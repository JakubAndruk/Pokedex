import { Link } from "react-router-dom";
import { usePokemonContext } from "../../../context/PokemonContext";
import { Button } from "../../shared/Button";
import { EditPokemonListItem } from "./EditPokemonListItem";
import { LoadingErrorInfo } from "../../shared/LoadingErrorInfo";

export const Edit = () => {
  const { pokemons, isLoading, error } = usePokemonContext();

  return (
    <div>
      <div>Edit</div>
      <Link to={"/edit/create"}>
        <Button>Stwórz pokemona</Button>
      </Link>
      <div>
        <LoadingErrorInfo isLoading={isLoading} error={error} />

        {!isLoading &&
          pokemons.map((pokemon) => (
            <EditPokemonListItem key={pokemon.id} pokemon={pokemon} />
          ))}
      </div>
    </div>
  );
};
