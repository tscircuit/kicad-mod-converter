import test from "ava"
import { parseKicadModToTscircuitSoup } from "src"
import { getTestFixture } from "tests/fixtures/get-test-fixture"

const kicadFile = "Symbol_ESD-Logo-Text_CopperTop.kicad_mod" as const
test(kicadFile, async (t) => {
  const fixture = await getTestFixture(t)
  const fileContent = fixture.getKicadFile(kicadFile)

  const soup = await parseKicadModToTscircuitSoup(fileContent)

  await fixture.logSoup(soup)
  t.pass()
})
