import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { pokemonCreateSchema } from "../../../services/pokemonEditSchema";
import { usePokemonContext } from "../../../context/PokemonContext";
import { Button } from "../../shared/Button";
import { LoadingErrorInfo } from "../../shared/LoadingErrorInfo";
import { savePokemonToServer } from "../../../services/pokemonToServerService";
import { enqueueSnackbar } from "notistack";
import { useImagesContext } from "../../../context/ImagesContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";

export const CreatePokemonForm = () => {
  const { pokemons } = usePokemonContext();
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
  //   console.log("images", images);

  //   console.log("previewUrl", previewUrl);

  const previewUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${previewNumber}.svg`;

  if (!images)
    return <LoadingErrorInfo error={imagesError} isLoading={isImagesLoading} />;

  const usedSpriteIds = pokemons
    .filter((p) => !p.fromApi)
    .map((p) => Number(p.sprite.split("/").pop().replace(".svg", "")));

  const isCurrentSpriteUsed = usedSpriteIds.includes(previewNumber);

  const onSubmit = (data, event) => {
    event.preventDefault();

    const nameExist = pokemons.some(
      (p) => p.name.toLowerCase() === data.name.toLowerCase(),
    );

    if (nameExist) {
      enqueueSnackbar(
        `Pokemon ${data.name} już istnieje! Zmień nazwę pokemona`,
        { variant: "error" },
      );
      return;
    }
    const ability = images.find((image) => image.id === previewNumber);
    const newPokemon = {
      ...data,
      id: nextID,
      sprite: previewUrl,
      fromApi: false,
      ability: ability.ability,
      wins: 0,
      loses: 0,
    };
    savePokemonToServer(newPokemon);

    enqueueSnackbar(`Nowy pokemon ${newPokemon.name} został dodany`, {
      variant: "success",
    });
    console.log("usedSpriteIds", usedSpriteIds);
    console.log("newPokemon", newPokemon);
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
      <div>CreatePokemonForm</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-center gap-4">
          <label htmlFor="name">Nazwa:</label>
          <input
            id="name"
            type="text"
            {...register("name")}
            className="border border-gray-800"
          />
          {errors.name && <p className="text-red-800">{errors.name.message}</p>}
        </div>
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
        <div className="flex justify-center gap-4">
          <label htmlFor="sprites">Awatar:</label>

          <Button onClick={prevImage}>Prev</Button>
          <img
            src={previewUrl}
            className={clsx("h-24", { grayscale: isCurrentSpriteUsed })}
          />
          <Button onClick={nextImage}>Next</Button>
          {isCurrentSpriteUsed && (
            <p className="text-red-800">Ta grafika jest już zajęta</p>
          )}
        </div>

        <Button type="submit" disabled={isSubmitting || isCurrentSpriteUsed}>
          Stwórz pokemona!
        </Button>
      </form>
    </div>
  );
};
