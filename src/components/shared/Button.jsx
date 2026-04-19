export const Button = ({
  children,
  type = "button",
  onClick,
  disabled = false,
  isActive = false,
  hidden = false,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`h-8 w-24 pointer-events-auto text-white
  ${isActive ? "bg-blue-500" : "bg-amber-400 hover:bg-blue-500"}
  ${hidden ? "invisible" : ""}`}
    >
      {children}
    </button>
  );
};
