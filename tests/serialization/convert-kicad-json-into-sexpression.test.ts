import test from "ava";
import { parseKicadModToKicadJson } from "src";
import { convertKicadJsonToKicadMod } from "src/convert-kicad-json-to-kicad-mod";
import { getTestFixture } from "tests/fixtures/get-test-fixture";

test("convert kicad json to sexpression", async (t) => {
    const fixture = await getTestFixture(t);

    const fileContent = fixture.getKicadFile("Adafruit_Feather.kicad_mod");

    // console.log("KICAD INPUT:", fileContent);

    const kicadJson = parseKicadModToKicadJson(fileContent);

    // console.log("KICAD JSON:", kicadJson);

    const kicadMod = convertKicadJsonToKicadMod(kicadJson);

    console.log("KICAD MOD OUTPUT", kicadMod);

    t.pass();
});
