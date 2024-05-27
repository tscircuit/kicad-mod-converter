import parseSExpression from "s-expression"

export const parseKicadMod = (fileContent: string) => {
  const parsed = parseSExpression(fileContent)
  console.log(parsed)
}
