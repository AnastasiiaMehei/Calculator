<template>
  <div class="calculator-wrapper">
    <div class="calculator-container">
      <h1 class="text-white mb-4 text-center fw-bold">Calculator</h1>
      <Calculator />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Calculator from './components/Calculator.vue'

export default defineComponent({
  name: 'App',
  components: {
    Calculator
  }
})
</script>

<style scoped>
.calculator-wrapper {
  min-height: 100vh;
  background-image: url('/background.png');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.calculator-container {
  background-color: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  max-width: 400px;
}

@media (max-width: 576px) {
  .calculator-container {
    padding: 20px;
  }
}
</style>
