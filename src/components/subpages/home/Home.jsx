import { usePokemonContext } from "../../../context/PokemonContext";
import { PokemonList } from "../../shared/PokemonList";

export const Home = () => {
  const { pokemons, isLoading, error } = usePokemonContext();
  return (
    <>
      <div>Home</div>
      <PokemonList pokemons={pokemons} isLoading={isLoading} error={error} />
    </>
  );
};
