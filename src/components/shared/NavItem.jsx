import { NavLink } from "react-router-dom";
import { Button } from "./Button";

export const NavItem = ({ to, children }) => {
  return (
    <NavLink to={to}>
      {({ isActive }) => <Button isActive={isActive}>{children}</Button>}
    </NavLink>
  );
};
