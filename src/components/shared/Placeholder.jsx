import clsx from "clsx";
import { Link } from "react-router-dom";

export const Placeholder = ({ children, className }) => {
  return (
    <div
      className={clsx(
        "rounded-lg shadow-xl",
        "bg-linear-[-40deg,theme(colors.gray.300),theme(colors.gray.100),theme(colors.gray.300)] dark:bg-linear-[-40deg,theme(colors.gray.700),theme(colors.gray.500),theme(colors.gray.700)]",
        className,
      )}
    >
      {children}
    </div>
  );
};
