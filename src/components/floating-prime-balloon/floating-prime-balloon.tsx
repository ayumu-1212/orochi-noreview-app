import { useSyscallGo } from '@/functions/use-syscall-go'
import { useEffect, useState } from 'react'
import { css } from '../../../styled-system/css'

export const FloatingPrimeBalloon = () => {
  const defaultCalcSpeed = 1000
  const primeLimit = 100000
  const [prime, setPrime] = useState<number>(1)
  const [calcSpeed, setCalcSpeed] = useState<number>(defaultCalcSpeed)
  const { isReady, nextPrime } = useSyscallGo()
  const [isClicked, setIsClicked] = useState<boolean>(false)

  useEffect(() => {
    if (isReady) {
      if (prime > primeLimit) {
        setCalcSpeed(defaultCalcSpeed)
        setPrime(1)
      }
      const timer = setInterval(() => {
        const _prime = nextPrime(prime)
        if (_prime) {
          setPrime(_prime)
        }
      }, calcSpeed)
      return () => clearInterval(timer)
    }
  }, [isReady, nextPrime, prime, calcSpeed])

  const handleClick = () => {
    setIsClicked(true)
    setTimeout(() => {
      setCalcSpeed(calcSpeed / 2)
      setIsClicked(false)
    }, 400)
  }

  return (
    <div>
      <div
        className={`${balloonStyle} ${
          isClicked ? clickedBalloonTextStyle : normalBalloonTextStyle
        }`}
        onClick={handleClick}
      >
        {prime}
      </div>
    </div>
  )
}

const normalBalloonTextStyle = css({
  color: '#FFF',
})

const clickedBalloonTextStyle = css({
  color: 'red',
})

const balloonStyle = css({
  cursor: 'pointer',
  position: 'fixed',
  right: '40px',
  bottom: '12px',
  display: 'inline-block',
  margin: '1.5em 15px 1.5em 0',
  padding: '0 5px',
  width: '90px',
  height: '90px',
  lineHeight: '90px',
  fontSize: '20px',
  textAlign: 'center',
  fontWeight: 'bold',
  background: '#a58eff',
  borderRadius: '50%',
  boxSizing: 'border-box',
  '&::before': {
    content: '""',
    position: 'absolute',
    bottom: '-8px',
    right: '-8px',
    marginTop: '-15px',
    border: '15px solid transparent',
    borderLeft: '15px solid #a58eff',
    zIndex: 0,
    transform: 'rotate(45deg)',
  },
})
