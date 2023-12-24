import { render } from '@testing-library/react'
import { test } from 'vitest'
import Home from './page'

class Worker {
  constructor() {}
  terminate() {}
}

test('rsaのテスト', () => {
  // ARRANGE
  window.Worker = Worker as any
  // ACT
  render(<Home />)
  // ASSERT
  // 実装した人が書いてね
})
