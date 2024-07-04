import { v4 as uuidv4 } from "uuid"
import type { KicadModJson } from "./kicad-zod"
import { serializeSExpression } from "./utils/serialize-s-expression"

export const convertKicadJsonToKicadMod = (kicadJson: KicadModJson): string => {
	const sexpr: any[] = [
		"footprint",
		kicadJson.footprint_name ?? "Adafruit_Feather",
		["version", kicadJson.version ?? 20240108],
		["generator", kicadJson.generator ?? "pcbnew"],
		["generator_version", kicadJson.generator_version ?? "8.0"],
		["layer", kicadJson.layer ?? "F.Cu"],
		[
			"descr",
			kicadJson.descr ??
				"Common footprint for the Adafruit Feather series of boards, https://learn.adafruit.com/adafruit-feather/feather-specification",
		],
		["tags", kicadJson.tags ?? "Adafruit Feather"],
		...(kicadJson.properties
			? kicadJson.properties.map((p) => [
					"property",
					p.key,
					p.val,
					p.attributes?.at && ["at", ...p.attributes.at],
					["unlocked", "yes"],
					p.attributes?.layers && ["layer", p.attributes.layers[0]],
					["hide", "yes"],
					p.attributes?.uuid && ["uuid", p.attributes.uuid],
					[
						"effects",
						[
							"font",
							p.attributes?.size && ["size", ...p.attributes.size],
							["thickness", 0.15],
						],
					],
				])
			: []),
		["clearance", 0.2],
		["attr", "through_hole"],
		...(kicadJson.fp_lines.length > 0
			? kicadJson.fp_lines.map((line) => [
					"fp_line",
					line.start && ["start", ...line.start],
					line.end && ["end", ...line.end],
					line.stroke && [
						"stroke",
						line.stroke.width && ["width", line.stroke.width],
						line.stroke.type && ["type", line.stroke.type],
					],
					["layer", line.layer],
					line.uuid && ["uuid", line.uuid],
				])
			: []),
		...(kicadJson.fp_arcs.length > 0
			? kicadJson.fp_arcs.map((arc) => [
					"fp_arc",
					arc.start && ["start", ...arc.start],
					arc.mid && ["mid", ...arc.mid],
					arc.end && ["end", ...arc.end],
					arc.stroke && [
						"stroke",
						arc.stroke.width && ["width", arc.stroke.width],
						arc.stroke.type && ["type", arc.stroke.type],
					],
					["layer", arc.layer],
					arc.uuid && ["uuid", arc.uuid],
				])
			: []),
		...(kicadJson.fp_texts.length > 0
			? kicadJson.fp_texts.map((text) => [
					"fp_text",
					text.fp_text_type,
					text.text,
					text.at && ["at", ...text.at],
					["layer", text.layer],
					["uuid", text.uuid ?? uuidv4()],
					text.effects && [
						"effects",
						[
							"font",
							text.effects.font?.size && ["size", ...text.effects.font.size],
							["thickness", text.effects.font?.thickness ?? 0.15],
						],
					],
				])
			: []),
		...(kicadJson.pads.length > 0
			? kicadJson.pads.map((pad) => [
					"pad",
					pad.name,
					pad.pad_type,
					pad.pad_shape ?? "oval",
					pad.at && ["at", ...pad.at],
					pad.size && ["size", ...pad.size],
					["drill", 1, ["offset", 0.3, 0]],
					pad.layers && ["layers", ...pad.layers],
					["remove_unused_layers", "no"],
					["uuid", pad.uuid ?? uuidv4()],
				])
			: []),
		[
			"model",
			`{KICAD8_3DMODEL_DIR}/Module.3dshapes/${kicadJson.footprint_name}.wrl`,
			["offset", ["xyz", 0, 0, 0]],
			["scale", ["xyz", 1, 1, 1]],
			["rotate", ["xyz", 0, 0, 0]],
		],
	].filter(Boolean)

	return serializeSExpression(sexpr)
}
