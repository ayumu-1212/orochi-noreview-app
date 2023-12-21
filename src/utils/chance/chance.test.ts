import { describe, expect, it } from 'vitest'

import { chance } from './'

describe('本当に正しい確率になっているのか、実際に実行することで真心のこもったテストを書く', () => {
  it('10%', () => {
    const TIMES = 10_000_000
    let results = []
    for (let i = -0; i < TIMES; i++) {
      results.push(chance(10))
    }
    // TIMES回実行したうち何パーセントがtrueだったか
    const result = (results.filter((v) => v).length / TIMES) * 100
    expect(result).toBeGreaterThan(9.95)
    expect(result).toBeLessThan(10.05)
  })
})
