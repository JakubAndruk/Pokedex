import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./components/shared/ProtectedRoute";
import { GuestRoute } from "./components/shared/GuestRoute";
import { Arena } from "./components/subpages/arena/Arena";
import { Ranking } from "./components/subpages/ranking/Ranking";
import { Edit } from "./components/subpages/edit/Edit";
import { Favourites } from "./components/subpages/favourites/Favourites";
import { Login } from "./components/subpages/login/Login";
import { Signup } from "./components/subpages/signup/Signup";
import { Layout } from "./components/shared/Layout";
import { Home } from "./components/subpages/home/Home";
import { PokemonPage } from "./components/shared/PokemonPage";
import { CreatePokemonForm } from "./components/subpages/edit/CreatePokemonForm";
import { EditPokemonForm } from "./components/subpages/edit/EditPokemonForm";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/pokemon/:id" element={<PokemonPage />} />

          <Route element={<GuestRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route path="/arena" element={<Arena />} />
            <Route path="/ranking" element={<Ranking />} />
            <Route path="/favourites" element={<Favourites />} />
            <Route path="/edit" element={<Edit />} />
            <Route path="/edit/create" element={<CreatePokemonForm />} />
            <Route path="/edit/:id" element={<EditPokemonForm />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
