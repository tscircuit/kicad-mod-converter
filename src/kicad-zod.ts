import { z } from "zod"

export const point2 = z.tuple([z.number(), z.number()])
export const point3 = z.tuple([z.number(), z.number(), z.number()])
export const point = z.union([point2, point3])

export const attributes_def = z
  .object({
    at: point,
    size: point2,
    layers: z.array(z.string()),
    roundrect_rratio: z.number(),
    uuid: z.string(),
  })
  .partial()

export const property_def = z.object({
  key: z.string(),
  val: z.string(),
  attributes: attributes_def,
})

export const pad_def = z.object({
  name: z.string(),
  pad_type: z.literal("smd"),
  pad_shape: z.enum(["roundrect", "circle", "rect"]),
  at: point,
  size: point2,
  layers: z.array(z.string()).optional(),
  roundrect_rratio: z.number().optional(),
  uuid: z.string().optional(),
})

export const effects_def = z
  .object({
    font: z.object({
      size: point2,
      thickness: z.number().optional(),
    }),
  })
  .partial()

export const fp_text_def = z.object({
  fp_text_type: z.literal("user"),
  text: z.string(),
  at: point,
  layer: z.string(),
  uuid: z.string(),
  effects: effects_def.partial(),
})

export const fp_line = z.object({
  start: point2,
  end: point2,
  stroke: z.object({
    width: z.number(),
    type: z.string(),
  }),
  layer: z.string(),
  uuid: z.string(),
})

export const kicad_mod_json_def = z.object({
  footprint_name: z.string(),
  version: z.string(),
  generator: z.string(),
  generator_version: z.string(),
  layer: z.string(),
  descr: z.string(),
  tags: z.array(z.string()),
  properties: z.array(property_def),
  fp_lines: z.array(fp_line),
  fp_texts: z.array(fp_text_def),
  pads: z.array(pad_def),
})

export type Point2 = z.infer<typeof point2>
export type Point3 = z.infer<typeof point3>
export type Point = z.infer<typeof point>
export type Attributes = z.infer<typeof attributes_def>
export type Property = z.infer<typeof property_def>
export type Pad = z.infer<typeof pad_def>
export type EffectsObj = z.infer<typeof effects_def>
export type FpText = z.infer<typeof fp_text_def>
export type FpLine = z.infer<typeof fp_line>
export type KicadModJson = z.infer<typeof kicad_mod_json_def>
