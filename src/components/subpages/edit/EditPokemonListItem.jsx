import { Link } from "react-router-dom";
import { Button } from "../../shared/Button";

export const EditPokemonListItem = ({ pokemon }) => {
  return (
    <div className="grid grid-cols-[0.5fr_1.5fr_1fr_1fr] gap-4 items-center border-b ">
      <h2>{pokemon.id}.</h2>
      <h2>{pokemon.name}</h2>
      <img src={pokemon.sprite} alt={pokemon.name} className="h-12" />

      <Link to={`/edit/${pokemon.id}`}>
        <Button>Edytuj</Button>
      </Link>
    </div>
  );
};
