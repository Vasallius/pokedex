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

  if (type2 && type1 in typeWeakness && type2 in typeWeakness) {
    weakness.delete(type1);
    weakness.delete(type2);
  }
  console.log(weakness);
  for (const type of weakness) {
    console.log(type, type1, type2);
    console.log(typeWeakness[type]);
    if (
      typeWeakness[type].includes(type1) ||
      typeWeakness[type].includes(type2)
    ) {
      weakness.delete(type);
    }
  }
  console.log(weakness);

  return Array.from(weakness);
}
