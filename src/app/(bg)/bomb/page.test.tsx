import { render } from '@testing-library/react'
import { test, vi } from 'vitest'
import Home from './page'

test('ボムのテスト', () => {
  // ARRANGE
  vi.mock('next/font/google', () => ({
    Inter: () => ({
      className: 'dummyClassName',
    }),
  }))
  // ACT
  render(<Home />)
  // ASSERT
  // 実装した人が書いてね
})
