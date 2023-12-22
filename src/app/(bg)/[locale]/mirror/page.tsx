'use client'
import { Body, Header, Template } from '@/components/templates/entry'
import { useEffect, useRef } from 'react'
import { css } from '../../../../../styled-system/css'

export default function Home() {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const audioContext =
    typeof window !== 'undefined' ? new window.AudioContext() : null
  const analyser = audioContext ? audioContext.createAnalyser() : null
  const bufferLength = analyser ? analyser.frequencyBinCount : 0
  const dataArray = analyser ? new Uint8Array(bufferLength) : new Uint8Array(0)

  useEffect(() => {
    if (typeof window === 'undefined' || !audioContext || !analyser) {
      return
    }

    const initWebcam = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        })
        if (videoRef.current) {
          videoRef.current.srcObject = stream

          const source = audioContext.createMediaStreamSource(stream)
          source.connect(analyser)
          analyser.connect(audioContext.destination)

          // インジケーターの描画
          const canvas = document.getElementById(
            'audio-indicator',
          ) as HTMLCanvasElement | null
          if (canvas) {
            const canvasCtx = canvas.getContext('2d')

            if (canvasCtx) {
              const draw = () => {
                analyser.getByteFrequencyData(dataArray)

                const average =
                  dataArray.reduce((acc, value) => acc + value, 0) /
                  dataArray.length
                canvasCtx.clearRect(0, 0, canvas.width, canvas.height)
                canvasCtx.fillStyle = 'rgb(0, 255, 0)'
                canvasCtx.fillRect(0, 0, average, 10)

                requestAnimationFrame(draw)
              }

              draw()
            } else {
              console.error('Canvas context not supported')
            }
          } else {
            console.error('Canvas not found')
          }
        }
      } catch (error) {
        console.error('Error accessing webcam:', error)
      }
    }

    initWebcam()
  }, [videoRef, audioContext, analyser, dataArray])

  return (
    <Template>
      <Header>鏡🪞</Header>
      <Body>
        <div className={mirrorContainerStyle}>
          <div>
            <video ref={videoRef} autoPlay playsInline muted />
            <canvas id="audio-indicator" width="200" height="10"></canvas>
          </div>
        </div>
      </Body>
    </Template>
  )
}

const mirrorContainerStyle = css({
  display: 'flex',
  justifyContent: 'center',
  marginBottom: '1.5rem',
})
