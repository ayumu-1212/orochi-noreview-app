import './globals.css'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title:
    '桜花極彩大蛇斬 - 毎日誰かのプルリクをレビュー無しでマージする Advent Calendar 2023',
  description: `DeNAの社内には 「桜花極彩大蛇斬」 という自分の好きなこと・得意なスキルを発表する勉強会があります。 その 桜花極彩大蛇斬がこちらのアドベントカレンダーを噂で聞き、企画したものになります！
「空っぽの Next.js プロジェクトに、25 日間毎日誰かが Pull Request 出して問答無用でマージしていき、12 月 25 日に何ができているでしょう？」 アドベントカレンダーです。
なんの役にも立たないコンポーネント作って設置するもよし、 自分の思う最強の ESLint ルールを書き込むもよし、 Firebase 等の PaaS を接続する実装をしてセットアップ手順を README に残しておくもよしです。 ネタ実装でも 大 歓 迎 です。
さぁて、いったい最後はどんなアプリケーションになってることやら・・・
`,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <html lang="ja">{children}</html>
}
