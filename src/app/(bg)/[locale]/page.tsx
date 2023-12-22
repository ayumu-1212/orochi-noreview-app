'use client'
import { AccessCount, Hero, Menu } from '@/components'
import {
  Body,
  Template,
  Hero as TemplateHero,
} from '@/components/templates/root'
import { useMouseStalker } from '@/hooks/mouse-stalker'
import { useI18n } from '@/locales/client'
import { LangSwitcher } from '@/components/lang-switcher'

export default function Home() {
  const t = useI18n()

  useMouseStalker()

  return (
    <Template>
      <TemplateHero>
        <Hero />
      </TemplateHero>

      <Body>
        <Menu
          items={[
            { href: 'rsa', label: t('rsa') },
            { href: 'bomb', label: t('bomb') },
            { href: 'block', label: t('block') },
            { href: 'mirror', label: t('mirror') },
          ]}
        />
        <AccessCount />
        <LangSwitcher />
      </Body>
    </Template>
  )
}
