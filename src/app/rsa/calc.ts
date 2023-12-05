export function smallestCommons(arr: number[]): number {
  const [min, max] = arr.sort((a, b) => a - b)

  /* minからmaxまでの連番の配列を作成 */
  const range: number[] = Array(max - min + 1) // 引数で渡された数の長さの配列を生成する
    .fill(0) // 配列を0で埋める
    .map((_, i) => i + min) // 第1引数は現在処理中の要素だが，「_」とすることで，その要素を使用しないことを明示．「i」は現在処理中の要素の配列内における添字

  /* 最大公約数の計算関数（ユークリッドのアルゴリズム） */
  const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b))

  /* 最小公倍数の計算関数 */
  const lcm = (a: number, b: number): number => (a * b) / gcd(a, b)

  /* 全ての数の最小公倍数を求める */
  return range.reduce((multiple, curr) => lcm(multiple, curr))
}
