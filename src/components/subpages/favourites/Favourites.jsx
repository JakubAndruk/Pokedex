import { usePokemonContext } from "../../../context/PokemonContext";
import { useFavouritesContext } from "../../../context/FavouritesContext";
import { PokemonList } from "../../shared/PokemonList";

export const Favourites = () => {
  const { pokemons, isLoading, error } = usePokemonContext();
  const { favourites } = useFavouritesContext();

  const favouritesPokemons = pokemons.filter((p) => favourites.includes(p.id));
  if (!isLoading && favouritesPokemons.length === 0) {
    return (
      <p>
        Nie masz jeszcze ulubionych pokemonów. Kliknij ♥ na stronie pokemona,
        aby dodać do ulubionych.
      </p>
    );
  }
  return (
    <>
      <div>Favourites</div>

      <PokemonList
        pokemons={favouritesPokemons}
        isLoading={isLoading}
        error={error}
      />
    </>
  );
};
