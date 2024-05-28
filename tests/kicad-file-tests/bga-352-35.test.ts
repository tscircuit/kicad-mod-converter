import test from "ava"
import { parseKicadModToTscircuitSoup } from "src"
import { getTestFixture } from "tests/fixtures/get-test-fixture"

test("BGA 352_35.0x35.0mm", async (t) => {
  const fixture = await getTestFixture(t)
  const fileContent = fixture.getKicadFile(
    "BGA-352_35.0x35.0mm_Layout26x26_P1.27mm.kicad_mod"
  )

  const soup = await parseKicadModToTscircuitSoup(fileContent)

  t.is(soup.filter((e) => e.type === "pcb_smtpad").length, 352)

  await fixture.logSoup(soup)
  t.pass()
})
