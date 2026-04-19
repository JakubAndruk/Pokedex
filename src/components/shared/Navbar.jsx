import { Button } from "./Button";
import { useAuthContext } from "../../context/AuthContext";
import { NavItem } from "./NavItem";
import { NavLink } from "react-router-dom";

export const Navbar = () => {
  const { user, logout } = useAuthContext();

  return (
    <nav className=" h-16 flex justify-between">
      <NavLink to={`/`}>
        <img
          src="./src/icons/pokemon-logo.svg"
          alt="pokemon-logo"
          className="h-16 w-auto block"
        />
      </NavLink>

      <div>
        {user ? (
          <>
            <div>
              <div>
                <span>Witaj {user.name}!</span>
              </div>
              <div className="flex gap-4">
                <NavItem to={`/favourites`}>Ulubione</NavItem>
                <NavItem to={`/arena`}>Arena</NavItem>
                <NavItem to={`/ranking`}>Ranking</NavItem>
                <NavItem to={`/edit`}>Edycja</NavItem>
                <Button onClick={logout}>Wyloguj</Button>
              </div>
            </div>
          </>
        ) : (
          <>
            <NavItem to={`/login`}>Logowanie</NavItem>
            <NavItem to={`/signup`}>Rejestracja</NavItem>
          </>
        )}
      </div>
    </nav>
  );
};
