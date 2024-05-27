import type { AnySoupElement } from "@tscircuit/soup"
import { parseKicadModToKicadJson } from "./parse-kicad-mod-to-kicad-json"
import { convertKicadJsonToTsCircuitSoup } from "./convert-kicad-json-to-tscircuit-soup"

export const parseKicadModToTscircuitSoup = (
  kicadMod: string
): Promise<AnySoupElement[]> => {
  return convertKicadJsonToTsCircuitSoup(parseKicadModToKicadJson(kicadMod))
}
