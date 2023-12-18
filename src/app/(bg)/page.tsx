'use client'
import { AccessCount } from '@/components'
import { useMouseStalker } from '@/hooks/mouse-stalker'
import { useState } from 'react'
import * as VFX from 'react-vfx'
import useKonami from 'use-konami'
import styles from './page.module.css'

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
  const [title, setTitle] = useState('桜花極彩大蛇斬')

  useKonami({
    onUnlock: () => {
      setTitle('ちゃなべ')
    },
  })
  useMouseStalker()

  return (
    <main className={styles.main}>
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

      <div>
        <a href="rsa" className={styles.card}>
          <h2>
            RSA暗号を作ってみよう！<span>-&gt;</span>
          </h2>
        </a>
      </div>
      <div>
        <a href="bomb" className={styles.card}>
          <h2>
            マインスイーパー<span>-&gt;</span>
          </h2>
        </a>
      </div>
      <div>
        <a href="block" className={styles.card}>
          <h2>
            ブロック崩し<span>-&gt;</span>
          </h2>
        </a>
      </div>

      <div>
        <AccessCount />
      </div>
    </main>
  )
}
