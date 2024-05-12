export function add(...value: number[]) {
  return value.reduce((a, b) => a + b, 0)
}