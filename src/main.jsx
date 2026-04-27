import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { PokemonProvider } from "./context/PokemonContext.jsx";
import { SnackbarProvider } from "notistack";
import { FavouritesProvider } from "./context/FavouritesContext.jsx";
import { ArenaProvider } from "./context/ArenaContext.jsx";
import { ImagesProvider } from "./context/ImagesContext.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { SnackbarUtilsConfigurator } from "./services/SnackBarUtils.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SnackbarProvider maxSnack={3} autoHideDuration={5000}>
      <SnackbarUtilsConfigurator />
      <ThemeProvider>
        <AuthProvider>
          <PokemonProvider>
            <ImagesProvider>
              <FavouritesProvider>
                <ArenaProvider>
                  <App />
                </ArenaProvider>
              </FavouritesProvider>
            </ImagesProvider>
          </PokemonProvider>
        </AuthProvider>
      </ThemeProvider>
    </SnackbarProvider>
  </StrictMode>,
);
