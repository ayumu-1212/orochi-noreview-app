'use client'
import { useState } from 'react'
import { css } from '../../../../styled-system/css'

export default function Home() {
  // const [p, setP] = useState<number>(17)

  // const calcN = (p: number, q: number) => {
  //   const n = p * q
  //   setN(n)
  // }

  return (
    <main>
      <div className={boxStyle}>
        <h1 className={h1Style}>マインスイーパー</h1>
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
