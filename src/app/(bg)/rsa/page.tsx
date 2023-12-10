'use client'
import { useState } from 'react'
import { css } from '../../../../styled-system/css'
import { gcd, lcm } from '@/utils'

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
      <div className={boxStyle}>
        <h1 className={h1Style}>RSA暗号を作ってみよう</h1>
        <h2 className={h2Style}>公開鍵と秘密鍵を作る</h2>
        <section className={sectionStyle}>
          <h3 className={h3Style}>互いに素なPとQを入力してください</h3>
          <p className={pStyle}>
            <span>P = </span>
            <input
              type="number"
              value={p}
              className={inputNumberStyle}
              onChange={(e) => setP(Number(e.target.value))}
            />
            <span>, Q = </span>
            <input
              type="number"
              value={q}
              className={inputNumberStyle}
              onChange={(e) => setQ(Number(e.target.value))}
            />
          </p>
          <h3 className={h3Style}>N = P * Q を行います</h3>
          <p className={pStyle}>
            <span>N = </span>
            <span>{n || '?'} </span>
            <button onClick={() => calcN(p, q)} className={buttonStyle}>
              Nを計算
            </button>
          </p>
          <h3 className={h3Style}>L = P-1とQ-1の最小公倍数 になります</h3>
          <p className={pStyle}>
            <span>L = </span>
            <span>{l || '?'} </span>
            <button onClick={() => calcL(p, q)} className={buttonStyle}>
              Lを計算
            </button>
          </p>
          <h3 className={h3Style}>
            EとLの最大公約数が1となるようなEを選びます
          </h3>
          <p className={pStyle}>
            <button onClick={() => proposalE(l)} className={buttonStyle}>
              Eの候補を出す
            </button>
          </p>
          <p className={pStyle}>
            <span>Eの候補: </span>
            <span>{es.join(', ')}</span>
          </p>
          <p className={pStyle}>
            <span>E = </span>
            <select
              value={e}
              className={inputSelectStyle}
              onChange={(e) => setE(Number(e.target.value))}
            >
              <option key={0} value={0}>
                Eを選ぶ
              </option>
              {es.map((e) => (
                <option key={e} value={e}>
                  {e}
                </option>
              ))}
            </select>
          </p>
          <h3 className={h3Style}>D * E % L が 1 となるようなDを選びます</h3>
          <p className={pStyle}>
            <button onClick={() => proposalD(e, l)} className={buttonStyle}>
              Dの候補を出す
            </button>
          </p>
          <p className={pStyle}>
            <span>Dの候補: </span>
            <span>{ds.join(', ')}</span>
          </p>
          <p className={pStyle}>
            <span>D = </span>
            <select
              value={d}
              className={inputSelectStyle}
              onChange={(e) => setD(Number(e.target.value))}
            >
              <option key={0} value={0}>
                Dを選ぶ
              </option>
              {ds.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </p>
          <h3 className={h3Style}>
            上記で作った E と D と N の組み合わせが鍵となります
          </h3>
          <p className={pStyle}>{`公開鍵 = {E, N} = {${e}, ${n}}`}</p>
          <p className={pStyle}>{`秘密鍵 = {D, N} = {${d}, ${n}}`}</p>
        </section>
        <h2 className={h2Style}>暗号化する</h2>
        <section className={sectionStyle}>
          <h3 className={h3Style}>暗号化して送りたい数字を入力します</h3>
          <p className={pStyle}>
            <span>送りたい数字 = </span>
            <input
              type="number"
              value={send}
              className={inputNumberStyle}
              onChange={(e) => setSend(Number(e.target.value))}
            />
          </p>
          <h3 className={h3Style}>
            「送りたい数字^E mod N 」が暗号化された数字になります
          </h3>
          <p className={pStyle}>
            <span>暗号文 = </span>
            <span>{encry} </span>
            <button onClick={() => encrypt(send, e, n)} className={buttonStyle}>
              暗号化
            </button>
          </p>
        </section>
        <h2 className={h2Style}>復号化する</h2>
        <section className={sectionStyle}>
          <h3 className={h3Style}>
            「暗号文^D mod N」が復号化された数字になります
          </h3>
          <p className={pStyle}>
            <span>復号化した数字 = </span>
            <span>{decry} </span>
            <button
              onClick={() => decrypt(encry, d, n)}
              className={buttonStyle}
            >
              復号化
            </button>
          </p>
        </section>
        <div className={linkWrapperStyle}>
          <a href="../" className={linkStyle}>
            トップへ
          </a>
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

const sectionStyle = css({
  paddingBottom: '2rem',
  paddingLeft: '1rem',
})

const h1Style = css({
  fontSize: '2xl',
  fontWeight: 'bold',
  textAlign: 'center',
  paddingBottom: '1rem',
})

const h2Style = css({
  fontSize: 'xl',
  fontWeight: 'bold',
  paddingBottom: '0.5rem',
  _before: { content: '"■ "' },
})

const h3Style = css({
  fontSize: 'md',
  fontWeight: 'bolder',
  paddingTop: '1rem',
  paddingBottom: '0.5rem',
})

const pStyle = css({
  paddingBottom: '0.5rem',
})

const inputNumberStyle = css({
  borderBottom: 'solid 2px green',
  width: '3rem',
  textAlign: 'right',
})

const inputSelectStyle = css({
  borderBottom: 'solid 2px green',
  textAlign: 'right',
})

const buttonStyle = css({
  // border: '1px solid #333',
  borderRadius: 'sm',
  padding: '0.25rem',
  cursor: 'pointer',
  backgroundColor: 'rgba(0,128,0,0.4)',
  _hover: { backgroundColor: 'rgba(0,128,0,0.2)' },
})

const linkWrapperStyle = css({
  display: 'flex',
  justifyContent: 'center',
})

const linkStyle = css({
  textDecoration: 'underline',
  _hover: {
    color: 'green',
  },
})
