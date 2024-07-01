import * as fs from "node:fs"
import { logSoup } from "@tscircuit/log-soup"
import type { AnySoupElement } from "@tscircuit/soup"
import test from "ava"
import { parseKicadModToTscircuitSoup } from "src"
import { convertKicadJsonToKicadMod } from "src/convert-kicad-json-to-kicad-mod"
import { convertTscircuitToKicadJson } from "src/convert-tscircuit-soup-into-kicad-json"
import { getTestFixture } from "tests/fixtures/get-test-fixture"

test("convert tscircuit soup to kicad json", async (t) => {
	const fixture = await getTestFixture(t)

	const fileContent = fixture.getKicadFile("Adafruit_Feather.kicad_mod")

	const soup: AnySoupElement[] = await parseKicadModToTscircuitSoup(fileContent)

	const kicadJson = convertTscircuitToKicadJson(soup)

	const kicadMod = convertKicadJsonToKicadMod(kicadJson)

	await logSoup("convert tscircuit soup to kicad json", soup)

	fs.writeFileSync("debug.kicad_mod", kicadMod)
	t.pass()
})

// npx ava ./tests/serialization/convert-tscircuit-soup-into-kicad-json.test.ts
