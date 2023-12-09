'use client'
import React, { useRef, useEffect } from 'react'
import { css } from '../../../../styled-system/css'

/*
誰かが完成させてくれることを願う
*/

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current
      const context = canvas.getContext('2d')
      if (!context) return

      let ballX = canvas.width / 3
      let ballY = canvas.height / 3
      const ballRadius = 10
      let ballSpeedX = 2
      let ballSpeedY = 2

      const paddleWidth = 75
      const paddleHeight = 15
      let paddleX = (canvas.width - paddleWidth) / 2
      let paddleSpeed = 7
      let rightPressed = false
      let leftPressed = false

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
      const update = () => {
        context.fillStyle = '#ADD8E6'
        context.fillRect(0, 0, canvas.width, canvas.height)
        drawBall()
        drawPaddle()

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
          ballSpeedX = 2
          ballSpeedY = 2
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
        document.removeEventListener('keydown', keyDownHandler)
        document.removeEventListener('keyup', keyUpHandler)
        document.removeEventListener('mousemove', mouseMoveHandler)
      }
    }
  }, [])

  return (
    <main>
      <div className={mainStyle}>
        <canvas ref={canvasRef} width={800} height={600} />
      </div>
    </main>
  )
}

const mainStyle = css({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
})
