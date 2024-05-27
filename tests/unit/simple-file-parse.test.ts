import test from "ava"
import { parseKicadMod } from "src"
import { getTestFixture } from "tests/fixtures/get-test-fixture"

const exampleFile = `
(footprint "EXAMPLE_FOOTPRINT"
	(version 20240209)
	(generator "pcbnew")
	(generator_version "8.0")
	(layer "F.Cu")
	(descr "Example Footprint")
	(tags "resistor")
	(property "Reference" "REF**"
		(at 0 -1.00 0)
		(layer "F.SilkS")
		(uuid "00000000-0000-0000-0000-000000000000")
		(effects
			(font
				(size 1 1)
				(thickness 0.2)
			)
		)
	)
	(property "Value" "example_footprint"
		(at 0 1.20 0)
		(layer "F.Fab")
		(uuid "00000000-0000-0000-0000-000000000000")
		(effects
			(font
				(size 1 1)
				(thickness 0.15)
			)
		)
	)
	(property "Footprint" ""
		(at 0 0 0)
		(unlocked yes)
		(layer "F.Fab")
		(hide yes)
		(uuid "00000000-0000-0000-0000-000000000000")
		(effects
			(font
				(size 1.00 1.00)
			)
		)
	)
	(property "Description" "Example Description"
		(at 0 0 0)
		(unlocked yes)
		(layer "F.Fab")
		(hide yes)
		(uuid "00000000-0000-0000-0000-000000000000")
		(effects
			(font
				(size 1.00 1.00)
			)
		)
	)
	(attr smd)
	(fp_line
		(start 0 1)
		(end 1 1)
		(stroke
			(width 0.1)
			(type solid)
		)
		(layer "F.Fab")
		(uuid "00000000-0000-0000-0000-000000000000")
	)
	(fp_text user "HELLO WORLD"
		(at 0 0 0)
		(layer "F.Fab")
		(uuid "00000000-0000-0000-0000-000000000000")
		(effects
			(font
				(size 0.5 0.5)
				(thickness 0.05)
			)
		)
	)
	(pad "1" smd roundrect
		(at -0.51 0)
		(size 0.54 0.64)
		(layers "F.Cu" "F.Paste" "F.Mask")
		(roundrect_rratio 0.25)
		(uuid "00000000-0000-0000-0000-000000000000")
	)
)`

test("simple file parse", async (t) => {
  const fixture = await getTestFixture(t)

  const result = parseKicadMod(exampleFile)

  console.log(result)
})
