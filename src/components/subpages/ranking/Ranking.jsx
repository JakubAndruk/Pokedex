import { RankingTable } from "./RankingTable";
import { usePokemonContext } from "../../../context/PokemonContext";

export const Ranking = () => {
  const { pokemons, isLoading, error } = usePokemonContext();

  return (
    <>
      <div>Ranking</div>
      <RankingTable pokemons={pokemons} isLoading={isLoading} error={error} />
    </>
  );
};
