import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { pokemonCreateSchema } from "../../../services/pokemonEditSchema";
import { usePokemonContext } from "../../../context/PokemonContext";
import { Button } from "../../shared/Button";
import { LoadingErrorInfo } from "../../shared/LoadingErrorInfo";
import { savePokemonToServer } from "../../../services/pokemonToServerService";
import { useImagesContext } from "../../../context/ImagesContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import { InputForm } from "../../shared/InputForm";
import SnackbarUtils from "../../../services/SnackBarUtils";
import { IMAGES_URL } from "../../../services/api";

export const CreatePokemonForm = () => {
  const { pokemons, refreshPokemons } = usePokemonContext();
  const { images, isImagesLoading, imagesError } = useImagesContext();
  const [previewNumber, setPreviewNumber] = useState(151);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(pokemonCreateSchema),
    defaultValues: {
      name: "",
      weight: 0,
      height: 0,
      base_experience: 0,
    },
  });

  const nextID = Math.max(...pokemons.map((p) => p.id)) + 1;

  const previewURL = `${IMAGES_URL}/${previewNumber}.svg`;

  if (!images)
    return <LoadingErrorInfo error={imagesError} isLoading={isImagesLoading} />;

  const usedSpriteIds = pokemons
    .filter((p) => !p.fromApi)
    .map((p) => Number(p.sprite.split("/").pop().replace(".svg", "")));

  const isCurrentSpriteUsed = usedSpriteIds.includes(previewNumber);

  const onSubmit = async (data) => {
    const nameExist = pokemons.some(
      (p) => p.name.toLowerCase() === data.name.toLowerCase(),
    );

    if (nameExist) {
      SnackbarUtils.error(
        `Pokemon ${data.name} już istnieje! Zmień nazwę pokemona`,
      );
      return;
    }
    const ability = images.find((image) => image.id === previewNumber);
    const newPokemon = {
      ...data,
      id: nextID,
      sprite: previewURL,
      fromApi: false,
      ability: ability.ability,
      wins: 0,
      loses: 0,
    };
    await savePokemonToServer(newPokemon);
    await refreshPokemons();
    SnackbarUtils.success(`Nowy pokemon ${newPokemon.name} został dodany`);
    reset();
    navigate(`/`);
  };

  const prevImage = () => {
    if (previewNumber === 151) return setPreviewNumber(1025);
    setPreviewNumber((prev) => prev - 1);
  };

  const nextImage = () => {
    if (previewNumber === 1025) return setPreviewNumber(151);
    setPreviewNumber((prev) => prev + 1);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <InputForm id="name" type="text" errors={errors} register={register}>
          Nazwa:
        </InputForm>
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

        <div className="flex justify-center items-center gap-4">
          <label htmlFor="sprites" className="flex w-90 justify-end">
            Awatar:
          </label>
          <div className="relative flex w-90 justify-around items-center">
            <Button
              onClick={prevImage}
              className="w-10 text-3xl flex items-center"
            >
              ◂
            </Button>
            <img
              src={previewURL}
              className={clsx(
                "h-20 w-22",
                { grayscale: isCurrentSpriteUsed },
                isCurrentSpriteUsed ? "opacity-25" : "",
              )}
            />
            <Button
              onClick={nextImage}
              className="w-10 text-3xl flex items-center"
            >
              ▸
            </Button>
            {isCurrentSpriteUsed && (
              <p className="text-red-800 absolute top-7">
                Ta grafika jest już zajęta
              </p>
            )}
          </div>
        </div>
        <div className="flex justify-center">
          <Button
            type="submit"
            disabled={isSubmitting || isCurrentSpriteUsed}
            className="w-180"
          >
            Stwórz pokemona!
          </Button>
        </div>
      </form>
    </div>
  );
};
