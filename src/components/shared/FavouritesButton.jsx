import clsx from "clsx";
import { useFavouritesContext } from "../../context/FavouritesContext";

export const FavouritesButton = ({ pokemon }) => {
  const { addFavourites, removeFavourites, isFavourites } =
    useFavouritesContext();

  const handleFavourite = (e) => {
    e.stopPropagation();
    isFavourites(pokemon.id)
      ? removeFavourites(pokemon.id)
      : addFavourites(pokemon.id);
  };

  return (
    <div
      onClick={handleFavourite}
      className={clsx(
        "absolute bottom-2 right-2 cursor-pointer",
        !isFavourites(pokemon.id) && "text-gray-900",
        isFavourites(pokemon.id) && "text-red-800",
      )}
    >
      ♥
    </div>
  );
};
