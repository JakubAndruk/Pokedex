import axios from "axios";
import { POKEMONS_URL } from "./api";
import SnackbarUtils from "./SnackBarUtils";

const handleApiError = (error) => {
  SnackbarUtils.error(`Błąd aktualizacji danych: ${error.message}`);
  throw error;
};

export async function savePokemonToServer(pokemon) {
  try {
    await axios.post(POKEMONS_URL, pokemon);
  } catch (error) {
    handleApiError(error);
  }
}

export async function updatePokemonOnServer(pokemon) {
  try {
    await axios.patch(`${POKEMONS_URL}/${pokemon.id}`, pokemon);
  } catch (error) {
    handleApiError(error);
  }
}

export async function pokemonToServer(pokemon, statsUpdate) {
  const updatedPokemon = {
    ...pokemon,
    ...statsUpdate,
    fromApi: false,
  };

  if (pokemon.fromApi) {
    await savePokemonToServer(updatedPokemon);
  } else {
    await updatePokemonOnServer(updatedPokemon);
  }
}
