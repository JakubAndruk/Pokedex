import axios from "axios";
import { API_IMAGES_URL } from "../services/api";
import { useCallback, useState } from "react";

export const usePokemonImages = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [imagesError, setImagesError] = useState(null);

  const fetchPokemonImages = useCallback(async () => {
    if (images.length > 0) return;
    setIsLoading(true);
    try {
      const { data: list } = await axios.get(API_IMAGES_URL);

      const responses = await Promise.all(
        list.results.map((item) => axios.get(item.url)),
      );

      const apiImages = responses.map((item) => ({
        id: item.data.id,
        sprite:
          item.data.sprites.other.dream_world.front_default ??
          item.data.sprites.front_default,
        ability: item.data.abilities[0].ability.name ?? "Unknown",
      }));

      setImages(apiImages);
    } catch (error) {
      console.error("Error fetching Pokémon images:", error);
      setImagesError(error);
    } finally {
      setIsLoading(false);
    }
  }, [images.length]);

  return { images, isLoading, imagesError, fetchPokemonImages };
};
