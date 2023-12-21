import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { test } from 'vitest'
import { BlockBreaker } from './block-breaker'

test('ブロック崩しのコンポーネントテスト', () => {
  // ARRANGE
  // ACT
  render(<BlockBreaker />)
  // ASSERT
  // 実装した人が書いてね
})

test('ブロック崩しのボタンを色々押す', async () => {
  // ARRANGE
  const user = userEvent.setup()
  // ACT
  render(<BlockBreaker />)
  const mediumButton = await screen.findByRole('button', { name: /Medium/i })
  await user.click(mediumButton)

  const hardButton = await screen.findByRole('button', { name: /Hard/i })
  await user.click(hardButton)

  const extremeButton = await screen.findByRole('button', { name: /Extreme/i })
  for (let i = 0; i < 15; i++) {
    await user.click(extremeButton)
  }

  await user.keyboard('{ArrowLeft}{ArrowLeft}{ArrowRight}{ArrowRight}')

  // ASSERT
  // 実装した人が書いてね
})
