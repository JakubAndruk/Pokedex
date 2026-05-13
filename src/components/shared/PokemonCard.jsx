import { Link } from "react-router-dom";
import { Placeholder } from "./Placeholder";
import { RemoveFromArenaButton } from "./RemoveFromArenaButton";
import { WinLoseStats } from "./WinLoseStats";
import { useAuthContext } from "../../context/AuthContext";
import { PokemonInfo } from "./PokemonInfo";
import { PokemonName } from "./PokemonName";
import clsx from "clsx";

export const PokemonCard = ({
  data,
  showRemoveFromArena = false,
  className,
}) => {
  const { user } = useAuthContext();
  return (
    <Placeholder
      className={clsx(
        "w-65 h-86 p-2 relative flex flex-col items-center justify-center transition-transform duration-200 hover:scale-105 ",
        className,
      )}
    >
      {showRemoveFromArena && <RemoveFromArenaButton pokemon={data} />}
      {user && (data.wins > 0 || data.loses > 0) && (
        <WinLoseStats data={data} />
      )}

      <Link to={`/pokemon/${data.id}`}>
        <div className="flex flex-col  items-center gap-4">
          <img src={data.sprite} alt={data.name} className="h-32 w-32" />
          <PokemonName data={data} />
        </div>
        <div className="grid grid-cols-2 gap-4 p-2">
          <PokemonInfo data={data} props="height" />
          <PokemonInfo data={data} props="base_experience" />
          <PokemonInfo data={data} props="weight" />
          <PokemonInfo data={data} props="ability" />
        </div>
      </Link>
    </Placeholder>
  );
};
