import { chance } from '@/utils'

const commonScenes = {
  approaching: [
    '____🧑____________________🐍...',
    '____🧑__________________🐍...',
    '____🧑________________🐍...',
    '____🧑______________🐍...',
    '____🧑____________🐍...',
    '____🧑__________🐍...',
    '____🧑________🐍...',
    '____🧑______🐍...',
    '____🧑____🐍...',
    '____🧑__🐍...',
  ],
  battling: ['___🧑🤜💥🐍', '__🧑💥🤛🐍', '__🧑💥🤜💥🤛🐍', '___🧑🤜💥🤛💥🐍'],
}

const snakeLeadingScenes = {
  battling: [
    '____🧑💥🤛🐍',
    '___🧑💥🤛🤛🐍',
    '__💥🧑💥🤛🤛🤛🐍',
    '_🧑💥🤛🤛🤛🤛🐍',
    '🧑💥🤛🤛🤛🤛🤛🐍',
  ],
  winning: ['_💪🐍💪_', '__💪🐍💪', '_💪🐍💪_', '💪🐍💪__', '_💪🐍💪_'],
}

const manLeadingScenes = {
  battling: [
    '____🧑🤜💥🐍',
    '____🧑🤜🤜💥🐍',
    '_____🧑🤜🤜🤜💥🐍💥',
    '_______🧑🤜🤜🤜🤜💥💥🐍',
    '_________🧑🤜🤜🤜🤜🤜💥💥🐍',
  ],
  winning: ['_💪🧑💪_', '__💪🧑💪', '_💪🧑💪_', '💪🧑💪__', '_💪🧑💪_'],
}
const DURATION = 200

const playBattle = (count: number, isWinMan: boolean) => {
  const allScenes = isWinMan
    ? [
        ...commonScenes.approaching,
        ...commonScenes.battling,
        ...manLeadingScenes.battling,
        ...manLeadingScenes.winning,
      ]
    : [
        ...commonScenes.approaching,
        ...commonScenes.battling,
        ...snakeLeadingScenes.battling,
        ...snakeLeadingScenes.winning,
      ]

  location.hash = allScenes[count % allScenes.length]
  // バトル中は勝者を変更せずにこの関数を再帰呼び出し
  if (count < allScenes.length - 1) {
    setTimeout(() => playBattle(count + 1, isWinMan), DURATION)
  }
  // バトル終了時は呼び出し元を再帰呼び出しして勝者を改めて決める
  else {
    setTimeout(battleWithSnake, DURATION)
  }
}

/**
 * ヘビと人間がURLバーで戦う
 * 開発サーバーでインクリメンタルビルド時にちらつくかもしれないけどリロードしたら直る
 * ここは許して
 * @param count 何回目の実行か
 */
export const battleWithSnake = () => {
  /**
   * ヘビのほうが強いので人間の勝率は10%
   * @see 参考文献 [人間vs蛇 では、どの蛇が最強だと思いますか？](https://detail.chiebukuro.yahoo.co.jp/qa/question_detail/q1493089569)
   */
  const isWinMan = chance(10)

  playBattle(0, isWinMan)
}
