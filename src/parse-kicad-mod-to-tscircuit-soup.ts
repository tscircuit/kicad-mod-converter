import type { AnySoupElement } from "@tscircuit/soup";
import { parseKicadModToKicadJson } from "./parse-kicad-mod-to-kicad-json";
import { convertKicadJsonToTsCircuitSoup } from "./convert-kicad-json-to-tscircuit-soup";

export const parseKicadModToTscircuitSoup = async (
  kicadMod: string,
): Promise<AnySoupElement[]> => {
  const kicadJson = parseKicadModToKicadJson(kicadMod);

  const soup = await convertKicadJsonToTsCircuitSoup(kicadJson);
  return soup;
};
