import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./AuthContext";
import axios from "axios";
import { USERS_URL } from "../services/api";
import SnackbarUtils from "../services/SnackBarUtils";

const ArenaContext = createContext();

export const ArenaProvider = ({ children }) => {
  const { user } = useAuthContext();
  const [arenaPokemons, setArenaPokemons] = useState([]);

  const currentUserURL = user ? `${USERS_URL}/${user.id}` : null;

  useEffect(() => {
    if (!user) return;

    let cancelled = false;

    const fetchArena = async () => {
      try {
        const response = await axios.get(currentUserURL);
        if (!cancelled) {
          setArenaPokemons(response.data.arena ?? []);
        }
      } catch (error) {
        if (!cancelled) {
          SnackbarUtils.error(`Błąd pobierania: ${error.message}`);
        }
      }
    };

    fetchArena();

    return () => {
      cancelled = true;
      setArenaPokemons([]);
    };
  }, [user]);

  const addToArena = async (pokemonId) => {
    if (arenaPokemons.length >= 2) {
      SnackbarUtils.warning(
        "Arena jest pełna! Usuń pokemona przed dodaniem nowego.",
      );

      return;
    }
    try {
      const updatedArena = [...arenaPokemons, pokemonId];
      await axios.patch(currentUserURL, {
        arena: updatedArena,
      });
      setArenaPokemons(updatedArena);
    } catch (error) {
      SnackbarUtils.error(`Błąd dodawania: ${error.message}`);
    }
  };

  const removeFromArena = async (pokemonId) => {
    try {
      const updatedArena = arenaPokemons.filter((id) => id !== pokemonId);
      await axios.patch(currentUserURL, {
        arena: updatedArena,
      });
      setArenaPokemons(updatedArena);
    } catch (error) {
      SnackbarUtils.error(`Błąd usuwania: ${error.message}`);
    }
  };

  const isInArena = (pokemonId) => arenaPokemons.includes(pokemonId);

  const clearArena = async () => {
    try {
      await axios.patch(currentUserURL, {
        arena: [],
      });
      setArenaPokemons([]);
    } catch (error) {
      SnackbarUtils.error(`Błąd czyszczenia: ${error.message}`);
    }
  };

  return (
    <ArenaContext.Provider
      value={{
        arenaPokemons,
        addToArena,
        removeFromArena,
        isInArena,
        clearArena,
      }}
    >
      {children}
    </ArenaContext.Provider>
  );
};

export const useArenaContext = () => useContext(ArenaContext);
