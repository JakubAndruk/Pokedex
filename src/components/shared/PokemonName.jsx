export const PokemonName = ({ data }) => {
  return (
    <p className="first-letter:uppercase font-bold text-xl">{data.name}</p>
  );
};
