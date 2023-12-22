'use client'
import { BgBody } from '@/components'
import { FloatingPrimeBalloon } from '@/components/floating-prime-balloon'
import { battleWithSnake } from '@/functions'
import dynamic from 'next/dynamic'
import { I18nProviderClient } from '../../../locales/client'

const AsciiArt = dynamic(() =>
  import('@/components/ascii-art').then((mod) => mod.AsciiArt),
)

export default function BgLayout({
  params: { locale },
  children,
}: {
  params: { locale: string }
  children: React.ReactNode
}) {
  battleWithSnake()

  return (
    <I18nProviderClient locale={locale}>
      <BgBody>
        {children}
        <AsciiArt />
        <FloatingPrimeBalloon />
      </BgBody>
    </I18nProviderClient>
  )
}
