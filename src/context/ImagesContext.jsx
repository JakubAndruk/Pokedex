import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { API_IMAGES_URL } from "../services/api";

const ImagesContext = createContext();

export const ImagesProvider = ({ children }) => {
  const [images, setImages] = useState([]);
  const [isImagesLoading, setIsImagesLoading] = useState(true);
  const [imagesError, setImagesError] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
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
          ability: item.data.abilities[0].ability.name,
        }));

        setImages(apiImages);
      } catch (error) {
        setImagesError(error);
      } finally {
        setIsImagesLoading(false);
      }
    };
    fetchImages();
  }, []);

  return (
    <ImagesContext.Provider value={{ images, isImagesLoading, imagesError }}>
      {children}
    </ImagesContext.Provider>
  );
};

export const useImagesContext = () => {
  const context = useContext(ImagesContext);
  if (!context)
    throw new Error("useImagesContext must be used within ImagesProvider");
  return context;
};
