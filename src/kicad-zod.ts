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
  at: point,
  size: point2,
  layers: z.array(z.string()).optional(),
  roundrect_rratio: z.number().optional(),
  uuid: z.string().optional(),
})

export const kicad_mod_json_def = z.object({
  footprint_name: z.string(),
  pad_type: z.literal("smd"),
  pad_shape: z.literal("roundrect"),
  properties: z.array(property_def),
  pads: z.array(pad_def),
})

export type Point2 = z.infer<typeof point2>
export type Point3 = z.infer<typeof point3>
export type Point = z.infer<typeof point>
export type Attributes = z.infer<typeof attributes_def>
export type Property = z.infer<typeof property_def>
export type Pad = z.infer<typeof pad_def>
export type KicadModJson = z.infer<typeof kicad_mod_json_def>
