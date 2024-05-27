import parseSExpression from "s-expression"

export const parseKicadMod = (fileContent: string) => {
  const kicadSExpr = parseSExpression(fileContent)

  // const footp = kicadSExpr[0]
  const footprintName = kicadSExpr[1].valueOf()

  const properties = kicadSExpr
    .slice(2)
    .filter((row: any[]) => row[0] === "property")
    .map((row: any) => {
      const key = row[1].valueOf()
      const val = row[2].valueOf()
      const attrs = row.slice(3).reduce((acc: any, attrAr: any[]) => {
        const attrKey = attrAr[0].valueOf()
        if (attrAr.length === 2) {
          acc[attrKey] = attrAr[1].valueOf()
        } else {
          acc[attrKey] = attrAr.slice(1)
        }
        return acc
      }, {} as any)
      return {
        key,
        val,
        attrs,
      }
    })

  console.log(kicadSExpr)
}
