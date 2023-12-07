export const getRandoms = (max: number, min: number, len: number) => {
  const output: number[] = []
  while (output.length < len) {
    const random = Math.floor(Math.random() * (max - min + 1)) + min
    if (output.includes(random)) continue
    output.push(random)
  }
  return output
}
