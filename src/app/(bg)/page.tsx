'use client'
import { AccessCount, Hero } from '@/components'
import { useMouseStalker } from '@/hooks/mouse-stalker'
import styles from './page.module.css'

export default function Home() {
  useMouseStalker()

  return (
    <main className={styles.main}>
      <div className={styles.center}>
        <Hero />
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
