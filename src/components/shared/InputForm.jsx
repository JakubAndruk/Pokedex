import clsx from "clsx";

export const InputForm = ({ id, type, errors, register, children }) => {
  return (
    <div className="relative">
      <div className="relative flex justify-center items-center gap-4">
        <label htmlFor={id} className="flex w-90 justify-end">
          {children}
        </label>
        <input
          id={id}
          type={type}
          {...register(id)}
          className="relative flex w-90 bg-gray-300  rounded-lg p-2"
        />
        {errors[id] && (
          <p
            className={clsx(
              "absolute flex justify-end ml-98 text-red-800 w-62 ",
            )}
          >
            {errors[id].message}
          </p>
        )}
      </div>
    </div>
  );
};
