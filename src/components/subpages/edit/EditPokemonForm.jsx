import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { pokemonEditSchema } from "../../../services/pokemonEditSchema";
import { usePokemonContext } from "../../../context/PokemonContext";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../../shared/Button";
import { LoadingErrorInfo } from "../../shared/LoadingErrorInfo";
import { pokemonToServer } from "../../../services/pokemonToServerService";
import { InputForm } from "../../shared/InputForm";
import { PokemonName } from "../../shared/PokemonName";
import SnackbarUtils from "../../../services/SnackBarUtils";

export const EditPokemonForm = () => {
  const { id } = useParams();
  const { pokemons, isLoading, error, refreshPokemons } = usePokemonContext();
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

  const onSubmit = async (data) => {
    await pokemonToServer(pokemon, data);
    await refreshPokemons();
    SnackbarUtils.success(
      `Zmieniono atrybuty ${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}`,
    );
    navigate("/");
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative flex flex-col gap-4 items-center"
      >
        <PokemonName data={pokemon} />
        <img
          src={pokemon.sprite}
          alt={pokemon.name}
          className="absolute top-8
           me-120 h-38"
        />
        <InputForm
          id="weight"
          type="number"
          errors={errors}
          register={register}
        >
          Waga:
        </InputForm>
        <InputForm
          id="height"
          type="number"
          errors={errors}
          register={register}
        >
          Wzrost:
        </InputForm>
        <InputForm
          id="base_experience"
          type="number"
          errors={errors}
          register={register}
        >
          Doświadczenie:
        </InputForm>

        <Button type="submit" disabled={isSubmitting} className="w-185">
          Zapisz
        </Button>
      </form>
    </div>
  );
};
