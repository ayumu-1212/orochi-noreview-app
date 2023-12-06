'use client'
import { useState } from 'react'
import { css } from '../../../../styled-system/css'
import { gcd, lcm } from './calc'

export default function Home() {
  const [p, setP] = useState<number>(17)
  const [q, setQ] = useState<number>(19)
  const [n, setN] = useState<number>(0)
  const [l, setL] = useState<number>(0)
  const [es, setEs] = useState<number[]>([])
  const [e, setE] = useState<number>(0)
  const [ds, setDs] = useState<number[]>([])
  const [d, setD] = useState<number>(0)
  const [send, setSend] = useState<number>(0)
  const [encry, setEncry] = useState<number>(0)
  const [decry, setDecry] = useState<number>(0)

  const calcN = (p: number, q: number) => {
    const n = p * q
    setN(n)
  }
  const calcL = (p: number, q: number) => {
    const l = lcm(p - 1, q - 1)
    setL(l)
  }
  const proposalE = (l: number) => {
    const tmpEs: number[] = []
    for (let e = 2; e < l; e++) {
      if (gcd(e, l) === 1) {
        tmpEs.push(e)
      }
    }
    setEs(tmpEs)
  }
  const proposalD = (e: number, l: number) => {
    const tmpDs: number[] = []
    for (let d = 2; d < l; d++) {
      if ((e * d) % l === 1) {
        tmpDs.push(d)
      }
    }
    setDs(tmpDs)
  }
  const encrypt = (send: number, e: number, n: number) => {
    const modSend = send % n
    let enc = 1
    for (let i = 0; i < e; i++) {
      enc = (enc * modSend) % n
    }
    setEncry(enc)
  }
  const decrypt = (encry: number, d: number, n: number) => {
    const modEncry = encry % n
    let dec = 1
    for (let i = 0; i < d; i++) {
      dec = (dec * modEncry) % n
    }
    setDecry(dec)
  }

  return (
    <main>
      <h2>公開鍵と秘密鍵を作る</h2>
      <div>
        <span>P = </span>
        <input
          type="number"
          value={p}
          onChange={(e) => setP(Number(e.target.value))}
        />
      </div>
      <div>
        <span>Q = </span>
        <input
          type="number"
          value={q}
          onChange={(e) => setQ(Number(e.target.value))}
        />
      </div>
      <div>
        <button onClick={() => calcN(p, q)} className={buttonStyle}>
          Nに代入
        </button>
      </div>
      <div>
        <span>N = </span>
        <span>{n}</span>
      </div>
      <div>
        <button onClick={() => calcL(p, q)} className={buttonStyle}>
          P-1とQ-1の最小公倍数を求める
        </button>
      </div>
      <div>
        <span>L = </span>
        <span>{l}</span>
      </div>
      <div>
        <button onClick={() => proposalE(l)} className={buttonStyle}>
          EとLの最大公約数が1となるようなEの候補を出す
        </button>
      </div>
      <div>
        <span>Eの候補: </span>
        <span>{es.join(', ')}</span>
      </div>
      <div>
        <span>E = </span>
        <select value={e} onChange={(e) => setE(Number(e.target.value))}>
          <option key={0} value={0}>
            Eを選んでください
          </option>
          {es.map((e) => (
            <option key={e} value={e}>
              {e}
            </option>
          ))}
        </select>
      </div>
      <div>
        <button onClick={() => proposalD(e, l)} className={buttonStyle}>
          EとDの積をLで割った値が1となるようなDを求める
        </button>
      </div>
      <div>
        <span>Dの候補: </span>
        <span>{ds.join(', ')}</span>
      </div>
      <div>
        <span>D = </span>
        <select value={d} onChange={(e) => setD(Number(e.target.value))}>
          <option key={0} value={0}>
            Dを選んでください
          </option>
          {ds.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      </div>
      <div>
        <p>よって</p>
        <p>{`公開鍵 = {E, N} = {${e}, ${n}}`}</p>
        <p>{`秘密鍵 = {D, N} = {${d}, ${n}}`}</p>
      </div>
      <h2>暗号化する</h2>
      <div>
        <span>送りたい数字 = </span>
        <input
          type="number"
          value={send}
          onChange={(e) => setSend(Number(e.target.value))}
        />
      </div>
      <div>
        <button onClick={() => encrypt(send, e, n)} className={buttonStyle}>
          暗号文 = 送りたい数字^E mod N
        </button>
      </div>
      <div>
        <span>暗号文 = </span>
        <span>{encry}</span>
      </div>
      <h2>復号化する</h2>
      <div>
        <button onClick={() => decrypt(encry, d, n)} className={buttonStyle}>
          復号化した数字 = 暗号文^D mod N
        </button>
      </div>
      <div>
        <span>復号化した数字 = </span>
        <span>{decry}</span>
      </div>
      <div>
        <span>送った数字 = </span>
        <span>{send}</span>
      </div>
    </main>
  )
}

const buttonStyle = css({
  border: '1px solid #333',
  padding: '10px',
  cursor: 'pointer',
})
