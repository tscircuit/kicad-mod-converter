import { interactForLocalDirectory } from "./interact-for-local-directory"
import type { ParamHandler } from "./param-handler-type"

export const PARAM_HANDLERS_BY_PARAM_NAME: Record<string, ParamHandler> = {
  input_dir: interactForLocalDirectory,
  output_dir: interactForLocalDirectory,
}
