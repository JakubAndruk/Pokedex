import clsx from "clsx";
import { useArenaContext } from "../../context/ArenaContext";

export const ArenaButton = ({ pokemon }) => {
  const { arenaPokemons, addToArena, removeFromArena, isInArena } =
    useArenaContext();

  const handleArena = (e) => {
    e.stopPropagation();
    isInArena(pokemon.id)
      ? removeFromArena(pokemon.id)
      : addToArena(pokemon.id);
  };

  return (
    <div>
      <div
        onClick={handleArena}
        className={clsx(
          "absolute top-0 left-2 cursor-pointer",
          !isInArena(pokemon.id) && "text-gray-900",
          isInArena(pokemon.id) && "text-red-800",
        )}
      >
        ⚔︎
      </div>
      <div
        className={clsx(
          "absolute top-0 left-6 cursor-pointer",
          !isInArena(pokemon.id) && "text-gray-900",
          isInArena(pokemon.id) && "text-red-800",
        )}
      >
        {arenaPokemons.length}/2
      </div>
    </div>
  );
};
