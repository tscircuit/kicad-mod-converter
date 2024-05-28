import type { KicadModJson } from "./kicad-zod"
import type { AnySoupElement } from "@tscircuit/soup"
import { createProjectBuilder } from "@tscircuit/builder"

export const convertKicadLayerToTscircuitLayer = (kicadLayer: string) => {
  switch (kicadLayer) {
    case "F.Cu":
      return "top"
    case "B.Cu":
      return "bottom"
  }
}

export const convertKicadJsonToTsCircuitSoup = async (
  kicadJson: KicadModJson
): Promise<AnySoupElement[]> => {
  const { fp_lines, fp_texts, pads, footprint_name } = kicadJson

  const pb = createProjectBuilder()

  pb.add("component", (cb) => {
    for (const pad of pads) {
      cb.footprint.add("smtpad", (pb) =>
        pb
          .setProps({
            x: pad.at[0],
            y: pad.at[1],
            // ??? @tscircuit/builder bug? width and height are not recognized
            width: pad.size[0],
            height: pad.size[1],
            layer: pad.layers?.[0]! as any,
            shape: "rect",
            port_hints: [pad.name],
          })
          .setSize(pad.size[0], pad.size[1])
      )
    }
    for (const fp_line of fp_lines) {
      cb.footprint.add("pcbtrace", (pb) =>
        pb.setProps({
          route: [
            { x: fp_line.start[0], y: fp_line.start[1] },
            { x: fp_line.end[0], y: fp_line.end[1] },
          ],
          layer: convertKicadLayerToTscircuitLayer(fp_line.layer),
          thickness: fp_line.stroke.width,
        })
      )
    }
  })

  const soup = await pb.build()

  return soup as any
}
