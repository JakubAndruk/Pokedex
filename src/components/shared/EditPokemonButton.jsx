import clsx from "clsx";
import { Link } from "react-router-dom";

export const EditPokemonButton = ({ pokemon }) => {
  return (
    <Link to={`/edit/${pokemon.id}`}>
      <div
        className={clsx(
          "absolute bottom-2 left-2 cursor-pointer text-gray-900",
        )}
      >
        🖌
      </div>
    </Link>
  );
};
