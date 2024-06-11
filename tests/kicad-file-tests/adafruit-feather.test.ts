import test from "ava"
import { parseKicadModToTscircuitSoup } from "src"
import { getTestFixture } from "tests/fixtures/get-test-fixture"

test("Adafruit_Feather.kicad_mod", async (t) => {
  const fixture = await getTestFixture(t)
  const fileContent = fixture.getKicadFile("Adafruit_Feather.kicad_mod")

  const soup = await parseKicadModToTscircuitSoup(fileContent)

  await fixture.logSoup(soup)
  t.pass()
})
