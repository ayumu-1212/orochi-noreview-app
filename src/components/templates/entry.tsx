import { isComponentOf, toArray } from '@/helpers'
import { ReactElement, ReactNode } from 'react'
import { css } from '../../../styled-system/css'

export const Template = ({
  isLoading,
  children,
}: {
  isLoading?: boolean
  children: ReactElement | ReactElement[]
}) => {
  const elements = toArray(children)
  const heading = elements.find((element) => isComponentOf(Header, element))
  const body = elements.find((element) => isComponentOf(Body, element))

  return (
    <main>
      <div className={boxStyle}>
        {isLoading !== undefined && isLoading ? (
          <h1>ちょっと待ってね</h1>
        ) : (
          <>
            {heading && heading}
            {body && <section>{body}</section>}
            <div className={linkWrapperStyle}>
              <a href="./" className={linkStyle}>
                トップへ
              </a>
            </div>
          </>
        )}
      </div>
    </main>
  )
}

export const Header = ({ children }: { children: ReactNode }) => {
  return <h1>{children}</h1>
}

export const Body = ({ children }: { children: ReactNode }) => {
  return children
}

const boxStyle = css({
  backgroundColor: 'rgba(255,255,255,0.9)',
  width: '80%',
  maxWidth: '820px',
  padding: '2rem',
  margin: '5em auto',
  '& h1': {
    fontSize: '2xl',
    fontWeight: 'bold',
    textAlign: 'center',
    paddingBottom: '1rem',
  },
  '& h2': {
    fontSize: 'xl',
    fontWeight: 'bold',
    paddingBottom: '0.5rem',
    _before: { content: '"■ "' },
  },
  '& h3': {
    fontSize: 'md',
    fontWeight: 'bolder',
    paddingTop: '1rem',
    paddingBottom: '0.5rem',
  },
  '& p': {
    paddingBottom: '0.5rem',
  },
})

const linkWrapperStyle = css({
  display: 'flex',
  justifyContent: 'center',
})

const linkStyle = css({
  textDecoration: 'underline',
  _hover: {
    color: 'green',
  },
})
