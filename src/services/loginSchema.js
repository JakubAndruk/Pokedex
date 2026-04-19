import z from "zod";

export const loginSchema = z.object({
  email: z.string().min(1, "Email jest wymagany").email("Podaj poprawny email"),
  password: z.string().min(1, "Hasło jest wymagane"),
});
