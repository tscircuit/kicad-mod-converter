import test from "ava"
import { parseKicadModToTscircuitSoup } from "src"
import { getTestFixture } from "tests/fixtures/get-test-fixture"

test("Heatsink_AAVID_576802B03900G.kicad_mod", async (t) => {
  const fixture = await getTestFixture(t)
  const fileContent = fixture.getKicadFile(
    "Heatsink_AAVID_576802B03900G.kicad_mod",
  )

  const soup = await parseKicadModToTscircuitSoup(fileContent)

  console.log(JSON.stringify(soup))
  await fixture.logSoup(soup)
  t.pass()
})