import test from "ava"
import { parseKicadModToKicadJson } from "src/parse-kicad-mod-to-kicad-json"
import { getTestFixture } from "tests/fixtures/get-test-fixture"
import { exampleFile } from "./example-file"

test("simple file parse", async (t) => {
  const fixture = await getTestFixture(t)
  const result = parseKicadModToKicadJson(exampleFile)

  t.is(result.pads.length, 1)
  t.is(result.fp_texts.length, 1)
  t.is(result.fp_lines.length, 1)
})
