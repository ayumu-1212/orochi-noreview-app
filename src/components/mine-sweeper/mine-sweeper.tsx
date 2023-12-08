import { css } from '../../../styled-system/css'
import { Block, BlockContentProps } from './block'
import { Smily } from './smily'
import { ElectronicSign } from './electronic-sign'
import { useState, ComponentProps, useEffect } from 'react'
import { getInitBlocks } from './get-init-blocks'
import { openBlocks } from './open-blocks'

type Props = {
  cols: number
  rows: number
  bombs: number
}

type SmilyStatus = ComponentProps<typeof Smily>['status']

export const MineSweeper = ({ cols, rows, bombs }: Props) => {
  const [blocks, setBlocks] = useState<BlockContentProps[][]>([[]])
  const [smilyStatus, setSmilyStatus] = useState<SmilyStatus>('inprogress')
  const [times, setTimes] = useState<number>(0)
  const [flags, setFlags] = useState<number>(0)

  useEffect(() => {
    const initBlocks = getInitBlocks({ cols, rows, bombs })
    setBlocks(initBlocks)
    setSmilyStatus('inprogress')
    setFlags(0)
  }, [times, cols, rows, bombs])

  const handleReset = () => {
    setTimes((prev) => prev + 1)
  }

  const handleFlag = (x: number, y: number) => {
    const tmpBlocks = blocks
    const block = tmpBlocks[y][x]
    if (block.open) return
    const nextBlocks: BlockContentProps[][] = []
    tmpBlocks.forEach((r, ri) => {
      const nextRow: BlockContentProps[] = []
      r.forEach((b, bi) => {
        const tmpB = b
        if (ri === y && bi === x) {
          if (tmpB.flag) {
            tmpB.flag = !tmpB.flag
            setFlags((prev) => prev - 1)
          } else {
            tmpB.flag = !tmpB.flag
            setFlags((prev) => prev + 1)
          }
        }
        nextRow.push(tmpB)
      })
      nextBlocks.push(nextRow)
    })
    setBlocks(nextBlocks)
  }

  const handleOpen = (x: number, y: number) => {
    const tmpBlocks = blocks
    if (tmpBlocks[y][x].open) return
    if (tmpBlocks[y][x].bomb) {
      setSmilyStatus('gameover')
      const overBlocks = tmpBlocks.map((row) =>
        row.map((b) => {
          b.open = true
          return b
        }),
      )
      setBlocks(overBlocks)
      return
    }
    const openedBlocks = openBlocks(tmpBlocks, y, x, rows - 1, cols - 1)
    // ちゃんとコピーしないと反映されない
    let openCount = 0
    const nextBlocks = openedBlocks.map((r) =>
      r.map((b) => {
        if (b.open) openCount++
        return b
      }),
    )
    setBlocks(nextBlocks)
    if (openCount === cols * rows - bombs) {
      setSmilyStatus('clear')
    }
  }

  return (
    <div className={boxStyle}>
      <div className={statusBoxStyle}>
        <ElectronicSign num={flags} />
        <Smily status={smilyStatus} onClick={handleReset} />
        <ElectronicSign num={bombs} />
      </div>
      <div className={gameFieldStyle}>
        {blocks.map((row, y) => {
          return (
            <div key={`row-${y}`} className={gameFieldRowStyle}>
              {row.map((block, x) => {
                return (
                  <Block
                    key={`block-${x}.${y}`}
                    x={x}
                    y={y}
                    onClick={handleOpen}
                    onContextMenu={handleFlag}
                    block={block}
                  />
                )
              })}
            </div>
          )
        })}
      </div>
    </div>
  )
}

const boxStyle = css({
  padding: '1.5rem',
  border: 'solid 2px gray',
  backgroundColor: 'gray.300',
})

const gameFieldStyle = css({
  display: 'flex',
  flexDirection: 'column',
})

const gameFieldRowStyle = css({
  display: 'flex',
  justifyContent: 'center',
})

const statusBoxStyle = css({
  padding: '0.5rem',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-around',
})
