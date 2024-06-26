import type { KicadModJson } from "./kicad-zod";
import { serializeSExpression } from "./utils/serialize-s-expression";

export const convertKicadJsonToKicadMod = (kicadJson: KicadModJson): string => {
	const sexpr: any[] = [
		"footprint",
		kicadJson.footprint_name,
		kicadJson.version && ["version", kicadJson.version],
		kicadJson.generator?.length && ["generator", kicadJson.generator],
		kicadJson.generator_version?.length && [
			"generator_version",
			kicadJson.generator_version,
		],
		kicadJson.layer && ["layer", kicadJson.layer],
		kicadJson.descr.length && ["descr", kicadJson.descr],
		kicadJson.tags && ["tags", kicadJson.tags],
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
		["clearance", 0.2],
		["attr", "through_hole"],
		[
			kicadJson.fp_lines.map((line) => [
				"fp_line",
				["start", line.start[0], line.start[1]],
				["end", line.end[0], line.end[1]],
				["stroke", ["width", line.stroke.width], ["type", line.stroke.type]],
				["layer", line.layer],
				line.uuid && ["uuid", line.uuid],
			]),
		],
		[
			kicadJson.fp_arcs.map((arc) => [
				"fp_arc",
				["start", arc.start[0], arc.start[1]],
				["mid", arc.mid[0], arc.mid[1]],
				["end", arc.end[0], arc.end[1]],
				["stroke", ["width", arc.stroke.width], ["type", arc.stroke.type]],
				["layer", arc.layer],
				arc.uuid && ["uuid", arc.uuid],
			]),
		],
		[
			kicadJson.fp_lines.map((line) => [
				"fp_line",
				["start", line.start[0], line.start[1]],
				["end", line.end[0], line.end[1]],
				["stroke", ["width", line.stroke.width], ["type", line.stroke.type]],
				["layer", line.layer],
				line.uuid && ["uuid", line.uuid],
			]),
		],
		[
			kicadJson.fp_arcs.map((arc) => [
				"fp_arc",
				["start", arc.start[0], arc.start[1]],
				["mid", arc.mid[0], arc.mid[1]],
				["end", arc.end[0], arc.end[1]],
				["stroke", ["width", arc.stroke.width], ["type", arc.stroke.type]],
				["layer", arc.layer],
				arc.uuid && ["uuid", arc.uuid],
			]),
		],
		[
			kicadJson.fp_texts.map((text) => [
				"fp_texts",
				text.fp_text_type,
				text.text,
				[
					"at",
					text.at[2]
						? [text.at[0], text.at[1], text.at[2]]
						: [text.at[0], text.at[1]],
				],
				["layer", text.layer],
				text.uuid && ["uuid", text.uuid],
				[
					"effects",
					[
						"font",
						["size", text.effects.font?.size[0], text.effects.font?.size[1]],
						["thickness", text.effects.font?.thickness],
					],
				],
			]),
		],
		[
			kicadJson.pads.map((pad) => [
				"pad",
				pad.name,
				pad.pad_type,
				pad.pad_shape,
				[
					"at",
					pad.at[2]
						? [pad.at[0], pad.at[1], pad.at[2]]
						: [pad.at[0], pad.at[1]],
				],
				["size", pad.size[0], pad.size[1]],
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
	].filter(Boolean);

	return serializeSExpression(sexpr);
};
