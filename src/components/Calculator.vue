<template>
  <div class="calculator-panel">
    <Display :value="display" />
    <ButtonGrid @button-click="handleClick" />
    <FormulaPanel @formula-result="setDisplay" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Display from './Display.vue'
import ButtonGrid from './ButtonGrid.vue'
import FormulaPanel from './FormulaPanel.vue'

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
    ButtonGrid,
    FormulaPanel
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
    setDisplay(value: string): void {
      this.display = value
      this.waitingForNewNumber = true
    },
    handleClick(btn: string): void {
      if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'].includes(btn)) {
        this.handleNumber(btn)
      } else if (['+', '-', '*', '/', '^'].includes(btn)) {
        this.handleOperation(btn)
      } else if (btn === '=') {
        this.calculate()
      } else if (btn === 'C') {
        this.clear()
      } else if (btn === 'Delete') {
        this.delete()
      } else if (['sqrt', 'cbrt', 'sin', 'cos', 'tan', 'asin', 'acos', 'atan', 'ln', 'log'].includes(btn)) {
        this.applyUnary(btn)
      } else if (btn === 'pi') {
        this.insertValue(Math.PI.toString())
      } else if (btn === 'e') {
        this.insertValue(Math.E.toString())
      } else if (btn === '(' || btn === ')') {
        this.insertValue(btn)
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
    insertValue(value: string): void {
      if (this.waitingForNewNumber) {
        this.display = value
        this.waitingForNewNumber = false
      } else {
        this.display = this.display === '0' ? value : this.display + value
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
      switch (op) {
        case '+':
          return first + second
        case '-':
          return first - second
        case '*':
          return first * second
        case '/':
          return second !== 0 ? first / second : 0
        case '^':
          return Math.pow(first, second)
        default:
          return second
      }
    },
    applyUnary(fn: string): void {
      const value = parseFloat(this.display)
      let result = 0
      switch (fn) {
        case 'sqrt':
          result = Math.sqrt(value)
          break
        case 'cbrt':
          result = Math.cbrt(value)
          break
        case 'sin':
          result = Math.sin(value)
          break
        case 'cos':
          result = Math.cos(value)
          break
        case 'tan':
          result = Math.tan(value)
          break
        case 'asin':
          result = Math.asin(value)
          break
        case 'acos':
          result = Math.acos(value)
          break
        case 'atan':
          result = Math.atan(value)
          break
        case 'ln':
          result = Math.log(value)
          break
        case 'log':
          result = Math.log10(value)
          break
      }
      this.display = Number.isFinite(result) ? String(result) : 'Error'
      this.waitingForNewNumber = true
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

<style scoped>
.calculator-panel {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
