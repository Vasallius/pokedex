interface TypeColors {
  [key: string]: string;
}

export const typeColors: TypeColors = {
  normal: "#A8A878",
  fire: "#F08030",
  water: "#6890F0",
  grass: "#78C850",
  electric: "#F8D030",
  ice: "#98D8D8",
  fighting: "#C03028",
  poison: "#A040A0",
  ground: "#E0C068",
  flying: "#A890F0",
  psychic: "#F85888",
  bug: "#A8B820",
  rock: "#B8A038",
  ghost: "#705898",
  dark: "#705848",
  dragon: "#7038F8",
  steel: "#B8B8D0",
  fairy: "#EE99AC",
  undefined: "red-500",
};
export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function padNumber(number: number): string {
  return number.toString().padStart(3, "0");
}
export const typeWeakness: Record<string, string[]> = {
  Normal: ["Fighting"],
  Fire: ["Water", "Rock", "Ground"],
  Water: ["Electric", "Grass"],
  Electric: ["Ground"],
  Grass: ["Fire", "Ice", "Poison", "Flying", "Bug"],
  Ice: ["Fire", "Fighting", "Rock", "Steel"],
  Fighting: ["Flying", "Psychic", "Fairy"],
  Poison: ["Ground", "Psychic"],
  Ground: ["Water", "Grass", "Ice"],
  Flying: ["Electric", "Ice", "Rock"],
  Psychic: ["Bug", "Ghost", "Dark"],
  Bug: ["Fire", "Flying", "Rock"],
  Rock: ["Water", "Grass", "Fighting", "Ground", "Steel"],
  Ghost: ["Ghost", "Dark"],
  Dragon: ["Ice", "Dragon", "Fairy"],
  Dark: ["Fighting", "Bug", "Fairy"],
  Steel: ["Fire", "Fighting", "Ground"],
  Fairy: ["Poison", "Steel"],
};

export const typeResistances: Record<string, string[]> = {
  Normal: [],
  Fire: ["Fire", "Grass", "Ice", "Bug", "Steel", "Fairy"],
  Water: ["Fire", "Water", "Ice", "Steel"],
  Electric: ["Electric", "Flying", "Steel"],
  Grass: ["Water", "Electric", "Grass", "Ground"],
  Ice: ["Ice"],
  Fighting: ["Bug", "Rock", "Dark"],
  Poison: ["Grass", "Fighting", "Poison", "Bug", "Fairy"],
  Ground: ["Poison", "Rock"],
  Flying: ["Grass", "Fighting", "Bug"],
  Psychic: ["Fighting", "Psychic"],
  Bug: ["Grass", "Fighting", "Ground"],
  Rock: ["Normal", "Fire", "Poison", "Flying"],
  Ghost: ["Poison", "Bug"],
  Dragon: ["Fire", "Water", "Electric", "Grass"],
  Dark: ["Ghost", "Dark"],
  Steel: [
    "Normal",
    "Grass",
    "Ice",
    "Flying",
    "Psychic",
    "Bug",
    "Rock",
    "Dragon",
    "Steel",
    "Fairy",
  ],
  Fairy: ["Fighting", "Bug", "Dark"],
};

export function calculateWeakness(type1: string, type2?: string): string[] {
  let weakness: Set<string> = new Set();
  type1 = capitalize(type1);
  type2 = capitalize(type2 || "");
  if (type1 in typeWeakness) {
    weakness = new Set(typeWeakness[type1]);
  }

  if (type2 && type2 in typeWeakness) {
    weakness = new Set([...weakness, ...typeWeakness[type2]]);
  }

  for (const type of weakness) {
    if (
      typeResistances[type1].includes(type) ||
      (type2 && typeResistances[type2].includes(type))
    ) {
      weakness.delete(type);
    }
  }

  return Array.from(weakness);
}
