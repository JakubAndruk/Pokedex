import axios from "axios";
import SnackbarUtils from "../../services/SnackBarUtils";

export const LoginSignupCatchError = (error) => {
  if (axios.isAxiosError(error)) {
    SnackbarUtils.error("Błąd połaczenia z serwerem. Sprawdź JSON Server");
  } else {
    SnackbarUtils.error("Niespodziewany błąd.");
  }
};
