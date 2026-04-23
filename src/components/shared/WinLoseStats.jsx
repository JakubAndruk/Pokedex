import clsx from "clsx";

export const WinLoseStats = (data) => {
  return (
    <div
      className={clsx(
        "absolute top-0 left-0 h-16 w-12 bg-gray-900 text-amber-100",
      )}
    >
      <div>W: {data.data.wins}</div>
      <div>L: {data.data.loses}</div>
    </div>
  );
};
