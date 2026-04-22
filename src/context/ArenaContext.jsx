import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./AuthContext";
import axios from "axios";
import { JSON_Server_URL } from "../services/api";
import { enqueueSnackbar } from "notistack";

const ArenaContext = createContext();

export const ArenaProvider = ({ children }) => {
  const { user } = useAuthContext();

  const [arenaPokemons, setArenaPokemons] = useState([]);

  useEffect(() => {
    if (!user) {
      if (arenaPokemons.length > 0) {
        setArenaPokemons([]);
      }
      return;
    }

    const fetchArena = async () => {
      try {
        const response = await axios.get(`${JSON_Server_URL}/users/${user.id}`);
        setArenaPokemons(response.data.arena ?? []);
      } catch (error) {
        enqueueSnackbar(`Błąd pobierania: ${error.message}`, {
          variant: "error",
        });
      }
    };

    fetchArena();
  }, [user]);

  const addToArena = async (pokemonId) => {
    if (arenaPokemons.length >= 2) {
      enqueueSnackbar(
        "Arena jest pełna! Usuń pokemona przed dodaniem nowego.",
        { variant: "warning" },
      );
      return;
    }
    try {
      const updatedArena = [...arenaPokemons, pokemonId];
      await axios.patch(`${JSON_Server_URL}/users/${user.id}`, {
        arena: updatedArena,
      });
      setArenaPokemons(updatedArena);
    } catch (error) {
      enqueueSnackbar(`Błąd dodawania: ${error.message}`, { variant: "error" });
    }
  };

  const removeFromArena = async (pokemonId) => {
    try {
      const updatedArena = arenaPokemons.filter((id) => id !== pokemonId);
      await axios.patch(`${JSON_Server_URL}/users/${user.id}`, {
        arena: updatedArena,
      });
      setArenaPokemons(updatedArena);
    } catch (error) {
      enqueueSnackbar(`Błąd usuwania: ${error.message}`, { variant: "error" });
    }
  };

  const isInArena = (pokemonId) => arenaPokemons.includes(pokemonId);

  const clearArena = async () => {
    try {
      await axios.patch(`${JSON_Server_URL}/users/${user.id}`, {
        arena: [],
      });
      setArenaPokemons([]);
    } catch (error) {
      enqueueSnackbar(`Błąd czyszczenia: ${error.message}`, {
        variant: "error",
      });
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
