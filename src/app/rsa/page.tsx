'use client'
import { useState } from 'react'
import { css } from '../../../styled-system/css'
import { smallestCommons } from './calc'

export default function Home() {
  const [p, setP] = useState(0)
  const [q, setQ] = useState(0)
  const [l, setL] = useState(0)

  const calcL = (p: number, q: number) => {
    const l = smallestCommons([p, q])
    setL(l)
  }

  return (
    <main className={mainStyle}>
      <div>
        <span>P = </span>
        <input
          type="number"
          value={p}
          onChange={(e) => setP(Number(e.target.value))}
          placeholder="P"
        />
      </div>
      <div>
        <span>Q = </span>
        <input
          type="number"
          value={q}
          onChange={(e) => setQ(Number(e.target.value))}
          placeholder="Q"
        />
      </div>
      <div>
        <button onClick={() => calcL(p, q)}>
          P-1とQ-1の最小公倍数を求める
        </button>
      </div>
      <div>
        <span>N = </span>
        <span>{l}</span>
      </div>
    </main>
  )
}

const mainStyle = css({
  padding: '10',
  height: '100vh',
  background:
    'linear-gradient(to bottom, transparent, rgb(214, 219, 220)) rgb(255, 255, 255)',
})
