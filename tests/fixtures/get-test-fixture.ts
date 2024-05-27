import type { ExecutionContext } from "ava"
import type { KicadFilePath } from "./kicad-file-paths"
import { readFileSync } from "node:fs"

export const getTestFixture = (t: ExecutionContext) => {
  return {
    getKicadFile: (path: KicadFilePath) => {
      return readFileSync(path, "utf-8")
    },
  }
}
