import test from "ava"
import { parseKicadModToKicadJson } from "src/parse-kicad-mod-to-kicad-json"
import { getTestFixture } from "tests/fixtures/get-test-fixture"

test("res 0402", async (t) => {
  const fixture = await getTestFixture(t)
  const fileContent = fixture.getKicadFile("R_0402_1005Metric.kicad_mod")

  parseKicadModToKicadJson(fileContent)

  t.pass()
})
