import { Button } from "./Button";
import { useAuthContext } from "../../context/AuthContext";
import { NavItem } from "./NavItem";
import { NavLink } from "react-router-dom";
import pokemonLogo from "../../icons/pokemon-logo.svg";
import { ToggleButton } from "./ToggleButton";
import { useThemeContext } from "../../context/ThemeContext";
import clsx from "clsx";

export const Navbar = () => {
  const { user, logout } = useAuthContext();
  const { isDark, toggleTheme } = useThemeContext();

  return (
    <nav className=" h-18 mb-4 flex justify-between">
      <NavLink to={`/`}>
        <img
          src={pokemonLogo}
          alt="pokemon-logo"
          className="h-full w-auto block"
        />
      </NavLink>

      <div className="flex flex-col gap-1">
        <div className="flex place-content-between">
          <p className={clsx("flex", user ? "visible" : "invisible")}>
            👤 {user?.name}
          </p>
          <ToggleButton isOn={isDark} onChange={toggleTheme} />
        </div>
        <div className="flex gap-4">
          {user ? (
            <>
              <NavItem to={`/favourites`}>Ulubione</NavItem>
              <NavItem to={`/arena`}>Arena</NavItem>
              <NavItem to={`/ranking`}>Ranking</NavItem>
              <NavItem to={`/edit`}>Edycja</NavItem>
              <Button onClick={logout}>Wyloguj</Button>
            </>
          ) : (
            <>
              <NavItem to={`/login`}>Logowanie</NavItem>
              <NavItem to={`/signup`}>Rejestracja</NavItem>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
