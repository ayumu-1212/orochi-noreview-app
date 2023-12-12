/**
 * 0%から100%までを引数として受け取り、引数の確率でtrueを返す
 * @param probability 確率
 */
export const chance = (probability: number) => {
  if (probability < 0 || probability > 100) {
    throw new Error('0から100まで！')
  }

  return Math.random() * 100 < probability
}
