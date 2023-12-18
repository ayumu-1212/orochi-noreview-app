import { useState, useEffect } from 'react'
import { css } from '../../../styled-system/css'

export const AccessCount = () => {
  const [accessCount, setAccessCount] = useState(0)

  useEffect(() => {
    // アクセス数表示を偽造するため、適当な4桁の数字を生成
    // 現在のUNIX時間（エポック秒）を取得し、10秒単位に丸める
    const intNow = Math.floor(Date.now() / 10000)
    const strNow = intNow.toString()
    // 残りから下4桁を取得
    const count = parseInt(strNow.substring(strNow.length - 4))
    setAccessCount(count)
  }, [])

  return (
    <p
      className={css({
        backgroundColor: '#00f',
        fontWeight: 'bold',
        fontSize: '1.3rem',
        color: '#0f0',
      })}
    >
      ⭐️⭐️⭐️あなたは
      <span
        className={css({
          backgroundColor: 'black',
          color: '#f00',
          fontFamily: "'DSEG', sans-serif",
          margin: '0 1rem',
        })}
      >
        {accessCount}
      </span>
      人目の訪問者です！⭐️⭐️⭐️
    </p>
  )
}
