import { render } from '@testing-library/react'
import { test, vi } from 'vitest'
import BgLayout from './layout'

test('レイアウトのテスト', () => {
  // ARRANGE
  vi.mock('next/font/google', () => ({
    Inter: () => ({
      className: 'dummyClassName',
    }),
  }))
  // ACT
  render(<BgLayout>なんかページの中身っぽいもの</BgLayout>)
  // ASSERT
  // 実装した人が書いてね
})
