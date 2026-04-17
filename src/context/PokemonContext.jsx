import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { API_URL, JSON_Server_URL } from "../services/api";

const PokemonContext = createContext();

export const PokemonProvider = ({ children }) => {
  const [pokemons, setPokemons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const jsonResponse = await axios.get(`${JSON_Server_URL}/pokemons`);

        const jsonPokemons = jsonResponse.data;

        const { data: list } = await axios.get(API_URL);
        // console.log(list.results);

        const responses = await Promise.all(
          list.results.map((item) => axios.get(item.url)),
        );

        // console.log("responses", responses);

        const apiPokemons = responses.map((item) => ({
          id: item.data.id,
          name: item.data.name,
          weight: item.data.weight,
          height: item.data.height,
          base_expirience: item.data.base_experience,
          sprite: item.data.sprites.front_default,
        }));
        // console.log("apiPokemons", apiPokemons);

        const combinedAllPokeomons = [
          ...jsonPokemons,
          ...apiPokemons.filter(
            (apiPokemon) =>
              !jsonPokemons.some(
                (jsonPokemon) => jsonPokemon.id === apiPokemon.id,
              ),
          ),
        ];

        setPokemons(combinedAllPokeomons);

        console.log("combinedAllPokeomons", combinedAllPokeomons);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPokemons();
  }, []);

  return (
    <PokemonContext.Provider value={{ pokemons, isLoading, error }}>
      {children}
    </PokemonContext.Provider>
  );
};

export const usePokemonContext = () => useContext(PokemonContext);
