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
          "absolute top-0 right-2 cursor-pointer text-3xl",
          !isInArena(pokemon.id) && "text-gray-900 dark:text-gray-300",
          isInArena(pokemon.id) && "text-red-800",
        )}
      >
        ⚔︎
      </div>

      <div
        className={clsx(
          "absolute top-1 right-9 cursor-pointer text-xl",
          !isInArena(pokemon.id) && "text-gray-900 dark:text-gray-300",
          isInArena(pokemon.id) && "text-red-800",
        )}
      >
        {arenaPokemons.length}/2
      </div>
    </div>
  );
};
