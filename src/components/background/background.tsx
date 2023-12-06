import { cva } from '../../../styled-system/css'
import { Inter } from 'next/font/google'
import { useState } from 'react'
import useKonami from 'use-konami'

const inter = Inter({ subsets: ['latin'] })

export const BgBody = ({ children }: { children: React.ReactNode }) => {
  const emojiList = bgPattern.variantMap.emoji
  const initEmoji =
    emojiList[Math.floor(Math.random() * (emojiList.length - 1))]
  const [emoji, setEmoji] = useState(initEmoji)

  useKonami({
    onUnlock: () => {
      setEmoji('chanabe')
    },
  })
  return (
    <body className={`${inter.className} ${bgPattern({ emoji: emoji })}`}>
      {children}
    </body>
  )
}

const bgPattern = cva({
  base: {
    backgroundRepeat: 'repeat',
  },
  variants: {
    emoji: {
      apple: {
        backgroundImage: 'url(../../public/1f40d_apple.png)',
      },
      google: {
        backgroundImage: 'url(../../public/1f40d_google.png)',
      },
      meta: {
        backgroundImage: 'url(../../public/1f40d_meta.png)',
      },
      microsoft: {
        backgroundImage: 'url(../../public/1f40d_microsoft.png)',
      },
      openmoji: {
        backgroundImage: 'url(../../public/1f40d_openmoji.png)',
      },
      samsung: {
        backgroundImage: 'url(../../public/1f40d_samsung.png)',
      },
      twitter: {
        backgroundImage: 'url(../../public/1f40d_twitter.png)',
      },
      chanabe: {
        backgroundImage: 'url(../../public/chanabe.png)',
      },
    },
  },
  defaultVariants: {
    emoji: 'apple',
  },
})
