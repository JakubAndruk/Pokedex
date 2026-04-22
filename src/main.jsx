import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { PokemonProvider } from "./context/PokemonContext.jsx";
import { SnackbarProvider } from "notistack";
import { FavouritesProvider } from "./context/FavouritesContext.jsx";
import { ArenaProvider } from "./context/ArenaContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{ vertical: "center", horizontal: "center" }}
        autoHideDuration={3000}
      >
        <PokemonProvider>
          <FavouritesProvider>
            <ArenaProvider>
              <App />
            </ArenaProvider>
          </FavouritesProvider>
        </PokemonProvider>
      </SnackbarProvider>
    </AuthProvider>
  </StrictMode>,
);
