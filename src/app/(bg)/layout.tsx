'use client'
import { BgBody } from '@/components'
import { battleWithSnake } from '@/functions'

export default function BgLayout({ children }: { children: React.ReactNode }) {
  battleWithSnake()

  return <BgBody>{children}</BgBody>
}
