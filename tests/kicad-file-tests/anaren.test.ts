import test from "ava";
import { parseKicadModToTscircuitSoup } from "src";
import { getTestFixture } from "tests/fixtures/get-test-fixture";

test("Anaren_0805_2012Metric-6.kicad_mod", async (t) => {
  const fixture = await getTestFixture(t);
  const fileContent = fixture.getKicadFile(
    "Anaren_0805_2012Metric-6.kicad_mod",
  );

  const soup = await parseKicadModToTscircuitSoup(fileContent);

  await fixture.logSoup(soup);
  t.pass();
});
