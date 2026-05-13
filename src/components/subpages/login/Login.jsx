import { useAuthContext } from "../../../context/AuthContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../../services/loginSchema";
import axios from "axios";
import bcrypt from "bcryptjs";
import { JSON_Server_URL } from "../../../services/api";
import { Button } from "../../shared/Button";
import { InputForm } from "../../shared/InputForm";
import SnackbarUtils from "../../../services/SnackBarUtils";
import { LoginSignupCatchError } from "../../shared/LoginSignupCatchError";

export const Login = () => {
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
    SnackbarUtils.error("Nieprawidłowy email lub hasło");
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
      SnackbarUtils.success(`Witaj z powrotem, ${foundUser.name}!`);

      reset();
    } catch (error) {
      LoginSignupCatchError(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="relative flex flex-col gap-4 items-center"
    >
      <InputForm id="email" type="email" errors={errors} register={register}>
        Email:
      </InputForm>
      <InputForm
        id="password"
        type="password"
        errors={errors}
        register={register}
      >
        Hasło:
      </InputForm>

      <div className="flex justify-center">
        <Button type="submit" disabled={isSubmitting} className="w-184">
          {isSubmitting ? "Logowanie..." : "Zaloguj się"}
        </Button>
      </div>
    </form>
  );
};
