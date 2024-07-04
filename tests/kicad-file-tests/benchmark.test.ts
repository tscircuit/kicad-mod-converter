import test from "ava"
import { parseKicadModToTscircuitSoup } from "src"
import { getTestFixture } from "tests/fixtures/get-test-fixture"
import kleur from "kleur"
import { kicadFilePaths } from "tests/fixtures/kicad-file-paths"

test("benchmark: read_without_error", async (t) => {
  if (!process.env.RUN_BENCHMARK) {
    t.pass()
    return
  }
  kleur.enabled = true
  const fixture = await getTestFixture(t)
  const allKicadFiles = fixture.getAllKicadFiles()
  const passing: string[] = []
  const failing: string[] = []
  let runCount = 0
  for (const kicadFile of allKicadFiles) {
    runCount += 1
    let passed = true
    try {
      const fileContent = fixture.getKicadFile(kicadFile as any)
      await parseKicadModToTscircuitSoup(fileContent)
      passing.push(kicadFile)
    } catch (e) {
      passed = false
      failing.push(kicadFile)
    }

    console.log(
      `${((passing.length / (failing.length + passing.length)) * 100).toFixed(
        2,
      )}% ${runCount.toString().padStart(5, " ")}/${
        allKicadFiles.length
      } ${(passed ? kleur.green : kleur.red)(kicadFile)}`,
    )
    // Logging doesn't work unless you pause every so often
    if (runCount % 20 === 0) {
      await new Promise((resolve) => setTimeout(resolve, 1))
    }
  }

  console.log("-------------------------------")
  console.log(`BENCHMARK RESULTS "read_without_error"`)
  console.log(
    kleur.yellow(
      `Score: ${((passing.length / allKicadFiles.length) * 100).toFixed(2)}%`,
    ),
  )
  console.log(kleur.green(`Passing: ${passing.length}`))
  console.log(kleur.red(`Failing: ${failing.length}`))
  console.log("-------------------------------")

  for (const failingFile of failing.slice(0, 5)) {
    console.log(kleur.red(fixture.getKicadFilePath(failingFile as any)))
  }

  t.is(failing.length, 0)
})
