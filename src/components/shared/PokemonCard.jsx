import { Link } from "react-router-dom";
import { Placeholder } from "./Placeholder";
import { RemoveFromArenaButton } from "./RemoveFromArenaButton";
import { WinLoseStats } from "./WinLoseStats";
import { useAuthContext } from "../../context/AuthContext";

export const PokemonCard = ({ data, showRemoveFromArena = false }) => {
  const { user } = useAuthContext();
  return (
    <Placeholder>
      {showRemoveFromArena && <RemoveFromArenaButton pokemon={data} />}
      {user && (data.wins > 0 || data.loses > 0) && (
        <WinLoseStats data={data} />
      )}

      <Link to={`/pokemon/${data.id}`}>
        <div className="flex flex-col justify-center">
          <img src={data.sprite} alt={data.name} className="h-32" />
          <h2>{data.name}</h2>
        </div>
        <div className="flex flex-wrap gap-8 justify-center">
          <div>
            <div>{data.height}</div>
            <h3>Height</h3>
          </div>
          <div>
            <div>{data.base_experience}</div>
            <h3>Base experience</h3>
          </div>
          <div>
            <div>{data.weight}</div>
            <h3>Weight</h3>
          </div>
          <div>
            <div>{data.ability}</div>
            <h3>Ability</h3>
          </div>
        </div>
      </Link>
    </Placeholder>
  );
};
