import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signupSchema } from "../../../services/signupSchema";
import axios from "axios";
import bcrypt from "bcryptjs";
import { JSON_Server_URL } from "../../../services/api";
import { useAuthContext } from "../../../context/AuthContext";
import { Button } from "../../shared/Button";
import { InputForm } from "../../shared/InputForm";
import SnackbarUtils from "../../../services/SnackBarUtils";
import { LoginSignupCatchError } from "../../shared/LoginSignupCatchError";

export const Signup = () => {
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
        SnackbarUtils.warning("Użytkownik z tym emailem już istnieje");
        return;
      }

      const hashedPassword = await bcrypt.hash(data.password, 2);

      const { data: newUser } = await axios.post(`${JSON_Server_URL}/users`, {
        name: data.name,
        email: data.email,
        password: hashedPassword,
        createdAt: new Date().toISOString(),
        favourites: [],
      });

      login(newUser);

      SnackbarUtils.success(
        `Witaj, ${newUser.name}! Rejestracja zakończona sukcesem!`,
      );

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
      <InputForm id="name" type="text" errors={errors} register={register}>
        Imię:
      </InputForm>
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
      <InputForm
        id="repeatPassword"
        type="password"
        errors={errors}
        register={register}
      >
        Powtórz hasło:
      </InputForm>

      <div className=" flex justify-center ">
        <Button type="submit" disabled={isSubmitting} className="w-184">
          {isSubmitting ? "Rejestrowanie..." : "Zarejestruj się"}
        </Button>
      </div>
    </form>
  );
};
