import { render, screen } from '@testing-library/react'
import { test } from 'vitest'
import { MineSweeper } from '.'
import userEvent from '@testing-library/user-event'

test('マインスイーパーのコンポーネントテスト', async () => {
  // ARRANGE
  const user = userEvent.setup()
  // ACT
  const { container } = render(<MineSweeper cols={100} rows={100} bombs={1} />)
  const box = container.querySelector(
    'div > div:nth-child(2) > div:nth-child(5) > div:nth-child(5)',
  )!
  await user.pointer({ keys: '[MouseRight]', target: box })
  await user.click(box)

  const resetButton = screen.getByText(/😃|😎|😵/i)
  await user.click(resetButton)
  // ASSERT
})
