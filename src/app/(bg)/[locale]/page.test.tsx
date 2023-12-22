import { test, vi } from 'vitest'
import { render } from '@testing-library/react'
import Home from './page'

test('トップページを表示する', () => {
  // ARRANGE
  vi.mock('next/font/google', () => ({
    Inter: () => ({
      className: 'dummyClassName',
    }),
  }))
  vi.mock('react-vfx', () => ({
    VFXProvider: ({ children }: any) => <>{children}</>,
    VFXSpan: () => <></>,
  }))
  // ACT
  render(<Home />)
  // ASSERT
  // 実装した人が書いてね
})
