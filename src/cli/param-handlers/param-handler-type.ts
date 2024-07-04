import type prompts from "prompts"

export type ParamHandler = (params: {
  prompts: typeof prompts
  commandPath: string[]
  optionName: string
  ctx: any
}) => Promise<string | null | undefined>
