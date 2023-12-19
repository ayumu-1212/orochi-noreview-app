package main

import "syscall/js"

func main() {
	c := make(chan int)
	calc := newCalculator()
	js.Global().Set("getNextPrime", js.FuncOf(calc.getNextPrime))
	<-c
}