export const makePoint = (
  p: { x: number; y: number } | [number, number],
): { x: number; y: number } => {
  if (Array.isArray(p)) {
    return { x: p[0], y: p[1] }
  }
  return p
}
