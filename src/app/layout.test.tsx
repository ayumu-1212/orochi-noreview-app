import { render } from '@testing-library/react'
import { test } from 'vitest'
import RootLayout from './layout'

test('全体レイアウトのテスト', () => {
  // ARRANGE
  // ACT
  render(<RootLayout>なんか全体のコンテンツっぽいもの</RootLayout>)
  // ASSERT
  // 実装した人が書いてね
})
