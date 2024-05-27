import parseSExpression from "s-expression"
import {
  attributes_def,
  effects_def,
  kicad_mod_json_def,
  pad_def,
  type EffectsObj,
  type FpLine,
  type FpText,
  type KicadModJson,
  type Pad,
  type Property,
} from "./kicad-zod"

export const formatAttr = (val: any, attrKey: string) => {
  if (attrKey === "effects" && Array.isArray(val)) {
    // val = [ [ 'font', [ 'size', '1', '1' ], [ 'thickness', '0.2' ] ] ]
    const effectsObj: EffectsObj = {}
    for (const elm of val) {
      if (elm[0] === "font") {
        const fontObj: any = {}
        for (const fontElm of elm.slice(1)) {
          if (fontElm.length === 2) {
            fontObj[fontElm[0].valueOf()] = Number.parseFloat(
              fontElm[1].valueOf()
            )
          } else {
            fontObj[fontElm[0].valueOf()] = fontElm
              .slice(1)
              .map((n: any) => Number.parseFloat(n.valueOf()))
          }
        }
        effectsObj.font = fontObj
      }
    }
    return effects_def.parse(effectsObj)
  }
  if (attrKey === "stroke") {
    const strokeObj: any = {}
    for (const strokeElm of val) {
      const strokePropKey = strokeElm[0].valueOf()
      strokeObj[strokePropKey] = formatAttr(strokeElm.slice(1), strokePropKey)
    }
    return strokeObj
  }
  if (
    attrKey === "at" ||
    attrKey === "size" ||
    attrKey === "start" ||
    attrKey === "end"
  ) {
    return val.map((n: any) => Number.parseFloat(n.valueOf()))
  }
  if (val.length === 2) {
    return val.valueOf()
  }
  if (attrKey === "uuid") {
    if (Array.isArray(val)) {
      return val[0].valueOf()
    }
    return val.valueOf()
  }
  if (!Number.isNaN(Number.parseFloat(val))) {
    return Number.parseFloat(val)
  }
  if (Array.isArray(val) && val.length === 1) {
    return val[0].valueOf()
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

  const fp_texts_rows = kicadSExpr
    .slice(2)
    .filter((row: any[]) => row[0] === "fp_text")

  const fp_texts: FpText[] = []

  for (const fp_text_row of fp_texts_rows) {
    const text = fp_text_row[1].valueOf()
    const at = getAttr(fp_text_row, "at")
    const layer = getAttr(fp_text_row, "layer")
    const uuid = getAttr(fp_text_row, "uuid")
    const effects = getAttr(fp_text_row, "effects")

    fp_texts.push({
      fp_text_type: "user",
      text,
      at,
      layer,
      uuid,
      effects,
    })
  }

  const fp_lines: FpLine[] = []

  const fp_lines_rows = kicadSExpr
    .slice(2)
    .filter((row: any[]) => row[0] === "fp_line")

  for (const fp_line_row of fp_lines_rows) {
    const start = getAttr(fp_line_row, "start")
    const end = getAttr(fp_line_row, "end")
    const stroke = getAttr(fp_line_row, "stroke")
    const layer = getAttr(fp_line_row, "layer")
    const uuid = getAttr(fp_line_row, "uuid")

    fp_lines.push({
      start,
      end,
      stroke,
      layer,
      uuid,
    })
  }

  return kicad_mod_json_def.parse({
    footprint_name: footprintName,
    properties,
    fp_lines,
    fp_texts,
    pads,
  })
}
