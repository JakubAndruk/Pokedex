import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { pokemonEditSchema } from "../../../services/pokemonEditSchema";
import { usePokemonContext } from "../../../context/PokemonContext";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../../shared/Button";
import { LoadingErrorInfo } from "../../shared/LoadingErrorInfo";
import { pokemonToServer } from "../../../services/pokemonToServerService";
import { enqueueSnackbar } from "notistack";

export const EditPokemonForm = () => {
  const { id } = useParams();
  const { pokemons, isLoading, error } = usePokemonContext();
  const navigate = useNavigate();
  const pokemon = pokemons.find((p) => p.id === Number(id));
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(pokemonEditSchema),
    values: {
      weight: pokemon?.weight ?? 0,
      height: pokemon?.height ?? 0,
      base_experience: pokemon?.base_experience ?? 0,
    },
  });

  if (!pokemon) return <LoadingErrorInfo error={error} isLoading={isLoading} />;

  console.log("pokemon", pokemon);

  const onSubmit = (data) => {
    pokemonToServer(pokemon, data);
    enqueueSnackbar(`Zmieniono atrybuty ${pokemon.name}`, {
      variant: "success",
    });
    console.log("data", data);
    console.log("errors", errors);
    navigate(`/`);
  };

  return (
    <div>
      <div>EditPokemonForm</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-center gap-4">
          <label htmlFor="weight">Waga:</label>
          <input
            id="weight"
            type="number"
            {...register("weight")}
            className="border border-gray-800"
          />
          {errors.weight && (
            <p className="text-red-800">{errors.weight.message}</p>
          )}
        </div>
        <div className="flex justify-center gap-4">
          <label htmlFor="height">Wzrost:</label>
          <input
            id="height"
            type="number"
            {...register("height")}
            className="border border-gray-800"
          />
          {errors.height && (
            <p className="text-red-800">{errors.height.message}</p>
          )}
        </div>
        <div className="flex justify-center gap-4">
          <label htmlFor="base_experience">Doświadczenie:</label>
          <input
            id="base_experience"
            type="number"
            {...register("base_experience")}
            className="border border-gray-800"
          />
          {errors.base_experience && (
            <p className="text-red-800">{errors.base_experience.message}</p>
          )}
        </div>

        <Button type="submit" disabled={isSubmitting}>
          Zapisz
        </Button>
      </form>
    </div>
  );
};
