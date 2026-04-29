import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { API_URL, POKEMONS_URL } from "../services/api";

const PokemonContext = createContext();

export const PokemonProvider = ({ children }) => {
  const [pokemons, setPokemons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPokemons = async () => {
    try {
      const jsonResponse = await axios.get(POKEMONS_URL);

      const jsonPokemons = jsonResponse.data;

      const { data: list } = await axios.get(API_URL);

      const responses = await Promise.all(
        list.results.map((item) => axios.get(item.url)),
      );

      const apiPokemons = responses.map((item) => ({
        id: item.data.id,
        name: item.data.name,
        weight: item.data.weight,
        height: item.data.height,
        base_experience: item.data.base_experience,
        sprite:
          item.data.sprites.other.dream_world.front_default ??
          item.data.sprites.front_default,
        ability: item.data.abilities[0].ability.name,
        fromApi: true,
        wins: 0,
        loses: 0,
      }));

      const combinedAllPokeomons = [
        ...jsonPokemons,
        ...apiPokemons.filter(
          (apiPokemon) =>
            !jsonPokemons.some(
              (jsonPokemon) => jsonPokemon.id === apiPokemon.id,
            ),
        ),
      ].sort((a, b) => a.id - b.id);

      setPokemons(combinedAllPokeomons);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemons();
  }, []);

  return (
    <PokemonContext.Provider
      value={{ pokemons, isLoading, error, refreshPokemons: fetchPokemons }}
    >
      {children}
    </PokemonContext.Provider>
  );
};

export const usePokemonContext = () => {
  const context = useContext(PokemonContext);
  if (!context)
    throw new Error("usePokemonContext must be used within PokemonProvider");
  return context;
};
