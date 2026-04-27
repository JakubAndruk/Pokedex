import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
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

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/pokemon/:id", element: <PokemonPage /> },
      {
        element: <GuestRoute />,
        children: [
          { path: "/login", element: <Login /> },
          { path: "/signup", element: <Signup /> },
        ],
      },
      {
        element: <ProtectedRoute />,
        children: [
          { path: "/arena", element: <Arena /> },
          { path: "/ranking", element: <Ranking /> },
          { path: "/favourites", element: <Favourites /> },
          { path: "/edit", element: <Edit /> },
          { path: "/edit/create", element: <CreatePokemonForm /> },
          { path: "/edit/:id", element: <EditPokemonForm /> },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
