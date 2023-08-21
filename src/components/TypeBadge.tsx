import { capitalize } from "../utils/pokemonUtils";

interface TypeBadgeProps {
  typeName: string;
  typeColors: Record<string, string>;
}
export const TypeBadge = ({ typeName, typeColors }: TypeBadgeProps) => {
  return (
    <div
      className="badge text-white mr-2 font-primary [text-shadow:_1px_1px_8px_rgb(0_0_0_/_90%)"
      style={{ backgroundColor: typeColors[typeName.toLowerCase()] }}
    >
      {capitalize(typeName)}
    </div>
  );
};
