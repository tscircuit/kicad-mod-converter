import { parseKicadModToTscircuitSoup } from "src/parse-kicad-mod-to-tscircuit-soup"
import {
  readFileSync,
  readdirSync,
  writeFileSync,
  mkdirSync,
  existsSync,
} from "node:fs"
import { join, relative, dirname } from "node:path"
import { format } from "prettier"

function normalizeFileNameToVarName(str: string) {
  return str
    .replace(/[^a-zA-Z0-9]/g, "_")
    .replace(/-([a-z])/g, (g: any) => g[1].toUpperCase())
}

async function getTsFileContentFromKicadModFile(kicadModFilePath: string) {
  const kicadModFileContent = readFileSync(kicadModFilePath, "utf-8")
  const fileNameWoExt = kicadModFilePath.split("/").pop()?.split(".")[0]

  const tsCircuitSoup = await parseKicadModToTscircuitSoup(kicadModFileContent)

  const varName = normalizeFileNameToVarName(fileNameWoExt!)

  const tsContent = format(
    `
export const ${varName} = ${JSON.stringify(tsCircuitSoup, null, "  ")};

export default ${varName};
  `.trim(),
    {
      parser: "typescript",
      semi: false,
    },
  )

  return tsContent
}

export const convertKicadDirectoryToTs = async (args: {
  inputDir: string
  outputDir: string
}) => {
  const { inputDir, outputDir } = args

  // Ensure output directory exists
  if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true })
  }

  // 1. Deep scan directory for .kicad_mod files (usually inputDir is a .pretty dir)
  const scanDirectory = (dir: string): string[] => {
    let files: string[] = []
    const entries = readdirSync(dir, { withFileTypes: true })
    for (const entry of entries) {
      const fullPath = join(dir, entry.name)
      if (entry.isDirectory()) {
        files = files.concat(scanDirectory(fullPath))
      } else if (entry.isFile() && entry.name.endsWith(".kicad_mod")) {
        files.push(fullPath)
      }
    }
    return files
  }

  const kicadModFiles = scanDirectory(inputDir).map((fpath) =>
    relative(inputDir, fpath),
  )
  console.log(`Converting ${kicadModFiles.length} kicad_mod files...`)

  // 2. Convert each kicad_mod file to ts and write to output directory with same path
  const exports = await Promise.all(
    kicadModFiles.map(async (file) => {
      const inputFilePath = join(inputDir, file)
      const outputFilePath = join(
        outputDir,
        "converted-kicad-mods",
        `${normalizeFileNameToVarName(file).replace("_kicad_mod", ".ts")}`,
      )

      const tsContent = await getTsFileContentFromKicadModFile(inputFilePath)

      // Ensure the directory for the output file exists
      const outputFileDir = dirname(outputFilePath)
      if (!existsSync(outputFileDir)) {
        mkdirSync(outputFileDir, { recursive: true })
      }

      writeFileSync(outputFilePath, tsContent)

      return {
        varName: normalizeFileNameToVarName(file.split(".")[0]!),
        relativePath: `./${relative(outputDir, outputFilePath)
          .replace(/\\/g, "/")
          .replace(/\.ts$/, "")}`,
      }
    }),
  )

  // 3. Write an "index.ts" file in the output directory that exports all the files
  const indexContent = exports
    .map(
      (exp) =>
        `export { default as ${exp.varName} } from '${exp.relativePath}';`,
    )
    .join("\n")

  writeFileSync(join(outputDir, "index.ts"), indexContent)
}
