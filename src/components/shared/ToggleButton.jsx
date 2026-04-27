import clsx from "clsx";

export const ToggleButton = ({ isOn, onChange }) => {
  return (
    <label>
      <input
        type="checkbox"
        className="sr-only"
        checked={isOn}
        onChange={(e) => {
          onChange?.(e.target.checked);
        }}
      />

      <div
        className={clsx(
          "relative w-12 h-6 rounded-full transition-colors duration-300",
          isOn ? "bg-blue-900" : "bg-blue-500",
        )}
      >
        <div
          className={clsx(
            "absolute top-0.5 w-5 h-5 bg-white rounded-full shadow",
            "transition-transform duration-300",
            isOn ? "translate-x-6.5" : "translate-x-0.5",
          )}
        />
      </div>
    </label>
  );
};
