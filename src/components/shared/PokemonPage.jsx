import { useParams } from "react-router-dom";
import { usePokemonContext } from "../../context/PokemonContext";
import { useAuthContext } from "../../context/AuthContext";
import { FavouritesButton } from "./FavouritesButton";
import { ArenaButton } from "./ArenaButton";

export const PokemonPage = () => {
  const { id } = useParams();
  const { pokemons, isLoading } = usePokemonContext();
  const { user } = useAuthContext();

  if (isLoading) return <div>Ładowanie...</div>;

  const pokemon = pokemons.find((p) => p.id === Number(id));

  if (!pokemon) return <div>Pokemon nie znaleziony</div>;

  return (
    <div className=" w-4/5 h-4/5 bg-linear-[-40deg,theme(colors.gray.300),theme(colors.gray.100),theme(colors.gray.300)] flex relative justify-items-center gap-8">
      {user && <FavouritesButton pokemon={pokemon} />}
      {user && <ArenaButton pokemon={pokemon} />}

      <div className="flex flex-col justify-center">
        <img src={pokemon.sprite} alt={pokemon.name} className="h-96" />
      </div>
      <div className="flex flex-col gap-8 justify-center">
        <h2>{pokemon.name}</h2>
        <div className="flex flex-wrap gap-8 justify-center">
          <div>
            <div>{pokemon.height}</div>
            <h3>Height</h3>
          </div>
          <div>
            <div>{pokemon.base_experience}</div>
            <h3>Base experience</h3>
          </div>
          <div>
            <div>{pokemon.weight}</div>
            <h3>Weight</h3>
          </div>
          <div>
            <div>{pokemon.ability}</div>
            <h3>Ability</h3>
          </div>
        </div>
      </div>
    </div>
  );
};
