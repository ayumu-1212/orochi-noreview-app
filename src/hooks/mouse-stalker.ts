import { useEffect } from 'react'
import { css } from '../../styled-system/css'

export const useMouseStalker = () => {
  const handleMouseMove = (event: MouseEvent) => {
    const mouseX = event.clientX
    const mouseY = event.clientY
    const stalker = document.getElementById('stalker')
    if (stalker) {
      stalker.style.left = `${mouseX - 24}px`
      stalker.style.top = `${mouseY - 36}px`
    }
  }

  useEffect(() => {
    const stalker = document.createElement('div')
    stalker.innerHTML = '⭐'
    stalker.className = stalkerStyle
    stalker.setAttribute('id', 'stalker')
    document.body.appendChild(stalker)
    return () => {
      document.body.removeChild(stalker)
    }
  }, [])

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousedown', handleMouseMove)
    }
  }, [])
}

const stalkerStyle = css({
  position: 'fixed',
  zIndex: '1000',
  pointerEvents: 'none',
  fontSize: '3rem',
})
