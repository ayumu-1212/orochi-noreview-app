import { ComponentProps } from 'react'
import { Block, BlockContentProps } from './block'
import { getRandoms } from '@/utils'
import { MineSweeper } from './mine-sweeper'

type Props = ComponentProps<typeof MineSweeper>

export const getInitBlocks = ({ cols, rows, bombs }: Props) => {
  const bombAddresses = getRandoms(cols * rows, 0, bombs)
  const blocks: BlockContentProps[][] = []
  for (let y = 0; y < rows; y++) {
    const row: BlockContentProps[] = []
    for (let x = 0; x < cols; x++) {
      const block: BlockContentProps = {
        open: false,
        bomb: false,
        flag: false,
        aroundSum: 0,
      }
      const thisAddress = y * cols + x
      // その場所がbombか
      if (bombAddresses.includes(thisAddress)) {
        block.bomb = true
      }
      // 北東がbombか
      if (0 < x && bombAddresses.includes(thisAddress + (-rows - 1))) {
        block.aroundSum += 1
      }
      // 北がbombか
      if (bombAddresses.includes(thisAddress - rows)) {
        block.aroundSum += 1
      }
      // 北西がbombか
      if (x < cols - 1 && bombAddresses.includes(thisAddress + (-rows + 1))) {
        block.aroundSum += 1
      }
      // 東がbombか
      if (0 < x && bombAddresses.includes(thisAddress - 1)) {
        block.aroundSum += 1
      }
      // 西がbombか
      if (x < cols - 1 && bombAddresses.includes(thisAddress + 1)) {
        block.aroundSum += 1
      }
      // 南東がbombか
      if (0 < x && bombAddresses.includes(thisAddress + (rows - 1))) {
        block.aroundSum += 1
      }
      // 南がbombか
      if (bombAddresses.includes(thisAddress + rows)) {
        block.aroundSum += 1
      }
      // 南西がbombか
      if (x < cols - 1 && bombAddresses.includes(thisAddress + (rows + 1))) {
        block.aroundSum += 1
      }
      row.push(block)
    }
    blocks.push(row)
  }
  return blocks
}
