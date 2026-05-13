import { useSnackbar } from "notistack";

let snackbarRef = null;

export const SnackbarUtilsConfigurator = () => {
  const snackbar = useSnackbar();

  snackbarRef = snackbar;

  return null;
};

const SnackbarUtils = {
  success(msg) {
    this.toast(msg, "success");
  },
  warning(msg) {
    this.toast(msg, "warning");
  },
  info(msg) {
    this.toast(msg, "info");
  },
  error(msg) {
    this.toast(msg, "error");
  },
  toast(msg, variant = "default") {
    snackbarRef.enqueueSnackbar(msg, { variant, autoHideDuration: 1500 });
  },
};

export default SnackbarUtils;
