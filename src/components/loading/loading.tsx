import { useState, useEffect } from 'react'
import { css } from '../../../styled-system/css'

export const Loading = () => {
  const boxStyle = css({
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  })

  return (
    <main>
      <div className={boxStyle}>
        <h1>今めっちゃ重い処理してるから待ってて</h1>
      </div>
    </main>
  )
}
