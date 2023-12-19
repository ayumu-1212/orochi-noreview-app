package main

import (
  "syscall/js"
  "math"
)

type calculator struct {}
func newCalculator() *calculator {
	return &calculator{}
}

// isPrime 与えられた数 n が素数かどうかをチェック
func isPrime(n int) bool {
	if n <= 1 {
		return false
	}
	for i := 2; i <= int(math.Sqrt(float64(n))); i++ {
		if n%i == 0 {
			return false
		}
	}
	return true
}

// nextPrime n より大きい最小の素数を返す
func nextPrime(n int) int {
	for {
		n++
		if isPrime(n) {
			return n
		}
	}
}

// js.FuncOfの引数に渡す関数
func (c *calculator) getNextPrime(this js.Value, inputs []js.Value) interface{} {
	return js.ValueOf(nextPrime(inputs[0].Int()))
}