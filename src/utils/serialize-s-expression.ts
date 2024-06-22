export function serializeSExpression(sexp: any[]): string {
  function serialize(sexp: any): string {
    if (Array.isArray(sexp)) {
      return `(${sexp.map(serialize).join(" ")})`
    } else if (typeof sexp === "string") {
      // Escape quotes in strings
      return `"${sexp.replace(/"/g, '\\"')}"`
    } else {
      return sexp.toString()
    }
  }

  return serialize(sexp)
}
