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
    width: '1.5rem',
    height: '1.5rem',
  },
  variants: {
    open: {
      true: {
        backgroundColor: 'gray.50',
      },
      false: {
        backgroundColor: 'gray.900',
      },
    },
  },
  defaultVariants: {
    open: false,
  },
})
