import test from "ava"
import { parseKicadModToTscircuitSoup } from "src"
import { getTestFixture } from "tests/fixtures/get-test-fixture"

test("Balun_Johanson_1.6x0.8mm.kicad_mod", async (t) => {
  const fixture = await getTestFixture(t)
  const fileContent = fixture.getKicadFile("Balun_Johanson_1.6x0.8mm.kicad_mod")

  const soup = await parseKicadModToTscircuitSoup(fileContent)

  await fixture.logSoup(soup)
  t.pass()
})
