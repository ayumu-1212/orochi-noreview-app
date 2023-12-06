/* 最大公約数の計算関数（ユークリッドのアルゴリズム） */
export const gcd = (a: number, b: number): number =>
  b === 0 ? a : gcd(b, a % b)

/* 最小公倍数の計算関数 */
export const lcm = (a: number, b: number): number => (a * b) / gcd(a, b)
