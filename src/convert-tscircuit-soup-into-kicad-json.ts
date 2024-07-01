import type { KicadModJson } from "./kicad-zod"

export const convertTscircuitToKicadJson = (soup: any): KicadModJson => {
	const kicadJson: any = {
		fp_lines: [],
		fp_texts: [],
		fp_arcs: [],
		pads: [],
	}

	const pcbs = soup.filter((component: any) => component.type.startsWith("pcb"))

	for (const pcb of pcbs) {
		if (pcb.type.includes("plated_hole")) {
			const newPad = {
				name: pcb.port_hints[0],
				pad_type: "thru_hole",
				at: [pcb.x, pcb.y],
				size: [pcb.outer_diameter, pcb.outer_diameter - pcb.hole_diameter],
				layers: [pcb.layers[0], pcb.layers[1]],
			}

			kicadJson.pads.push(newPad)
		} else if (pcb.type.includes("silkscreen_text")) {
			const newText = {
				fp_text_type: "user",
				text: pcb.text,
				layer: pcb.layer,
				thickness: pcb.thickness,
				at: [pcb.anchor_position.x, pcb.anchor_position.y],
				effects: { font: { size: [pcb.font_size, pcb.font_size] } },
			}

			kicadJson.fp_texts.push(newText)
		}
	}

	return kicadJson
}
