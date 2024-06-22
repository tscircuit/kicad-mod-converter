import type { KicadModJson } from "./kicad-zod"
import { serializeSExpression } from "./utils/serialize-s-expression"

export const convertKicadJsonToKicadMod = (kicadJson: KicadModJson): string => {
  const sexpr: any[] = [
    "footprint",
    kicadJson.footprint_name,
    kicadJson.version && ["version", kicadJson.version],
  ].filter(Boolean)

  return serializeSExpression(sexpr)
}
