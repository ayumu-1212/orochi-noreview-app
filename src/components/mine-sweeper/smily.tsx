import { css } from '../../../styled-system/css'

type Props = {
  status: 'inprogress' | 'gameover' | 'clear'
}

export const Smily = ({ status }: Props) => {
  const getFacilExpression = ({ status }: Props) => {
    if (status === 'clear') return '😎'
    if (status === 'gameover') return '😵'
    return '😃'
  }
  const content = getFacilExpression({ status })

  return <div className={blockStyle}>{content}</div>
}

const blockStyle = css({
  height: '3rem',
  width: '3rem',
  backgroundColor: 'gray.900',
})
