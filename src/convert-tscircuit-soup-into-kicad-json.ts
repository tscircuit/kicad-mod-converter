import type { AnySoupElement } from "@tscircuit/soup"
import type { KicadModJson } from "./kicad-zod"

export const convertTscircuitToKicadJson = (soup: any): KicadModJson => {
	const kicadJson: any = {
		fp_lines: [],
		fp_texts: [],
		fp_arcs: [],
		pads: [],
	}

	const pcbs: AnySoupElement[] = soup.filter((component: any) =>
		component.type.startsWith("pcb"),
	)

	for (const pcb of pcbs) {
		if (pcb.type.includes("plated_hole")) {
			kicadJson.pads.push(pcb)
		} else if (pcb.type.includes("text")) {
			kicadJson.fp_texts.push(pcb)
		}
	}

	return kicadJson
}
