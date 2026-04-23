import z from "zod";

export const pokemonEditSchema = z.object({
  weight: z.coerce.number().min(1, "Waga jest wymaganea"),
  height: z.coerce.number().min(1, "Wzrost jest wymagany"),
  base_experience: z.coerce.number().min(1, "Doświadczenie jest wymagane"),
});

export const pokemonCreateSchema = pokemonEditSchema.extend({
  name: z
    .string()
    .min(1, "Nazwa jest wymagana")
    .min(3, "Nazwa musi mieć minimum 3 znaki"),
});
