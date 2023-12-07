import { cva } from '../../../styled-system/css'

type Props = {
  onClick: (x: number, y: number) => void
  x: number
  y: number
  block: BlockContentProps
}

export type BlockContentProps = {
  open: boolean
  bomb: boolean
  flag: boolean
  aroundSum: number
}

export const Block = ({ onClick, x, y, block }: Props) => {
  const getContent = ({ open, bomb, flag, aroundSum }: BlockContentProps) => {
    if (open && bomb) return '💣'
    if (open && aroundSum) return String(aroundSum)
    if (!open && flag) return '⛳️'
    return ''
  }
  const content = getContent(block)

  return (
    <div
      className={blockStyle({ open: block.open })}
      onClick={() => onClick(x, y)}
    >
      {content}
    </div>
  )
}

const blockStyle = cva({
  base: {
    width: '2rem',
    height: '2rem',
    fontSize: '1.5rem',
    lineHeight: '2rem',
    textAlign: 'center',
  },
  variants: {
    open: {
      true: {
        backgroundColor: 'gray.400',
        border: 'solid 1px black',
      },
      false: {
        backgroundColor: 'gray.300',
        borderTop: 'solid 3px white',
        borderRight: 'solid 3px black',
        borderBottom: 'solid 3px black',
        borderLeft: 'solid 3px white',
      },
    },
  },
  defaultVariants: {
    open: false,
  },
})
