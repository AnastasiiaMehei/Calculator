<template>
  <div>
    <Display :value="display" />
    <ButtonGrid @button-click="handleClick" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Display from './Display.vue'
import ButtonGrid from './ButtonGrid.vue'

interface CalculatorState {
  display: string
  firstNumber: number | null
  operation: string | null
  waitingForNewNumber: boolean
}

export default defineComponent({
  name: 'Calculator',
  components: {
    Display,
    ButtonGrid
  },
  data(): CalculatorState {
    return {
      display: '0',
      firstNumber: null,
      operation: null,
      waitingForNewNumber: false
    }
  },
  methods: {
    handleClick(btn: string): void {
      if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'].includes(btn)) {
        this.handleNumber(btn)
      } else if (['+', '-', '*', '/'].includes(btn)) {
        this.handleOperation(btn)
      } else if (btn === '=') {
        this.calculate()
      } else if (btn === 'C') {
        this.clear()
      } else if (btn === 'Delete') {
        this.delete()
      }
    },
    
    handleNumber(num: string): void {
      if (this.waitingForNewNumber) {
        this.display = num
        this.waitingForNewNumber = false
      } else {
        this.display = this.display === '0' ? num : this.display + num
      }
    },
    
    handleOperation(op: string): void {
      const currentNumber = parseFloat(this.display)
      
      if (this.firstNumber === null) {
        this.firstNumber = currentNumber
      } else if (this.operation) {
        const result = this.performCalculation(this.firstNumber, currentNumber, this.operation)
        this.display = String(result)
        this.firstNumber = result
      }
      
      this.operation = op
      this.waitingForNewNumber = true
    },
    
    calculate(): void {
      if (this.firstNumber !== null && this.operation) {
        const secondNumber = parseFloat(this.display)
        const result = this.performCalculation(this.firstNumber, secondNumber, this.operation)
        this.display = String(result)
        this.firstNumber = null
        this.operation = null
        this.waitingForNewNumber = true
      }
    },
    
    performCalculation(first: number, second: number, op: string): number {
      switch(op) {
        case '+':
          return first + second
        case '-':
          return first - second
        case '*':
          return first * second
        case '/':
          return second !== 0 ? first / second : 0
        default:
          return second
      }
    },
    
    clear(): void {
      this.display = '0'
      this.firstNumber = null
      this.operation = null
      this.waitingForNewNumber = false
    },
    
    delete(): void {
      if (this.display.length > 1) {
        this.display = this.display.slice(0, -1)
      } else {
        this.display = '0'
      }
    }
  }
})
</script>
