import { useArenaContext } from "../../../context/ArenaContext";
import { usePokemonContext } from "../../../context/PokemonContext";
import { Button } from "../../shared/Button";
import { PokemonCard } from "../../shared/PokemonCard";
import { ArenaPlaceholder } from "./ArenaPlaceholder";
import { pokemonToServer } from "../../../services/pokemonToServerService";
import SnackbarUtils from "../../../services/SnackBarUtils";

import { useEffect, useState } from "react";
import clsx from "clsx";

const FIGHT_TRANSITION = "transition-opacity duration-500";

export const Arena = () => {
  const [isAfterFight, setIsAfterFight] = useState(false);
  const [fightResult, setFightResult] = useState(null);
  const [animatedResult, setAnimatedResult] = useState(null);

  const { pokemons, refreshPokemons } = usePokemonContext();
  const { arenaPokemons, clearArena } = useArenaContext();

  const pokemonsInArena = pokemons.filter((p) => arenaPokemons.includes(p.id));
  const [slot1, slot2] = pokemonsInArena;

  useEffect(() => {
    if (fightResult === null) {
      setAnimatedResult(null);
      return;
    }

    const timer = setTimeout(() => setAnimatedResult(fightResult), 50);
    return () => clearTimeout(timer);
  }, [fightResult]);

  const handleFight = async () => {
    const getPower = (p) => p.base_experience * p.weight;

    if (getPower(slot1) === getPower(slot2)) {
      SnackbarUtils.success(`Remis!`);
      setIsAfterFight(true);
      return;
    }

    const [winner, loser] =
      getPower(slot1) > getPower(slot2) ? [slot1, slot2] : [slot2, slot1];

    await pokemonToServer(winner, {
      base_experience: winner.base_experience + 10,
      wins: (winner.wins ?? 0) + 1,
    });

    await pokemonToServer(loser, {
      loses: (loser.loses ?? 0) + 1,
    });

    await refreshPokemons();
    setFightResult(winner.id);
    SnackbarUtils.success(`Wygrywa ${winner.name}!`);
    setIsAfterFight(true);
  };

  const getCardClass = (pokemon) => {
    if (!animatedResult) return "opacity-100";
    return pokemon.id === animatedResult
      ? "opacity-100 scale-120"
      : "opacity-10";
  };

  return (
    <div className="flex flex-col p-4 items-center">
      <div className="flex p-4 gap-4 justify-center items-center">
        {slot1 ? (
          <PokemonCard
            data={slot1}
            showRemoveFromArena={true}
            className={clsx(FIGHT_TRANSITION, getCardClass(slot1))}
          />
        ) : (
          <ArenaPlaceholder />
        )}
        {isAfterFight ? (
          <Button
            onClick={() => clearArena()}
            disabled={pokemonsInArena.length === 0}
          >
            Opuść Arenę
          </Button>
        ) : (
          <Button
            onClick={() => handleFight()}
            disabled={pokemonsInArena.length < 2}
          >
            Walcz!
          </Button>
        )}
        {slot2 ? (
          <PokemonCard
            data={slot2}
            showRemoveFromArena={true}
            className={clsx(FIGHT_TRANSITION, getCardClass(slot2))}
          />
        ) : (
          <ArenaPlaceholder />
        )}
      </div>
    </div>
  );
};
