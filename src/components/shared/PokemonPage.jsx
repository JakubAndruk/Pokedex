import { useParams } from "react-router-dom";
import { usePokemonContext } from "../../context/PokemonContext";
import { useAuthContext } from "../../context/AuthContext";
import { FavouritesButton } from "./FavouritesButton";
import { ArenaButton } from "./ArenaButton";
import { Placeholder } from "./Placeholder";
import { PokemonName } from "./PokemonName";
import { PokemonInfo } from "./PokemonInfo";
import { Button } from "./Button";

export const PokemonPage = () => {
  const { id } = useParams();
  const { pokemons, isLoading } = usePokemonContext();
  const { user } = useAuthContext();

  if (isLoading) return <div>Ładowanie...</div>;

  const pokemon = pokemons.find((p) => p.id === Number(id));

  if (!pokemon) return <div>Pokemon nie znaleziony</div>;

  return (
    <div className="flex flex-col items-center gap-4">
      <Placeholder className={"w-3/4 h-120 flex relative justify-around gap-8"}>
        {user && <FavouritesButton pokemon={pokemon} />}
        {user && <ArenaButton pokemon={pokemon} />}

        <div className="flex flex-col justify-center">
          <img src={pokemon.sprite} alt={pokemon.name} className="h-96" />
        </div>
        <div className="flex flex-col gap-8 justify-center items-center">
          <PokemonName data={pokemon} />
          <div className="grid grid-cols-2 gap-16 justify-center">
            <PokemonInfo data={pokemon} props="height" />
            <PokemonInfo data={pokemon} props="base_experience" />
            <PokemonInfo data={pokemon} props="weight" />
            <PokemonInfo data={pokemon} props="ability" />
          </div>
        </div>
      </Placeholder>
    </div>
  );
};
