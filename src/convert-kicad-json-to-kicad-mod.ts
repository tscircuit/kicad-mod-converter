import type { KicadModJson } from "./kicad-zod"
import { serializeSExpression } from "./utils/serialize-s-expression"

export const convertKicadJsonToKicadMod = (kicadJson: KicadModJson): string => {
	const sexpr: any[] = [
		"footprint",
		kicadJson.footprint_name,
		kicadJson.version && ["version", kicadJson.version],
		kicadJson.generator && ["generator", kicadJson.generator],
		kicadJson.generator_version && [
			"generator_version",
			kicadJson.generator_version,
		],
		kicadJson.layer && ["layer", kicadJson.layer],
		kicadJson.descr && ["descr", kicadJson.descr],
		kicadJson.tags && ["tags", kicadJson.tags],
		kicadJson.properties && [
			kicadJson.properties.map((p) => [
				"property",
				p.key,
				p.val,
				p.attributes.at && ["at", p.attributes.at],
				["unlocked", "yes"],
				// p.attributes.layers && ["layer", p.attributes.layers?.[0]],
				["hide", "yes"],
				p.attributes.uuid && ["uuid", p.attributes.uuid],
				[
					"effects",
					[
						"font",
						// p.attributes.size && ["size", p.attributes.size?.[0]],
					],
				],
			]),
		],
		["clearance", 0.2],
		["attr", "through_hole"],
		kicadJson.fp_lines.length > 0 && [
			kicadJson.fp_lines.map((line) => [
				"fp_line",
				line.start && ["start", line.start[0], line.start[1]],
				line.end && ["end", line.end[0], line.end[1]],
				line.stroke && [
					"stroke",
					line.stroke.width && ["width", line.stroke.width],
					line.stroke.type && ["type", line.stroke.type],
				],
				["layer", line.layer],
				line.uuid && ["uuid", line.uuid],
			]),
		],
		kicadJson.fp_arcs.length > 0 && [
			kicadJson.fp_arcs.map((arc) => [
				"fp_arc",
				arc.start && ["start", arc.start[0], arc.start[1]],
				arc.mid && ["mid", arc.mid[0], arc.mid[1]],
				arc.end && ["end", arc.end[0], arc.end[1]],
				arc.stroke && [
					"stroke",
					arc.stroke.width && ["width", arc.stroke.width],
					arc.stroke.type && ["type", arc.stroke.type],
				],
				["layer", arc.layer],
				arc.uuid && ["uuid", arc.uuid],
			]),
		],
		kicadJson.fp_lines.length > 0 && [
			kicadJson.fp_lines.map((line) => [
				"fp_line",
				line.start && ["start", line.start[0], line.start[1]],
				line.end && ["end", line.end[0], line.end[1]],
				line.stroke && [
					"stroke",
					line.stroke.width && ["width", line.stroke.width],
					line.stroke.type && ["type", line.stroke.type],
				],
				["layer", line.layer],
				line.uuid && ["uuid", line.uuid],
			]),
		],
		kicadJson.fp_arcs.length > 0 && [
			kicadJson.fp_arcs.map((arc) => [
				"fp_arc",
				arc.start && ["start", arc.start[0], arc.start[1]],
				arc.mid && ["mid", arc.mid[0], arc.mid[1]],
				arc.end && ["end", arc.end[0], arc.end[1]],
				arc.stroke && [
					"stroke",
					arc.stroke.width && ["width", arc.stroke.width],
					arc.stroke.type && ["type", arc.stroke.type],
				],
				["layer", arc.layer],
				arc.uuid && ["uuid", arc.uuid],
			]),
		],
		kicadJson.fp_texts.length > 0 && [
			kicadJson.fp_texts.map((text) => [
				"fp_texts",
				text.fp_text_type,
				text.text,
				text.at && [
					"at",
					text.at[2]
						? [text.at[0], text.at[1], text.at[2]]
						: [text.at[0], text.at[1]],
				],
				["layer", text.layer],
				text.uuid && ["uuid", text.uuid],
				text.effects && [
					"effects",
					[
						"font",
						text.effects.font?.size && [
							"size",
							text.effects.font?.size[0],
							text.effects.font?.size[1],
						],
						["thickness", text.effects.font?.thickness],
					],
				],
			]),
		],
		kicadJson.pads.length > 0 && [
			kicadJson.pads.map((pad) => [
				"pad",
				pad.name,
				pad.pad_type,
				pad.pad_shape,
				pad.at && [
					"at",
					pad.at[2]
						? [pad.at[0], pad.at[1], pad.at[2]]
						: [pad.at[0], pad.at[1]],
				],
				pad.size && ["size", pad.size[0], pad.size[1]],
				["drill", 1, pad.drill?.offset && ["offset", pad.drill?.offset]],
				pad.layers && ["layers", pad.layers?.map((layer) => layer)],
				["remove_unused_layers", "no"],
				pad.uuid && ["uuid", pad.uuid],
			]),
		],
		[
			"model",
			`{KICAD8_3DMODEL_DIR}/Module.3dshapes/${kicadJson.footprint_name}.wrl`,
			["offset", ["xyz", [0, 0, 0]]],
			["scale", ["xyz", [1, 1, 1]]],
			["rotate", ["xyz", [0, 0, 0]]],
		],
	].filter(Boolean)

	return serializeSExpression(sexpr)
}
