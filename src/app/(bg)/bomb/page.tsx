'use client'
import { css } from '../../../../styled-system/css'
import { MineSweeper } from '@/components'
import { useState, ComponentProps } from 'react'
import useKonami from 'use-konami'

type LevelPropsType = {
  name: string
} & ComponentProps<typeof MineSweeper>

const LEVEL_PROPS: LevelPropsType[] = [
  {
    name: 'easy',
    cols: 7,
    rows: 7,
    bombs: 5,
  },
  {
    name: 'normal',
    cols: 9,
    rows: 9,
    bombs: 10,
  },
  {
    name: 'difficult',
    cols: 12,
    rows: 12,
    bombs: 20,
  },
]

export default function Home() {
  const [level, setLevel] = useState<number>(0)

  useKonami({
    onUnlock: () => {
      setLevel((prev) => (prev + 1) % 3)
    },
  })
  return (
    <main>
      <div className={boxStyle}>
        <h1 className={h1Style}>マインスイーパー</h1>
        <h2 className={h2Style}>{LEVEL_PROPS[level].name}</h2>
        <div className={gameContainerStyle}>
          <MineSweeper
            cols={LEVEL_PROPS[level].cols}
            rows={LEVEL_PROPS[level].rows}
            bombs={LEVEL_PROPS[level].bombs}
          />
        </div>
      </div>
    </main>
  )
}

const boxStyle = css({
  backgroundColor: 'rgba(255,255,255,0.9)',
  width: '80%',
  maxWidth: '820px',
  paddingTop: '2rem',
  paddingBottom: '5rem',
  margin: '5em auto',
})

const h1Style = css({
  fontSize: '2xl',
  fontWeight: 'bold',
  textAlign: 'center',
  paddingBottom: '0.25rem',
})

const h2Style = css({
  fontSize: 'lg',
  textAlign: 'center',
  paddingBottom: '0.75rem',
  _before: {
    content: '"~ "',
  },
  _after: {
    content: '" ~"',
  },
})

const gameContainerStyle = css({
  display: 'flex',
  justifyContent: 'center',
})
