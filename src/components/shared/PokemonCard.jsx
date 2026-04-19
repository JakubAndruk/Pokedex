export const PokemonCard = ({ data, onClick }) => {
  return (
    <div className="w-55 h-85 bg-linear-[-40deg,theme(colors.gray.300),theme(colors.gray.100),theme(colors.gray.300)] flex-col justify-items-center">
      <div className="flex-col justify-center">
        <img src={data.sprite} alt={data.name} className="h-32" />
        <h2>{data.name}</h2>
      </div>
      <div className="flex flex-wrap gap-8 justify-center">
        <div>
          <div>{data.height}</div>
          <h3>Height</h3>
        </div>
        <div>
          <div>{data.base_experience}</div>
          <h3>Base experience</h3>
        </div>
        <div>
          <div>{data.weight}</div>
          <h3>Weight</h3>
        </div>
        <div>
          <div>{data.ability}</div>
          <h3>Ability</h3>
        </div>
      </div>
    </div>
  );
};
