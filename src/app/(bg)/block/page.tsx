'use client'
import React, { useRef, useEffect, useState } from 'react'
import { css } from '../../../../styled-system/css'

/*
誰かが完成させてくれることを願う
*/

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [difficulty, setDifficulty] = useState('easy')
  const [extremeClicks, setExtremeClicks] = useState(0)
  const [remainingBallCount, setRemainingBallCount] = useState(3);

  const handleExtremeClick = () => {
    setExtremeClicks((prevClicks) => prevClicks + 1)
    if (extremeClicks >= 10) {
      setDifficulty('extreme')
    }
  }

  useEffect(() => {
    /**
     * NOTE: StrictModeによる二重レンダリング検知用フラグ
     * これがないと残りのボール数を減らす処理が2回実行されてしまって辛い
     */
    let ignore = false

    if (canvasRef.current) {
      const canvas = canvasRef.current
      const context = canvas.getContext('2d')
      if (!context) return

      let ballX = canvas.width / 3
      let ballY = canvas.height / 3
      const ballRadius = 10
      let ballSpeedX = Math.random() * 6 - 3
      let ballSpeedY = 2

      const paddleHeight = 15
      let paddleSpeed = 7
      let rightPressed = false
      let leftPressed = false

      // ブロックの設定
      const brickRowCount = 5
      const brickHeight = 20
      const brickPaddingY = 10

      // 難易度に基づいてbrickWidthとbrickColumnCountとpaddleWidthを設定
      let brickWidth = 0,
        brickColumnCount = 0,
        paddleWidth = 0,
        brickOffsetTop = 0,
        brickOffsetLeft = 0,
        brickPaddingX = 0
      switch (difficulty) {
        case 'easy':
          brickWidth = 110
          brickColumnCount = 4
          paddleWidth = 200
          brickOffsetTop = 70
          brickOffsetLeft = 70
          brickPaddingX = 70
          break
        case 'medium':
          brickWidth = 75
          brickColumnCount = 7
          paddleWidth = 100
          brickOffsetTop = 45
          brickOffsetLeft = 45
          brickPaddingX = 30
          break
        case 'hard':
          brickWidth = 40
          brickColumnCount = 15
          paddleWidth = 70
          brickOffsetTop = 30
          brickOffsetLeft = 30
          brickPaddingX = 10
          break
        case 'extreme':
          brickWidth = 15
          brickColumnCount = 49
          paddleWidth = 50
          brickOffsetTop = 8
          brickOffsetLeft = 8
          brickPaddingX = 1
          break
      }
      let totalBricks = brickRowCount * brickColumnCount
      let paddleX = (canvas.width - paddleWidth) / 2

      const keyDownHandler = (e: KeyboardEvent) => {
        if (e.key === 'Right' || e.key === 'ArrowRight') {
          rightPressed = true
        } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
          leftPressed = true
        }
      }

      const keyUpHandler = (e: KeyboardEvent) => {
        if (e.key === 'Right' || e.key === 'ArrowRight') {
          rightPressed = false
        } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
          leftPressed = false
        }
      }

      const mouseMoveHandler = (e: MouseEvent) => {
        const relativeX = e.clientX - canvas.getBoundingClientRect().left
        if (relativeX > 0 && relativeX < canvas.width) {
          paddleX = relativeX - paddleWidth / 2
          if (paddleX < 0) {
            paddleX = 0
          } else if (paddleX + paddleWidth > canvas.width) {
            paddleX = canvas.width - paddleWidth
          }
        }
      }
      document.addEventListener('keydown', keyDownHandler)
      document.addEventListener('keyup', keyUpHandler)
      document.addEventListener('mousemove', mouseMoveHandler)

      const drawBall = () => {
        context.beginPath()
        context.arc(ballX, ballY, ballRadius, 0, Math.PI * 2)
        context.fillStyle = '#0095DD'
        context.fill()
        context.closePath()
      }

      const drawPaddle = () => {
        context.beginPath()
        context.rect(
          paddleX,
          canvas.height - paddleHeight,
          paddleWidth,
          paddleHeight,
        )
        context.fillStyle = '#0095DD'
        context.fill()
        context.closePath()
      }

      // ブロックの配列を作成
      const bricks: { x: number; y: number; status: number }[][] = []
      for (let c = 0; c < brickColumnCount; c++) {
        bricks[c] = []
        for (let r = 0; r < brickRowCount; r++) {
          bricks[c][r] = { x: 0, y: 0, status: 1 }
        }
      }

      // ブロックを描画する関数
      const drawBricks = () => {
        for (let c = 0; c < brickColumnCount; c++) {
          for (let r = 0; r < brickRowCount; r++) {
            if (bricks[c][r].status === 1) {
              const brickX = c * (brickWidth + brickPaddingX) + brickOffsetLeft
              const brickY = r * (brickHeight + brickPaddingY) + brickOffsetTop
              bricks[c][r].x = brickX
              bricks[c][r].y = brickY
              context.beginPath()
              context.rect(brickX, brickY, brickWidth, brickHeight)
              context.fillStyle = '#0095DD'
              context.fill()
              context.closePath()
            }
          }
        }
      }

      // 残りのボール数を描画する関数
      const drawRemainingBallCount = () => {
        context.font = '16px Arial'
        context.fillStyle = '#0095DD'
        context.fillText(`残ボール数: ${remainingBallCount}`, 15, 30)
      }

      // ブロックとボールの衝突検出
      const collisionDetection = () => {
        for (let c = 0; c < brickColumnCount; c++) {
          for (let r = 0; r < brickRowCount; r++) {
            const b = bricks[c][r]
            if (b.status === 1) {
              if (
                ballX > b.x &&
                ballX < b.x + brickWidth &&
                ballY > b.y &&
                ballY < b.y + brickHeight
              ) {
                ballSpeedY = -ballSpeedY
                b.status = 0
                totalBricks -= 1
                if (totalBricks === 0) {
                  // すべてのブロックが消えたときの処理
                  alert('Congratulations!!!!')
                  document.location.reload()
                }
              }
            }
          }
        }
      }

      const update = () => {
        context.fillStyle = '#ADD8E6'
        context.fillRect(0, 0, canvas.width, canvas.height)
        drawBall()
        drawPaddle()
        drawBricks()
        drawRemainingBallCount()
        collisionDetection()

        ballX += ballSpeedX
        ballY += ballSpeedY

        // 左右の壁に当たったら跳ね返る
        if (
          ballX + ballSpeedX > canvas.width - ballRadius ||
          ballX + ballSpeedX < ballRadius
        ) {
          ballSpeedX = -ballSpeedX
        }

        // 上の壁に当たったら跳ね返る
        if (ballY + ballSpeedY < ballRadius) {
          ballSpeedY = -ballSpeedY
        } else if (
          ballY + ballSpeedY > canvas.height - ballRadius - paddleHeight &&
          ballX > paddleX &&
          ballX < paddleX + paddleWidth
        ) {
          ballSpeedY = -ballSpeedY
        } else if (ballY + ballSpeedY > canvas.height - ballRadius) {
        }

        // パドルに当たったかチェック
        if (
          ballY + ballSpeedY > canvas.height - ballRadius - paddleHeight &&
          ballX > paddleX &&
          ballX < paddleX + paddleWidth
        ) {
          ballSpeedY = -ballSpeedY
        }

        if (ballY + ballSpeedY > canvas.height - ballRadius) {
          //初期位置に戻す
          ballX = canvas.width / 3
          ballY = canvas.height / 3
          ballSpeedX = Math.random() * 6 - 3
          ballSpeedY = 2

          // ブロックをリセット
          for (let c = 0; c < brickColumnCount; c++) {
            for (let r = 0; r < brickRowCount; r++) {
              bricks[c][r].status = 1
            }
          }
          totalBricks = brickRowCount * brickColumnCount

          if (!ignore) {
            setRemainingBallCount(prev => prev - 1)
          }
        }

        if (rightPressed) {
          paddleX += paddleSpeed
          if (paddleX + paddleWidth > canvas.width) {
            paddleX = canvas.width - paddleWidth
          }
        } else if (leftPressed) {
          paddleX -= paddleSpeed
          if (paddleX < 0) {
            paddleX = 0
          }
        }

        requestAnimationFrame(update)
      }

      update()

      return () => {
        ignore = true
        document.removeEventListener('keydown', keyDownHandler)
        document.removeEventListener('keyup', keyUpHandler)
        document.removeEventListener('mousemove', mouseMoveHandler)
      }
    }
  }, [difficulty, remainingBallCount])

  return (
    <main>
      <div className={mainStyle}>
        <div>
          <p className={currentDiffStyle}>現在の難易度: {difficulty}</p>
          <button className={buttonStyle} onClick={() => setDifficulty('easy')}>
            Easy
          </button>
          <button
            className={buttonStyle}
            onClick={() => setDifficulty('medium')}
          >
            Medium
          </button>
          <button className={buttonStyle} onClick={() => setDifficulty('hard')}>
            Hard
          </button>
          <button
            className={extremeClicks >= 10 ? showExtreme : hideExtreme}
            onClick={handleExtremeClick}
          >
            Extreme
          </button>
        </div>

        <div>
          <canvas ref={canvasRef} width={800} height={600} />
        </div>

        <div>
          <a href="../">トップへ</a>
        </div>
      </div>
    </main>
  )
}

const mainStyle = css({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
})

const buttonStyle = css({
  backgroundColor: '#0095DD',
  color: 'white',
  padding: '15px 32px',
  margin: '4px',
  cursor: 'pointer',
  borderRadius: '8px',
})

const currentDiffStyle = css({
  padding: '15px 32px',
  textAlign: 'center',
  textDecoration: 'none',
  fontSize: '20px',
  fontWeight: 'bold',
})

const hideExtreme = css({
  opacity: '0',
  cursor: 'pointer',
  width: '1px',
})

const showExtreme = css({
  backgroundColor: '#dd0044',
  color: 'white',
  padding: '15px 32px',
  margin: '4px',
  cursor: 'pointer',
  borderRadius: '8px',
})
