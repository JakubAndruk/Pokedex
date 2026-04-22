import { enqueueSnackbar } from "notistack";
import { useArenaContext } from "../../../context/ArenaContext";
import { usePokemonContext } from "../../../context/PokemonContext";
import { Button } from "../../shared/Button";
import { PokemonCard } from "../../shared/PokemonCard";
import { ArenaPlaceholder } from "./ArenaPlaceholder";
import { useState } from "react";
import axios from "axios";
import { JSON_Server_URL } from "../../../services/api";

export const Arena = () => {
  const { pokemons } = usePokemonContext();
  const { arenaPokemons, addToArena, removeFromArena, isInArena, clearArena } =
    useArenaContext();

  const pokemonsInArena = pokemons.filter((p) => arenaPokemons.includes(p.id));

  const slot1 = pokemonsInArena[0] ?? null;
  const slot2 = pokemonsInArena[1] ?? null;
  // console.log("slot2", slot2);
  // console.log("slot1", slot1);

  const handleFight = () => {
    const pokemonPower1 = slot1.base_experience * slot1.weight;
    const pokemonPower2 = slot2.base_experience * slot2.weight;

    if (pokemonPower1 === pokemonPower2)
      return enqueueSnackbar("Remis!", { variant: "success" });

    const winner = { ...(pokemonPower1 > pokemonPower2 ? slot1 : slot2) };
    const loser = { ...(pokemonPower1 > pokemonPower2 ? slot2 : slot1) };

    const addStatsToWinner = async (winner) => {
      const updatedWinner = {
        ...winner,
        base_experience: winner.base_experience + 10,
        wins: (winner.wins ?? 0) + 1,
        fromApi: false,
      };
      try {
        if (winner.fromApi) {
          await axios.post(`${JSON_Server_URL}/pokemons/`, updatedWinner);
        } else {
          await axios.patch(
            `${JSON_Server_URL}/pokemons/${winner.id}`,
            updatedWinner,
          );
        }
      } catch (error) {
        enqueueSnackbar(`Błąd aktualizacji danych: ${error.message}`, {
          variant: "error",
        });
      }
    };

    const addStatsToLosser = async (loser) => {
      const updatedLoser = {
        ...loser,
        loses: loser.loses + 1,
        fromApi: false,
      };
      try {
        if (loser.fromApi) {
          await axios.post(`${JSON_Server_URL}/pokemons/`, updatedLoser);
        } else {
          await axios.patch(
            `${JSON_Server_URL}/pokemons/${loser.id}`,
            updatedLoser,
          );
        }
      } catch (error) {
        enqueueSnackbar(`Błąd aktualizacji danych: ${error.message}`, {
          variant: "error",
        });
      }
    };

    addStatsToWinner(winner);
    addStatsToLosser(loser);
    return enqueueSnackbar(`Wygrywa ${winner.name}!`, { variant: "success" });
  };

  return (
    <>
      <div>Arena</div>
      <div className="flex flex-wrap p-4 gap-4 justify-start">
        {slot1 ? (
          <PokemonCard data={slot1} showRemoveFromArena={true} />
        ) : (
          <ArenaPlaceholder />
        )}
        {slot2 ? (
          <PokemonCard data={slot2} showRemoveFromArena={true} />
        ) : (
          <ArenaPlaceholder />
        )}
      </div>
      <Button
        onClick={() => handleFight()}
        disabled={pokemonsInArena.length < 2}
      >
        Walcz!
      </Button>
      <Button
        onClick={() => clearArena()}
        disabled={pokemonsInArena.length === 0}
      >
        Wyczyść Arene
      </Button>
    </>
  );
};
