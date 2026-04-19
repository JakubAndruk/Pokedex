import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signupSchema } from "../../../services/signupSchema";
import { useSnackbar } from "notistack";
import axios from "axios";
import bcrypt from "bcryptjs";
import { JSON_Server_URL } from "../../../services/api";
import { useAuthContext } from "../../../context/AuthContext";
import { Button } from "../../shared/Button";

export const Signup = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { login } = useAuthContext();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "Jan",
      email: "jan@mail.com",
      password: "",
      repeatPassword: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const { data: existingUsers } = await axios.get(
        `${JSON_Server_URL}/users?email=${data.email}`,
      );

      if (existingUsers.length > 0) {
        enqueueSnackbar("Użytkownik z tym emailem już istnieje", {
          variant: "warning",
        });
        return;
      }

      const hashedPassword = await bcrypt.hash(data.password, 2);

      const { data: newUser } = await axios.post(`${JSON_Server_URL}/users`, {
        name: data.name,
        email: data.email,
        password: hashedPassword,
        createdAt: new Date().toISOString(),
      });

      login(newUser);

      enqueueSnackbar(
        `Witaj, ${newUser.name}! Rejestracja zakończona sukcesem!`,
        {
          variant: "success",
        },
      );

      reset();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        enqueueSnackbar("Server conneted error. Check JSON Server.", {
          variant: "error",
        });
      } else {
        enqueueSnackbar("Unexpected error.", { variant: "error" });
      }

      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="bg-amber-100 flex justify-center gap-4">
        <label htmlFor="name">Imię:</label>
        <input
          id="name"
          type="text"
          {...register("name")}
          className="border border-gray-800"
        />
        {errors.name && <p className="text-red-800">{errors.name.message}</p>}
      </div>
      <div className="bg-amber-100 flex justify-center gap-4">
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          {...register("email")}
          className="border border-gray-800"
        />
        {errors.email && <p className="text-red-800">{errors.email.message}</p>}
      </div>
      <div className="bg-amber-100 flex justify-center gap-4">
        <label htmlFor="password">Hasło:</label>
        <input
          id="password"
          type="password"
          {...register("password")}
          className="border border-gray-800"
        />
        {errors.password && (
          <p className="text-red-800">{errors.password.message}</p>
        )}
      </div>
      <div className="bg-amber-100 flex justify-center gap-4">
        <label htmlFor="repeatPassword">Powtórz hasło:</label>
        <input
          id="repeatPassword"
          type="text"
          {...register("repeatPassword")}
          className="border border-gray-800"
        />
        {errors.repeatPassword && (
          <p className="text-red-800">{errors.repeatPassword.message}</p>
        )}
      </div>
      <div className="bg-amber-100 flex justify-center gap-4">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Rejestrowanie..." : "Zarejestruj się"}
        </Button>
      </div>
    </form>
  );
};
