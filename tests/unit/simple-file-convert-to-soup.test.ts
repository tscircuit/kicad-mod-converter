import test from "ava"
import { parseKicadModToKicadJson } from "src/parse-kicad-mod-to-kicad-json"
import { getTestFixture } from "tests/fixtures/get-test-fixture"
import { exampleFile } from "./example-file"
import { convertKicadJsonToTsCircuitSoup } from "src/convert-kicad-json-to-tscircuit-soup"

test("simple file parse", async (t) => {
  const fixture = await getTestFixture(t)
  const parse_result = parseKicadModToKicadJson(exampleFile)
  const soup = await convertKicadJsonToTsCircuitSoup(parse_result)

  console.log(soup)
})
