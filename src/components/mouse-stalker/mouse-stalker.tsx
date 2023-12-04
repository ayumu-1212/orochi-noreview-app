import { css } from '../../../styled-system/css'
import { useEffect } from 'react'

export const MouseStalker = () => {
  const handleMouseMove = (event: MouseEvent) => {
    const mouseX = event.clientX
    const mouseY = event.clientY
    const stalker = document.getElementById('stalker')
    if (stalker) {
      stalker.style.left = `${mouseX}px`
      stalker.style.top = `${mouseY}px`
    }
  }
  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <div id="stalker" className={stalkerStyle}>
      ⭐
    </div>
  )
}

const stalkerStyle = css({
  position: 'fixed',
  zIndex: '1000',
  fontSize: '3rem',
})
