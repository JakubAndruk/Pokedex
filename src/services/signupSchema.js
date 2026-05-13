import z from "zod";

export const signupSchema = z
  .object({
    name: z
      .string()
      .min(1, "Imię jest wymagane")
      .min(3, "Imię musi mieć minimum 3 znaki"),

    email: z
      .string()
      .min(1, "Email jest wymagany")
      .email("Podaj poprawny email"),
    password: z
      .string()
      .min(1, "Hasło jest wymagane")
      .min(8, "Hasło musi mieć minimum 8 znaków")
      .regex(/[A-Z]/, "Hasło musi zawierać co najmniej 1 dużą literę")
      .regex(/[0-9]/, "Hasło musi zawierać co najmniej 1 cyfrę")
      .regex(/[^A-Za-z0-9]/, "Hasło musi zawierać co najmniej 1 znak secjalny"),
    repeatPassword: z.string().min(1, "Potwierdzenie hasła jest wymagane"),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: "Hasła muszą być indentyczne",
    path: ["repeatPassword"],
  });
