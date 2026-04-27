import clsx from "clsx";

export const WinLoseStats = (data) => {
  return (
    <div
      className={clsx(
        "absolute top-0 left-0 h-16 w-12 p-2 text-sm bg-gray-900 text-gray-100 rounded-br-lg rounded-tl-lg flex flex-col justify-center",
      )}
    >
      <div>W: {data.data.wins}</div>
      <div>L: {data.data.loses}</div>
    </div>
  );
};
