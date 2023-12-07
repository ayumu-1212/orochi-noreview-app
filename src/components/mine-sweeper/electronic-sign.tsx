import { css } from '../../../styled-system/css'

type Props = {
  num: number
}

export const ElectronicSign = ({ num }: Props) => {
  return <div className={signStyle}>{num}</div>
}

const signStyle = css({
  height: '3rem',
  width: '5rem',
  color: 'red',
  fontSize: '2.5rem',
  lineHeight: '2.5rem',
  fontWeight: 'bold',
  backgroundColor: 'black',
  textAlign: 'right',
  padding: '0.25rem',
})
