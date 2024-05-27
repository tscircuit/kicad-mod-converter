import type { ExecutionContext } from "ava"
import type { KicadFileName } from "./kicad-file-paths"
import { readFileSync } from "node:fs"
import { readdirSync } from "node:fs"
import { join } from "node:path"

export const getTestFixture = (t: ExecutionContext) => {
  return {
    getKicadFile: (fname: KicadFileName) => {
      // Read kicad directory, find a file path that ends with
      // the provided file name
      const kicadDir = "kicad-footprints"

      // Each kicad file is nested, i.e. kicad-footprints/*.pretty/*.kicad_mod

      const files = readdirSync(kicadDir, { withFileTypes: true }).flatMap(
        (dirent) => {
          if (dirent.isDirectory() && dirent.name.endsWith(".pretty")) {
            const nestedDir = join(kicadDir, dirent.name)
            return readdirSync(nestedDir)
              .filter((file) => file.endsWith(".kicad_mod"))
              .map((file) => join(dirent.name, file))
          }
          return []
        }
      )

      const filePath = files.find((file) => file.endsWith(fname))
      const path = join(kicadDir, filePath!)

      return readFileSync(path, "utf-8")
    },
  }
}
