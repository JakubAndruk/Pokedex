import { Link } from "react-router-dom";
import { Button } from "../../shared/Button";

export const EditPokemonListItem = ({ pokemon }) => {
  return (
    <div className="grid grid-cols-[2rem_8rem_4rem_4rem] gap-4 p-2 items-center ">
      <h2>{pokemon.id}.</h2>
      <h2>{pokemon.name}</h2>
      <img src={pokemon.sprite} alt={pokemon.name} className="h-12" />

      <Link to={`/edit/${pokemon.id}`}>
        <Button>Edytuj</Button>
      </Link>
    </div>
  );
};
