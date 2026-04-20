import axios from "axios";
import { enqueueSnackbar } from "notistack";
import { createContext, useContext, useEffect, useState } from "react";
import { JSON_Server_URL } from "../services/api";
import { useAuthContext } from "./AuthContext";

const FavouritesContext = createContext();

export const FavouritesProvider = ({ children }) => {
  const { user } = useAuthContext();
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    if (!user) {
      if (favourites.length > 0) {
        setFavourites([]);
      }
      return;
    }

    const fetchFavourites = async () => {
      try {
        const response = await axios.get(`${JSON_Server_URL}/users/${user.id}`);
        setFavourites(response.data.favourites ?? []);
      } catch (error) {
        enqueueSnackbar(`Błąd pobierania: ${error.message}`);
      }
    };

    fetchFavourites();
  }, [user]);

  const addFavourites = async (pokemonId) => {
    try {
      const updatedFavourites = [...favourites, pokemonId];
      await axios.patch(`${JSON_Server_URL}/users/${user.id}`, {
        favourites: updatedFavourites,
      });
      setFavourites(updatedFavourites);
    } catch (error) {
      enqueueSnackbar(`Błąd dodawania: ${error.message}`, {
        variant: "error",
      });
    }
  };

  const removeFavourites = async (pokemonId) => {
    try {
      const updatedFavourites = favourites.filter((id) => id !== pokemonId);
      await axios.patch(`${JSON_Server_URL}/users/${user.id}`, {
        favourites: updatedFavourites,
      });
      setFavourites(updatedFavourites);
    } catch (error) {
      enqueueSnackbar(`Błąd usuwania: ${error.message}`, {
        variant: "error",
      });
    }
  };
  const isFavourites = (pokemonId) => favourites.includes(pokemonId);

  return (
    <FavouritesContext.Provider
      value={{ favourites, addFavourites, removeFavourites, isFavourites }}
    >
      {children}
    </FavouritesContext.Provider>
  );
};
export const useFavouritesContext = () => useContext(FavouritesContext);
