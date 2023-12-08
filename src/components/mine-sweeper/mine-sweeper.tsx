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
  const [resets, setResets] = useState<number>(0)
  const [flags, setFlags] = useState<number>(0)
  const [time, setTime] = useState<number>(0)
  const [timeOutId, setTimeOutId] = useState<NodeJS.Timeout>()

  useEffect(() => {
    const initBlocks = getInitBlocks({ cols, rows, bombs })
    setBlocks(initBlocks)
    setSmilyStatus('inprogress')
    setFlags(0)
    setTime(0)
  }, [resets, cols, rows, bombs])

  useEffect(() => {
    const id = setInterval(() => {
      setTime((t) => t + 1)
    }, 1000)
    setTimeOutId(id)
    return () => clearInterval(id)
  }, [resets])

  const handleReset = () => {
    setResets((prev) => prev + 1)
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
      const overBlocks = tmpBlocks.map((row) =>
        row.map((b) => {
          b.open = true
          return b
        }),
      )
      setBlocks(overBlocks)
      clearInterval(timeOutId)
      setSmilyStatus('gameover')
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
      clearInterval(timeOutId)
      setSmilyStatus('clear')
    }
  }

  return (
    <div className={boxStyle}>
      <div className={statusBoxStyle}>
        <ElectronicSign num={bombs - flags} />
        <Smily status={smilyStatus} onClick={handleReset} />
        <ElectronicSign num={time} />
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
