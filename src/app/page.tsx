'use client'
import Image from 'next/image'
import styles from './page.module.css'
import * as VFX from 'react-vfx'
import { MouseStalker } from '@/components'
import { useState } from 'react'
import { cva } from '../../styled-system/css'
import useKonami from 'use-konami'

const shine = `
    precision mediump float;
    uniform vec2 resolution;
    uniform vec2 offset;
    uniform float time;
    uniform sampler2D src;

    void main (void) {
        vec2 uv = (gl_FragCoord.xy - offset) / resolution;

        vec2 p = uv * 2. - 1.;
        float a = atan(p.y, p.x);

        vec4 col = texture2D(src, uv);

        float level = 1. + sin(a * 10. + time * 3.) * 0.5;

        gl_FragColor = vec4(2, .3, .6, col.a) * level;
    }`
export default function Home() {
  const emojiList = bgPattern.variantMap.emoji
  const initEmoji =
    emojiList[Math.floor(Math.random() * (emojiList.length - 1))]
  const [emoji, setEmoji] = useState(initEmoji)
  const [title, setTitle] = useState('桜花極彩大蛇斬')

  useKonami({
    onUnlock: () => {
      setEmoji('chanabe')
      setTitle('ちゃなべ')
    },
  })
  return (
    <main className={`${styles.main} ${bgPattern({ emoji: emoji })}`}>
      <MouseStalker />
      <div className={styles.center}>
        <div>
          <VFX.VFXProvider>
            <VFX.VFXSpan
              shader={shine}
              style={{
                fontSize: '100px',
                fontWeight: 'bold',
              }}
            >
              {title}
            </VFX.VFXSpan>
          </VFX.VFXProvider>
        </div>
      </div>

      <div className={styles.grid}>
        <a
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Docs <span>-&gt;</span>
          </h2>
          <p>Find in-depth information about Next.js features and API.</p>
        </a>

        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Learn <span>-&gt;</span>
          </h2>
          <p>Learn about Next.js in an interactive course with&nbsp;quizzes!</p>
        </a>

        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Templates <span>-&gt;</span>
          </h2>
          <p>Explore starter templates for Next.js.</p>
        </a>

        <a
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Deploy <span>-&gt;</span>
          </h2>
          <p>
            Instantly deploy your Next.js site to a shareable URL with Vercel.
          </p>
        </a>
      </div>
    </main>
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
