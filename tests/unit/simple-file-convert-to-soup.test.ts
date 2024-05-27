import test from "ava"
import { parseKicadModToKicadJson } from "src/parse-kicad-mod-to-kicad-json"
import { getTestFixture } from "tests/fixtures/get-test-fixture"
import { exampleFile } from "./example-file"
import { su } from "@tscircuit/soup-util"
import { convertKicadJsonToTsCircuitSoup } from "src/convert-kicad-json-to-tscircuit-soup"

test("convert simple file", async (t) => {
  const fixture = await getTestFixture(t)
  const parse_result = parseKicadModToKicadJson(exampleFile)
  const soup = await convertKicadJsonToTsCircuitSoup(parse_result)

  t.is(su(soup).pcb_smtpad.list().length, 1)

  const smtpad = su(soup).pcb_smtpad.list()[0]!

  t.is(smtpad.shape === "rect" && smtpad.width, 0.5)

  await fixture.logSoup(soup)
})
