'use client'
import { useEffect, useState } from 'react'
import { PythonProvider, usePython } from 'react-py'
import { css } from '../../../../../styled-system/css'
import {
  calc_decript,
  calc_encript,
  calc_l,
  calc_n,
  calc_proposal_d,
  calc_proposal_e,
} from '@/app/libs/rsa.py'
import { Body, Header, Template } from '@/components/templates/entry'

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
  const [target, setTarget] = useState<
    'n' | 'l' | 'es' | 'ds' | 'encry' | 'decry' | ''
  >('')

  const { runPython, stdout, stderr, isLoading, isRunning } = usePython()

  useEffect(() => {
    if (!isRunning) {
      switch (target) {
        case 'n':
          setN(Number(stdout))
          return
        case 'l':
          setL(Number(stdout))
          return
        case 'es':
          setEs(
            stdout
              .replace('[', '')
              .replace(']', '')
              .split(',')
              .map((i) => Number(i)),
          )
          return
        case 'ds':
          setDs(
            stdout
              .replace('[', '')
              .replace(']', '')
              .split(',')
              .map((i) => Number(i)),
          )
          return
        case 'encry':
          setEncry(Number(stdout))
          return
        case 'decry':
          setDecry(Number(stdout))
          return
      }
    }
  }, [isRunning, stdout, target])

  const calcN = (p: number, q: number) => {
    const script =
      calc_n +
      `print(calc_n(${p}, ${q}))
`
    runPython(script)
    setTarget('n')
  }

  const calcL = (p: number, q: number) => {
    const script = calc_l + `print(calc_l(${p}, ${q}))`
    runPython(script)
    setTarget('l')
  }

  const proposalE = (l: number) => {
    const script = calc_proposal_e + `print(proposal_e(${l}))`
    runPython(script)
    setTarget('es')
  }

  const proposalD = (e: number, l: number) => {
    const script = calc_proposal_d + `print(proposal_d(${e}, ${l}))`

    runPython(script)
    setTarget('ds')
  }

  const encrypt = (send: number, e: number, n: number) => {
    const script = calc_encript + `print(encrypt(${send}, ${e}, ${n}))`
    runPython(script)
    setTarget('encry')
  }

  const decrypt = (encry: number, d: number, n: number) => {
    const script = calc_decript + `print(decrypt(${encry}, ${d}, ${n}))`
    runPython(script)
    setTarget('decry')
  }

  return (
    <PythonProvider>
      <Template isLoading={isLoading}>
        <Header>RSA暗号を作ってみよう</Header>
        <Body>
          <h2>公開鍵と秘密鍵を作る</h2>
          <section className={sectionStyle}>
            <h3>互いに素なPとQを入力してください</h3>
            <p>
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
            <h3>N = P * Q を行います</h3>
            <p>
              <span>N = </span>
              <span>{n || '?'} </span>
              <button onClick={() => calcN(p, q)} className={buttonStyle}>
                Nを計算
              </button>
            </p>
            <h3>L = P-1とQ-1の最小公倍数 になります</h3>
            <p>
              <span>L = </span>
              <span>{l || '?'} </span>
              <button onClick={() => calcL(p, q)} className={buttonStyle}>
                Lを計算
              </button>
            </p>
            <h3>EとLの最大公約数が1となるようなEを選びます</h3>
            <p>
              <button onClick={() => proposalE(l)} className={buttonStyle}>
                Eの候補を出す
              </button>
            </p>
            <p>
              <span>Eの候補: </span>
              <span>{es.join(', ')}</span>
            </p>
            <p>
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
            <h3>D * E % L が 1 となるようなDを選びます</h3>
            <p>
              <button onClick={() => proposalD(e, l)} className={buttonStyle}>
                Dの候補を出す
              </button>
            </p>
            <p>
              <span>Dの候補: </span>
              <span>{ds.join(', ')}</span>
            </p>
            <p>
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
            <h3>上記で作った E と D と N の組み合わせが鍵となります</h3>
            <p>{`公開鍵 = {E, N} = {${e}, ${n}}`}</p>
            <p>{`秘密鍵 = {D, N} = {${d}, ${n}}`}</p>
          </section>
          <h2>暗号化する</h2>
          <section className={sectionStyle}>
            <h3>暗号化して送りたい数字を入力します</h3>
            <p>
              <span>送りたい数字 = </span>
              <input
                type="number"
                value={send}
                className={inputNumberStyle}
                onChange={(e) => setSend(Number(e.target.value))}
              />
            </p>
            <h3>「送りたい数字^E mod N 」が暗号化された数字になります</h3>
            <p>
              <span>暗号文 = </span>
              <span>{encry} </span>
              <button
                onClick={() => encrypt(send, e, n)}
                className={buttonStyle}
              >
                暗号化
              </button>
            </p>
          </section>
          <h2>復号化する</h2>
          <section className={sectionStyle}>
            <h3>「暗号文^D mod N」が復号化された数字になります</h3>
            <p>
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
        </Body>
      </Template>
    </PythonProvider>
  )
}

const sectionStyle = css({
  paddingBottom: '2rem',
  paddingLeft: '1rem',
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
