import { BlockContentProps } from './block'

export const openBlocks = (
  blocks: BlockContentProps[][],
  y: number,
  x: number,
  maxY: number,
  maxX: number,
): BlockContentProps[][] => {
  let thisBlocks = blocks
  thisBlocks[y][x].open = true
  if (thisBlocks[y][x].aroundSum > 0) {
    return thisBlocks
  }
  // 北
  if (0 < y && !thisBlocks[y - 1][x].open) {
    thisBlocks = openBlocks(thisBlocks, y - 1, x, maxY, maxX)
  }
  // 北東
  if (0 < y && x < maxX && !thisBlocks[y - 1][x + 1].open) {
    thisBlocks = openBlocks(thisBlocks, y - 1, x + 1, maxY, maxX)
  }
  // 東
  if (x < maxX && !thisBlocks[y][x + 1].open) {
    thisBlocks = openBlocks(thisBlocks, y, x + 1, maxY, maxX)
  }
  // 南東
  if (y < maxY && x < maxX && !thisBlocks[y + 1][x + 1].open) {
    thisBlocks = openBlocks(thisBlocks, y + 1, x + 1, maxY, maxX)
  }
  // 南
  if (y < maxY && !thisBlocks[y + 1][x].open) {
    thisBlocks = openBlocks(thisBlocks, y + 1, x, maxY, maxX)
  }
  // 南西
  if (y < maxY && 0 < x && !thisBlocks[y + 1][x - 1].open) {
    thisBlocks = openBlocks(thisBlocks, y + 1, x - 1, maxY, maxX)
  }
  // 西
  if (0 < x && !thisBlocks[y][x - 1].open) {
    thisBlocks = openBlocks(thisBlocks, y, x - 1, maxY, maxX)
  }
  // 西
  if (0 < y && 0 < x && !thisBlocks[y - 1][x - 1].open) {
    thisBlocks = openBlocks(thisBlocks, y - 1, x - 1, maxY, maxX)
  }
  return thisBlocks
}
