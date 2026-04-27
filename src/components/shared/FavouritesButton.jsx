import clsx from "clsx";
import { useFavouritesContext } from "../../context/FavouritesContext";

export const FavouritesButton = ({ pokemon }) => {
  const { addToFavourites, removeFromFavourites, isInFavourites } =
    useFavouritesContext();

  const handleFavourite = (e) => {
    e.stopPropagation();
    isInFavourites(pokemon.id)
      ? removeFromFavourites(pokemon.id)
      : addToFavourites(pokemon.id);
  };

  return (
    <div
      onClick={handleFavourite}
      className={clsx(
        "absolute bottom-2 right-2 cursor-pointer text-3xl",
        !isInFavourites(pokemon.id) && "text-gray-900 dark:text-gray-300",
        isInFavourites(pokemon.id) && "text-red-800",
      )}
    >
      ♥
    </div>
  );
};
