import { css } from '../../../styled-system/css'
import { useChangeLocale, useCurrentLocale } from '../../locales/client'

export const LangSwitcher = () => {
  const currentLocale = useCurrentLocale()
  const changeLocale = useChangeLocale()
  const jpButtonStyle =
    currentLocale == 'jp' ? buttonStylePrimay : buttonStyleSecondaly
  const orButtonStyle =
    currentLocale == 'or' ? buttonStylePrimay : buttonStyleSecondaly

  return (
    <div>
      <button className={jpButtonStyle} onClick={() => changeLocale('jp')}>
        日本語🇯🇵
      </button>
      <button className={orButtonStyle} onClick={() => changeLocale('or')}>
        大蛇語🐍
      </button>
    </div>
  )
}

const primaryColor = '#483d8b'

const buttonStylePrimay = css({
  backgroundColor: primaryColor,
  borderWidth: '4px',
  borderColor: primaryColor,
  fontWeight: 'bold',
  color: 'white',
  padding: '15px 32px',
  margin: '4px',
  cursor: 'pointer',
})

const buttonStyleSecondaly = css({
  backgroundColor: 'white',
  borderWidth: '4px',
  borderColor: primaryColor,
  fontWeight: 'bold',
  color: primaryColor,
  padding: '15px 32px',
  margin: '4px',
  cursor: 'pointer',
})
