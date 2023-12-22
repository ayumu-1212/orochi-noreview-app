import { render } from '@testing-library/react'
import { test } from 'vitest'
import Home from './page'

class AudioContextStub {
  constructor() {}
  public createAnalyser() {
    return {}
  }
}

test('鏡のテスト', () => {
  // ARRANGE
  window.AudioContext = AudioContextStub as any
  // ACT
  render(<Home />)
  // ASSERT
  // 実装した人が書いてね
})
