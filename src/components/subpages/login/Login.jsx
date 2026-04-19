import { useSnackbar } from "notistack";
import { useAuthContext } from "../../../context/AuthContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../../services/loginSchema";
import axios from "axios";
import bcrypt from "bcryptjs";
import { JSON_Server_URL } from "../../../services/api";
import { Button } from "../../shared/Button";

export const Login = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { login } = useAuthContext();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function errorLogin() {
    enqueueSnackbar("Nieprawidłowy email lub hasło", { variant: "error" });
  }
  const onSubmit = async (data) => {
    try {
      const { data: users } = await axios.get(
        `${JSON_Server_URL}/users?email=${data.email}`,
      );

      if (users.length === 0) {
        errorLogin();
        return;
      }

      const foundUser = users[0];

      const isPasswordValid = await bcrypt.compare(
        data.password,
        foundUser.password,
      );

      if (!isPasswordValid) {
        errorLogin();
        return;
      }

      login({
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
      });

      enqueueSnackbar(`Witaj z powrotem, ${foundUser.name}!`, {
        variant: "success",
      });

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
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Logowanie..." : "Zaloguj się"}
        </Button>
      </div>
    </form>
  );
};
