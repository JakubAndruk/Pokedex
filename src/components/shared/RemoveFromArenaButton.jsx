import clsx from "clsx";
import { useArenaContext } from "../../context/ArenaContext";

export const RemoveFromArenaButton = ({ pokemon }) => {
  const { removeFromArena } = useArenaContext();

  const handleArena = (e) => {
    e.stopPropagation();
    removeFromArena(pokemon.id);
  };

  return (
    <div
      onClick={handleArena}
      className={clsx("absolute top-2 right-2 cursor-pointer text-gray-900")}
    >
      🗑
    </div>
  );
};
