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
  fontSize: '2.5rem',
  textAlign: 'center',
  lineHeight: '2.5rem',
  backgroundColor: 'gray.300',
  borderTop: 'solid 3px white',
  borderRight: 'solid 3px black',
  borderBottom: 'solid 3px black',
  borderLeft: 'solid 3px white',
})
