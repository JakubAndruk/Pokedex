import { Link } from "react-router-dom";

export const Placeholder = ({ children }) => {
  return (
    <div className="relative w-55 h-85 bg-linear-[-40deg,theme(colors.gray.300),theme(colors.gray.100),theme(colors.gray.300)] p-2 flex flex-col items-center justify-center transition-transform duration-200 hover:scale-105">
      {children}
    </div>
  );
};
