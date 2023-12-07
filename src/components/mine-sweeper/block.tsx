import { cva } from '../../../styled-system/css'

type Props = {
  open: boolean
  bomb: boolean
  aroundSum: number
}

export const Block = ({ open, bomb, aroundSum }: Props) => {
  const content = bomb ? '💣' : String(aroundSum)
  return (
    <div className={blockStyle({ open })}>{open && content ? content : ''}</div>
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
