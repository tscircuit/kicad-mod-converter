import parseSExpression from "s-expression"
import {
  attributes_def,
  kicad_mod_json_def,
  pad_def,
  type KicadModJson,
  type Pad,
  type Property,
} from "./kicad-zod"

export const formatAttr = (val: any, attrKey: string) => {
  if (attrKey === "at" || attrKey === "size") {
    return val.map((n: any) => Number.parseFloat(n.valueOf()))
  }
  if (val.length === 2) {
    return val.valueOf()
  }
  if (attrKey === "uuid") {
    return val.valueOf()
  }
  if (!Number.isNaN(Number.parseFloat(val))) {
    return Number.parseFloat(val)
  }
  if (Array.isArray(val)) {
    return val.map((s) => s.valueOf())
  }
  return val
}

export const getAttr = (s: Array<any>, key: string) => {
  for (const elm of s) {
    if (Array.isArray(elm) && elm[0] === key) {
      return formatAttr(elm.slice(1), key)
    }
  }
}

export const parseKicadMod = (fileContent: string): KicadModJson => {
  const kicadSExpr = parseSExpression(fileContent)

  // const footp = kicadSExpr[0]
  const footprintName = kicadSExpr[1].valueOf()

  const properties = kicadSExpr
    .slice(2)
    .filter((row: any[]) => row[0] === "property")
    .map((row: any) => {
      const key = row[1].valueOf()
      const val = row[2].valueOf()
      const attributes = attributes_def.parse(
        row.slice(3).reduce((acc: any, attrAr: any[]) => {
          const attrKey = attrAr[0].valueOf()
          acc[attrKey] = formatAttr(attrAr.slice(1), attrKey)
          return acc
        }, {} as any)
      )

      return {
        key,
        val,
        attributes,
      } as Property
    })

  const padRows = kicadSExpr.slice(2).filter((row: any[]) => row[0] === "pad")

  const pads: Array<Pad> = []

  for (const row of padRows) {
    const at = getAttr(row, "at")
    const size = getAttr(row, "size")
    const layers = getAttr(row, "layers")
    const roundrect_rratio = getAttr(row, "roundrect_rratio")
    const uuid = getAttr(row, "uuid")
    pads.push(
      pad_def.parse({
        name: row[1].valueOf(),
        pad_type: row[2].valueOf(),
        pad_shape: row[3].valueOf(),
        at,
        size,
        layers,
        roundrect_rratio,
        uuid,
      })
    )
  }

  return kicad_mod_json_def.parse({
    footprint_name: footprintName,
    properties,
    pads,
  })
}
