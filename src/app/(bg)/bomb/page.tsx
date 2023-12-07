'use client'
import { css } from '../../../../styled-system/css'
import { MineSweeper } from '@/components'

export default function Home() {
  const cols = 9
  const rows = 9
  const bombs = 10
  return (
    <main>
      <div className={boxStyle}>
        <h1 className={h1Style}>マインスイーパー</h1>
        <div className={gameContainerStyle}>
          <MineSweeper cols={cols} rows={rows} bombs={bombs} />
        </div>
      </div>
    </main>
  )
}

const boxStyle = css({
  backgroundColor: 'rgba(255,255,255,0.9)',
  width: '80%',
  maxWidth: '820px',
  padding: '2rem',
  margin: '5em auto',
})

const h1Style = css({
  fontSize: '2xl',
  fontWeight: 'bold',
  textAlign: 'center',
  paddingBottom: '1rem',
})

const gameContainerStyle = css({
  display: 'flex',
  justifyContent: 'center',
})
