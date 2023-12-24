'use client'
import { BlockBreaker } from '@/components/block-breaker'
import { Body, Header, Template } from '@/components/templates/entry'

/*
誰かが完成させてくれることを願う
*/

export default function Home() {
  return (
    <Template>
      <Header>ブロック崩し</Header>
      <Body>
        <BlockBreaker />
      </Body>
    </Template>
  )
}
