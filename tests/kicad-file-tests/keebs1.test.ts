import test from "ava";
import { parseKicadModToTscircuitSoup } from "src";
import { getTestFixture } from "tests/fixtures/get-test-fixture";

const fileContent = `
(module Mx_Alps_100 (layer F.Cu) (tedit 5F25CCD9)
  (descr MXALPS)
  (tags MXALPS)
  (fp_text reference >NAME (at 0 4.318) (layer B.SilkS)
    (effects (font (size 1 1) (thickness 0.2)) (justify mirror))
  )
  (fp_text value >VALUE (at 5.334 10.922) (layer B.SilkS) hide
    (effects (font (size 1.524 1.524) (thickness 0.3048)) (justify mirror))
  )
  (fp_line (start -7.62 7.62) (end -7.62 -7.62) (layer Dwgs.User) (width 0.3))
  (pad "" np_thru_hole circle (at 0 0) (size 3.9878 3.9878) (drill 3.9878) (layers *.Cu *.Mask))
  (pad 1 thru_hole oval (at -3.255 -3.52 327.5) (size 2.5 4.75) (drill oval 1.5 3.75) (layers *.Cu *.Mask F.SilkS))
)
`;

test("keebs1", async (t) => {
  const fixture = await getTestFixture(t);

  const soup = await parseKicadModToTscircuitSoup(fileContent);

  await fixture.logSoup(soup);
  t.pass();
});
