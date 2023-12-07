import { cva } from '../../../styled-system/css'

type Props = {
  open: boolean
  bomb: boolean
  flag: boolean
  aroundSum: number
}

export const Block = (vars: Props) => {
  const getContent = ({ open, bomb, flag, aroundSum }: Props) => {
    if (open && bomb) return '💣'
    if (open && aroundSum) return String(aroundSum)
    if (!open && flag) return '⛳️'
    return ''
  }
  const content = getContent(vars)
  return <div className={blockStyle({ open: vars.open })}>{content}</div>
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
