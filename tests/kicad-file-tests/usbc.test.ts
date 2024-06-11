import test from "ava"
import { parseKicadModToTscircuitSoup } from "src"
import { getTestFixture } from "tests/fixtures/get-test-fixture"

test("USB_C_Receptacle_CNCTech_C-ARA1-AK51X.kicad_mod", async (t) => {
  const fixture = await getTestFixture(t)
  const fileContent = fixture.getKicadFile(
    "USB_C_Receptacle_CNCTech_C-ARA1-AK51X.kicad_mod",
  )

  const soup = await parseKicadModToTscircuitSoup(fileContent)

  await fixture.logSoup(soup)
  t.pass()
})
