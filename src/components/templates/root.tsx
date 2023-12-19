import { isComponentOf, toArray } from '@/helpers'
import { ReactNode } from 'react'
import { css } from '../../../styled-system/css'

export const Template = ({ children }: { children: ReactNode }) => {
  const elements = toArray(children)
  const hero = elements.find((element) => isComponentOf(Hero, element))
  const body = elements.find((element) => isComponentOf(Body, element))

  return (
    <main className={mainStyle}>
      {hero && <div className={heroStyle}>{hero}</div>}
      {body && <div>{body}</div>}
    </main>
  )
}

export const Hero = ({ children }: { children: ReactNode }) => {
  return children
}
export const Body = ({ children }: { children: ReactNode }) => {
  return children
}

const mainStyle = css({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  padding: '6rem',
  minHeight: '100vh',
})

const heroStyle = css({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
  padding: '4rem 0',

  _before: {
    background: 'var(--secondary-glow)',
    borderRadius: '50%',
    width: '480px',
    height: '360px',
    marginLeft: '-400px',
  },
  _after: {
    background: 'var(--primary-glow)',
    width: '240px',
    height: '180px',
    zIndex: '-1',
  },
})
