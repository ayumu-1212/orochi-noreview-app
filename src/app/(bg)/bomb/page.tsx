'use client'
import { MineSweeper } from '@/components'
import { Body, Header, Template } from '@/components/templates/entry'
import { ComponentProps, useState } from 'react'
import useKonami from 'use-konami'
import { css } from '../../../../styled-system/css'

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
    <Template>
      <Header>マインスイーパー</Header>

      <Body>
        <h2>{LEVEL_PROPS[level].name}</h2>
        <div className={gameContainerStyle}>
          <MineSweeper
            cols={LEVEL_PROPS[level].cols}
            rows={LEVEL_PROPS[level].rows}
            bombs={LEVEL_PROPS[level].bombs}
          />
        </div>
      </Body>
    </Template>
  )
}

const gameContainerStyle = css({
  display: 'flex',
  justifyContent: 'center',
  marginBottom: '1.5rem',
})
