import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { USERS_URL } from "../services/api";
import { useAuthContext } from "./AuthContext";
import SnackbarUtils from "../services/SnackBarUtils";

const FavouritesContext = createContext();

export const FavouritesProvider = ({ children }) => {
  const [favourites, setFavourites] = useState([]);
  const { user } = useAuthContext();

  const currentUserURL = user ? `${USERS_URL}/${user.id}` : null;

  useEffect(() => {
    if (!user) return;

    let cancelled = false;

    const fetchFavourites = async () => {
      try {
        const response = await axios.get(currentUserURL);
        if (!cancelled) {
          setFavourites(response.data.favourites ?? []);
        }
      } catch (error) {
        if (!cancelled) {
          SnackbarUtils.error(`Błąd pobierania: ${error.message}`);
        }
      }
    };

    fetchFavourites();

    return () => {
      cancelled = true;
      setFavourites([]);
    };
  }, [user]);

  const addToFavourites = async (pokemonId) => {
    try {
      const updatedFavourites = [...favourites, pokemonId];
      await axios.patch(currentUserURL, {
        favourites: updatedFavourites,
      });
      setFavourites(updatedFavourites);
    } catch (error) {
      SnackbarUtils.error(`Błąd dodawania: ${error.message}`);
    }
  };

  const removeFromFavourites = async (pokemonId) => {
    try {
      const updatedFavourites = favourites.filter((id) => id !== pokemonId);
      await axios.patch(currentUserURL, {
        favourites: updatedFavourites,
      });
      setFavourites(updatedFavourites);
    } catch (error) {
      SnackbarUtils.error(`Błąd usuwania: ${error.message}`);
    }
  };
  const isInFavourites = (pokemonId) => favourites.includes(pokemonId);

  return (
    <FavouritesContext.Provider
      value={{
        favourites,
        addToFavourites,
        removeFromFavourites,
        isInFavourites,
      }}
    >
      {children}
    </FavouritesContext.Provider>
  );
};
export const useFavouritesContext = () => useContext(FavouritesContext);
