export function serializeSExpression(sexp: any) {
	function serialize(sexp: any, level: any) {
		const indent = "  ".repeat(level) // Two spaces for each level of indentation

		if (Array.isArray(sexp)) {
			const serializedArray: any = sexp
				.map((item) => serialize(item, level + 1))
				.join(" ")

			// Check if this is a nested array
			if (sexp.some((item) => Array.isArray(item))) {
				return `\n${indent}(${serializedArray}\n${indent} )`
			}
			return `\n${indent}(${serializedArray})`
		}

		if (typeof sexp === "string") {
			// Escape quotes in strings
			return `"${sexp.replace(/"/g, '\\"')}"`
		}

		return `${sexp}`
	}

	let result = serialize(sexp, 0)

	// Remove quotes from the first word after an opening parenthesis
	result = result.replace(/\(\s*"([^"]+)"\s*/g, "($1 ")

	// Remove quotes from specific words
	const wordsToRemoveQuotes = [
		"through_hole",
		"thru_hole",
		"user",
		"oval",
		"no",
	]
	for (const word of wordsToRemoveQuotes) {
		const regex = new RegExp(`"${word}"`, "g")
		result = result.replace(regex, word)
	}

	// Remove one parenthesis from ((...)) structures
	result = result.replace(/\(\(([^()]+)\)\)/g, "($1)")

	// Remove duplicate opening parentheses
	result = result.replace(/\(\(/g, "(")

	return result.startsWith("\n") ? result.slice(1) : result
}
