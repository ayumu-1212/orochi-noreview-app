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
import { Loading } from '@/components/loading'
import { useEffect, useState } from 'react'

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 10000)

    return () => clearTimeout(timer)
  }, [])

  const t = useI18n()

  useMouseStalker()

  return (
    <>
      {isLoading && <Loading />}
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
    </>
  )
}
