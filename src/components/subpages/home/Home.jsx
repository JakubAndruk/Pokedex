import { PokemonProvider } from "../../../context/PokemonContext";

export const Home = () => {
  return (
    <PokemonProvider>
      <div>Home</div>
    </PokemonProvider>
  );
};
