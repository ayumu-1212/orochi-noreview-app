import { css } from '../../../styled-system/css'

type Props = {
  num: number
}

export const ElectronicSign = ({ num }: Props) => {
  return <div className={signStyle}>{num}</div>
}

const signStyle = css({
  height: '2rem',
  width: '4rem',
  color: 'red',
  fontSize: '1.5rem',
  fontWeight: 'bold',
  backgroundColor: 'black',
})
