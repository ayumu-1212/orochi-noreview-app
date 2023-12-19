'use client'
import { BgBody } from '@/components'
import { FloatingPrimeBalloon } from '@/components/floating-prime-balloon'
import { battleWithSnake } from '@/functions'
import dynamic from 'next/dynamic'

const AsciiArt = dynamic(() =>
  import('@/components/ascii-art').then((mod) => mod.AsciiArt),
)

export default function BgLayout({ children }: { children: React.ReactNode }) {
  battleWithSnake()

  return (
    <BgBody>
      {children}
      <AsciiArt />
      <FloatingPrimeBalloon />
    </BgBody>
  )
}
