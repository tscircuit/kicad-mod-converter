import test from "ava"
import { parseKicadModToTscircuitSoup } from "src"
import { getTestFixture } from "tests/fixtures/get-test-fixture"

test("pulse w3000", async (t) => {
  const fixture = await getTestFixture(t)
  const fileContent = fixture.getKicadFile("Pulse_W3000.kicad_mod")

  const soup = await parseKicadModToTscircuitSoup(fileContent)

  await fixture.logSoup(soup)
  t.pass()
})
