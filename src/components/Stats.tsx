import { capitalize, typeColors } from "../utils/pokemonUtils";

import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

interface Stat {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

type PokemonType = {
  slot: number;
  type: {
    name: string;
  };
};

export const Stat = ({ stat, types }: { stat: Stat; types: PokemonType[] }) => {
  let statName = stat.stat.name;
  if (statName === "special-attack") {
    statName = "sp-Atk";
  } else if (statName === "special-defense") {
    statName = "sp-Def";
  } else if (statName === "hp") {
    statName = "HP";
  } else {
    statName = capitalize(statName);
  }

  return (
    <div className="w-1/2 md:w-1/3 p-2">
      <h2>{capitalize(statName)}</h2>
      <div style={{ width: "50px", height: "50px" }}>
        <CircularProgressbar
          value={stat.base_stat}
          maxValue={255}
          text={`${stat.base_stat}`}
          counterClockwise
          styles={{
            path: {
              stroke: `${typeColors[types[0].type.name]}`,
            },
            text: {
              fill: "white",
              fontSize: "24px",
            },
          }}
        />
      </div>
    </div>
  );
};
