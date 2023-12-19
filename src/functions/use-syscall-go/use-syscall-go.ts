import '@/app/libs/wasm_exec.js'
import { useState, useEffect } from 'react'

export const useSyscallGo = () => {
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    async function init() {
      // @ts-ignore
      const go = new Go()
      try {
        const result = await WebAssembly.instantiateStreaming(
          fetch('main.wasm'),
          go.importObject,
        )
        go.run(result.instance)
        setIsReady(true)
      } catch (error) {
        console.error('Ooops!!! Failed to init WASM:', error)
      }
    }
    init()
  }, [])

  const nextPrime = (num: number): number | undefined => {
    // @ts-ignore
    if (typeof getNextPrime === 'function') {
      // @ts-ignore
      return getNextPrime(num)
    } else {
      console.warn('getNextPrime function is not available.')
      return undefined
    }
  }

  return {
    isReady,
    nextPrime,
  }
}
