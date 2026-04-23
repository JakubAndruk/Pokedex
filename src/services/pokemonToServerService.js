import axios from "axios";
import { enqueueSnackbar } from "notistack";
import { JSON_Server_URL } from "./api";

export function pokemonToServer(pokemon, statsUpdate) {
  const updatedPokemon = {
    ...pokemon,
    ...statsUpdate,
    fromApi: false,
  };

  if (pokemon.fromApi) {
    savePokemonToServer(updatedPokemon);
  } else {
    updatePokemonOnServer(updatedPokemon);
  }
}

export async function savePokemonToServer(pokemon) {
  try {
    await axios.post(`${JSON_Server_URL}/pokemons/`, pokemon);
  } catch (error) {
    enqueueSnackbar(`Błąd aktualizacji danych: ${error.message}`, {
      variant: "error",
    });
  }
}

export async function updatePokemonOnServer(pokemon) {
  try {
    await axios.patch(`${JSON_Server_URL}/pokemons/${pokemon.id}`, pokemon);
  } catch (error) {
    enqueueSnackbar(`Błąd aktualizacji danych: ${error.message}`, {
      variant: "error",
    });
  }
}
