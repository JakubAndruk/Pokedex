import { Placeholder } from "../../shared/Placeholder";

export const ArenaPlaceholder = () => {
  return (
    <Placeholder
      className={
        "w-65 h-86 p-2 relative flex flex-col items-center justify-center"
      }
    >
      Kliknij ⚔︎ na stronie, pokemona, aby dodać do Areny.
    </Placeholder>
  );
};
