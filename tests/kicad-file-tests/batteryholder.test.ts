import test from "ava";
import { parseKicadModToTscircuitSoup } from "src";
import { getTestFixture } from "tests/fixtures/get-test-fixture";

test("BatteryHolder_Keystone_2468_2xAAA.kicad_mod", async (t) => {
  const fixture = await getTestFixture(t);
  const fileContent = fixture.getKicadFile(
    "BatteryHolder_Keystone_2468_2xAAA.kicad_mod",
  );

  const soup = await parseKicadModToTscircuitSoup(fileContent);

  await fixture.logSoup(soup);
  t.pass();
});
