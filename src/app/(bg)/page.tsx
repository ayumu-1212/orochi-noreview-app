'use client'
import { AccessCount, Hero, Menu } from '@/components'
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
        <Menu
          items={[
            { href: 'rsa', label: 'RSA暗号を作ってみよう！' },
            { href: 'bomb', label: 'マインスイーパー' },
            { href: 'block', label: 'ブロック崩し' },
          ]}
        />
      </div>

      <div>
        <AccessCount />
      </div>
    </main>
  )
}
