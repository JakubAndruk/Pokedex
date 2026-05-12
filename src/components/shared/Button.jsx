import clsx from "clsx";

export const Button = ({
  children,
  type = "button",
  onClick,
  disabled = false,
  isActive = false,
  hidden = false,
  className = "lg:min-w-30 md:min-w-20 sm:min-w-20",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        "p-2 h-10  rounded-lg pointer-events-auto text-white dark:text-gray-900",
        isActive
          ? "bg-blue-500"
          : "bg-amber-400 hover:bg-blue-500 cursor-pointer",
        disabled &&
          "bg-gray-500 hover:bg-gray-500 opacity-50 pointer-events-none",
        hidden ? "invisible" : "",
        className,
      )}
    >
      {children}
    </button>
  );
};
