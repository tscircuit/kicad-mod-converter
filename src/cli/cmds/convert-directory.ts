import { parseKicadModToTscircuitSoup } from "src/parse-kicad-mod-to-tscircuit-soup"
import { readFileSync } from "node:fs"

function camelCase(str: string) {
  return str.replace(/-([a-z])/g, (g: any) => g[1].toUpperCase())
}

async function getTsFileContentFromKicadModFile(kicadModFilePath: string) {
  const kicadModFileContent = readFileSync(kicadModFilePath, "utf-8")
  const fileNameWoExt = kicadModFilePath.split("/").pop()?.split(".")[0]

  const tsCircuitSoup = await parseKicadModToTscircuitSoup(kicadModFileContent)

  const varName = camelCase(fileNameWoExt!)

  const tsContent = `
  
export const ${varName} = ${JSON.stringify(tsCircuitSoup, null, "  ")}

export default ${varName}
  
  `.trim()

  return tsContent
}

export const convertDirectory = (args: {
  inputDir: string
  outputDir: string
}) => {
  // 1. Scan directory for .kicad_mod files (usually inputDir is a .pretty dir)
  // 2. Convert each kicad_mod file to ts and write to output directory with
  //    same path
  // 3. Write a "index.ts" file in the output directory that exports all the
  //    of the files
}
