export function serializeSExpression(sexp: any[]): string {
	function serialize(sexp: any): string {
		if (Array.isArray(sexp)) {
			return `\n(${sexp.map(serialize).join(" ")})`
		}
		if (typeof sexp === "string") {
			// Escape quotes in strings
			return `"${sexp.replace(/"/g, '\\"')}"`
		}
		return sexp
	}

	return serialize(sexp)
}
