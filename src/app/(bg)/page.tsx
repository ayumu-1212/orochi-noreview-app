'use client'
import { AccessCount, Hero, Menu } from '@/components'
import {
  Body,
  Template,
  Hero as TemplateHero,
} from '@/components/templates/root'
import { useMouseStalker } from '@/hooks/mouse-stalker'

export default function Home() {
  useMouseStalker()

  return (
    <Template>
      <TemplateHero>
        <Hero />
      </TemplateHero>

      <Body>
        <Menu
          items={[
            { href: 'rsa', label: 'RSA暗号を作ってみよう！' },
            { href: 'bomb', label: 'マインスイーパー' },
            { href: 'block', label: 'ブロック崩し' },
          ]}
        />
        <AccessCount />
      </Body>
    </Template>
  )
}
