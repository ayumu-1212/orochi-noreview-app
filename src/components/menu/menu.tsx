import { css } from '../../../styled-system/css'

export const Menu = ({
  items,
}: {
  items: { label: string; href: string }[]
}) => {
  return (
    <div>
      {items.map(({ label, href }) => (
        <div key={label}>
          <a href={href} className={cardStyle}>
            <h2>
              {label}
              <span>-&gt;</span>
            </h2>
          </a>
        </div>
      ))}
    </div>
  )
}

const cardStyle = css({
  padding: '1rem 2.5rem',
  borderRadius: 'var(--border-radius)',
  background: 'rgba(var(--card-rgb), 0)',
  border: '1px solid rgba(var(--card-border-rgb), 0)',
  transition: 'background 200ms border 200ms',
  _hover: {
    background: 'rgba(var(--card-rgb), 0.1)',
    border: '1px solid rgba(var(--card-border-rgb), 0.15)',
  },
  lg: {
    padding: '1rem 1.2rem',
  },
  '& span': {
    display: 'inline-block',
    transition: 'transform 200ms',
    _hover: {
      transform: 'translateX(4px)',
    },
  },
  '& h2': {
    fontWeight: '600',
    fontSize: 'x-large',
    marginBottom: '0.5rem',
    paddingLeft: '0.2rem',
    paddingRight: '0.5rem',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    lg: {
      marginBottom: '0.7rem',
    },
  },
  '& p': {
    margin: 0,
    opacity: 0.6,
    fontSize: '0.9rem',
    lineHeight: '1.5',
    maxWidth: '30ch',
  },
})
