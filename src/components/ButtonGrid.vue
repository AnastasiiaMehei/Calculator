<template>
  <div class="buttons-grid gap-2">
    <button 
      v-for="btn in buttons" 
      :key="btn" 
      @click="$emit('button-click', btn)"
      :class="['btn', 'btn-lg', 'fw-bold', getButtonClass(btn)]"
    >
      {{ btn }}
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ButtonGrid',
  emits: ['button-click'],
  data() {
    return {
      buttons: [
        'C', 'Delete', '(', ')', '/',
        'sin', 'cos', 'tan', '^',
        'asin', 'acos', 'atan', '*',
        'sqrt', 'cbrt', 'ln', 'log',
        '7', '8', '9', '-',
        '4', '5', '6', '+',
        '1', '2', '3', '=',
        '0', '.', 'pi', 'e'
      ]
    }
  },
  methods: {
    getButtonClass(btn: string): string {
      if (['+', '-', '*', '/', '^'].includes(btn)) return 'btn-warning text-dark fw-bold'
      if (['sin', 'cos', 'tan', 'asin', 'acos', 'atan', 'sqrt', 'cbrt', 'ln', 'log'].includes(btn)) return 'btn-info text-dark fw-bold'
      if (btn === '=') return 'btn-success fw-bold'
      if (btn === 'C') return 'btn-danger fw-bold'
      if (btn === 'Delete') return 'btn-warning text-dark fw-bold'
      if (['pi', 'e', '(', ')'].includes(btn)) return 'btn-outline-secondary'
      return 'btn-outline-light'
    }
  }
})
</script>

<style scoped>
.buttons-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}

.buttons-grid .btn {
  padding: 15px;
  font-size: 1.25rem;
  border-radius: 10px;
  transition: all 0.2s ease;
}

.buttons-grid .btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.buttons-grid .btn:active {
  transform: translateY(0);
}

 .buttons-grid .btn-success {
  background-color: #28a745;
}

@media (max-width: 576px) {
  .buttons-grid .btn {
    padding: 12px;
    font-size: 1rem;
  }
}
</style>
