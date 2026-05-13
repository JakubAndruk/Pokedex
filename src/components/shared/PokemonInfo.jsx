export const PokemonInfo = ({ data, props }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="opacity-50 text-sm">{data[props]}</div>
      <p className="first-letter:uppercase font-bold text-sm">
        {props.replace(/_/g, " ")}
      </p>
    </div>
  );
};
