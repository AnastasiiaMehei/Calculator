<template>
  <div class="formula-panel">
    <div class="formula-header">
      <div>
        <h2>Formulas</h2>
        <p class="subtitle">Choose one and enter values for a quick calculation.</p>
      </div>
      <span class="formula-badge">Custom calculator</span>
    </div>

    <div class="formula-tabs">
      <button
        v-for="option in formulaOptions"
        :key="option.value"
        :class="['formula-tab', { active: selectedFormula === option.value }]"
        @click="selectedFormula = option.value"
      >
        {{ option.label }}
      </button>
    </div>

    <div class="formula-inputs">
      <div v-for="field in activeFields" :key="field.key" class="input-row">
        <label>{{ field.label }}</label>
        <input
          type="number"
          step="any"
          class="custom-input"
          v-model="inputs[field.key]"
          :placeholder="field.placeholder"
        />
      </div>
    </div>

    <button class="calculate-btn" @click="calculateFormula">Calculate</button>

    <div class="result-card">
      <span class="label">Result</span>
      <span class="value">{{ result || '—' }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

type InputMap = Record<string, string>

type FormulaOption = {
  value: string
  label: string
  fields: Array<{ key: string; label: string; placeholder: string }>
}

export default defineComponent({
  name: 'FormulaPanel',
  emits: ['formula-result'],
  data() {
    return {
      selectedFormula: 'area-circle',
      inputs: {
        radius: '',
        width: '',
        height: '',
        base: '',
        side: '',
        mass: '',
        acceleration: '',
        velocity: '',
        distance: '',
        time: ''
      } as InputMap,
      result: '' as string,
      formulaOptions: [
        { value: 'area-circle', label: 'Circle Area', fields: [{ key: 'radius', label: 'Radius', placeholder: 'Radius' }] },
        { value: 'area-triangle', label: 'Triangle Area', fields: [{ key: 'base', label: 'Base', placeholder: 'Base length' }, { key: 'height', label: 'Height', placeholder: 'Height' }] },
        { value: 'area-rectangle', label: 'Rectangle Area', fields: [{ key: 'width', label: 'Width', placeholder: 'Width' }, { key: 'height', label: 'Height', placeholder: 'Height' }] },
        { value: 'volume-cube', label: 'Cube Volume', fields: [{ key: 'side', label: 'Side', placeholder: 'Side length' }] },
        { value: 'volume-sphere', label: 'Sphere Volume', fields: [{ key: 'radius', label: 'Radius', placeholder: 'Radius' }] },
        { value: 'volume-cylinder', label: 'Cylinder Volume', fields: [{ key: 'radius', label: 'Radius', placeholder: 'Radius' }, { key: 'height', label: 'Height', placeholder: 'Height' }] },
        { value: 'speed', label: 'Speed', fields: [{ key: 'distance', label: 'Distance', placeholder: 'Distance' }, { key: 'time', label: 'Time', placeholder: 'Time' }] },
        { value: 'acceleration', label: 'Acceleration', fields: [{ key: 'velocity', label: 'Δv', placeholder: 'Velocity change' }, { key: 'time', label: 'Δt', placeholder: 'Time interval' }] },
        { value: 'force', label: 'Force', fields: [{ key: 'mass', label: 'Mass', placeholder: 'Mass' }, { key: 'acceleration', label: 'Acceleration', placeholder: 'Acceleration' }] },
        { value: 'kinetic-energy', label: 'Kinetic Energy', fields: [{ key: 'mass', label: 'Mass', placeholder: 'Mass' }, { key: 'velocity', label: 'Velocity', placeholder: 'Velocity' }] },
        { value: 'potential-energy', label: 'Potential Energy', fields: [{ key: 'mass', label: 'Mass', placeholder: 'Mass' }, { key: 'height', label: 'Height', placeholder: 'Height' }] }
      ] as FormulaOption[]
    }
  },
  computed: {
    activeFields(): Array<{ key: string; label: string; placeholder: string }> {
      const current = this.formulaOptions.find(option => option.value === this.selectedFormula)
      return current ? current.fields : []
    }
  },
  methods: {
    calculateFormula(): void {
      const values = Object.fromEntries(
        Object.entries(this.inputs).map(([key, value]) => [key, parseFloat(value)])
      ) as Record<string, number>
      let result = 0

      switch (this.selectedFormula) {
        case 'area-circle':
          result = Math.PI * Math.pow(values.radius || 0, 2)
          break
        case 'area-triangle':
          result = 0.5 * (values.base || 0) * (values.height || 0)
          break
        case 'area-rectangle':
          result = (values.width || 0) * (values.height || 0)
          break
        case 'volume-cube':
          result = Math.pow(values.side || 0, 3)
          break
        case 'volume-sphere':
          result = (4 / 3) * Math.PI * Math.pow(values.radius || 0, 3)
          break
        case 'volume-cylinder':
          result = Math.PI * Math.pow(values.radius || 0, 2) * (values.height || 0)
          break
        case 'speed':
          result = (values.distance || 0) / (values.time || 1)
          break
        case 'acceleration':
          result = (values.velocity || 0) / (values.time || 1)
          break
        case 'force':
          result = (values.mass || 0) * (values.acceleration || 0)
          break
        case 'kinetic-energy':
          result = 0.5 * (values.mass || 0) * Math.pow(values.velocity || 0, 2)
          break
        case 'potential-energy':
          result = (values.mass || 0) * 9.81 * (values.height || 0)
          break
        default:
          result = 0
      }

      this.result = Number.isFinite(result) ? result.toString() : 'Error'
      this.$emit('formula-result', this.result)
    }
  }
})
</script>

<style scoped>
.formula-panel {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 24px;
  padding: 24px;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.04), 0 16px 30px rgba(0, 0, 0, 0.25);
}

.formula-header {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  align-items: center;
  margin-bottom: 20px;
}

.formula-header h2 {
  margin: 0 0 8px;
  font-size: 1.15rem;
  letter-spacing: 0.02em;
}

.subtitle {
  margin: 0;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.95rem;
}

.formula-badge {
  display: inline-flex;
  align-items: center;
  padding: 6px 12px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.12);
  font-size: 0.8rem;
  color: #fff;
}

.formula-tabs {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  overflow-x: auto;
  padding-bottom: 4px;
  scrollbar-width: thin;
  scrollbar-color: rgba(83, 160, 255, 0.5) rgba(255, 255, 255, 0.08);
}

.formula-tabs::-webkit-scrollbar {
  height: 8px;
}

.formula-tabs::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.08);
  border-radius: 999px;
}

.formula-tabs::-webkit-scrollbar-thumb {
  background: rgba(83, 160, 255, 0.55);
  border-radius: 999px;
}

.formula-tab {
  background: rgba(255, 255, 255, 0.06);
  color: #e8f1ff;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 12px 14px;
  text-align: left;
  font-weight: 600;
  transition: transform 0.2s ease, background 0.2s ease, border-color 0.2s ease;
}

.formula-tab.active {
  background: rgba(255, 255, 255, 0.16);
  border-color: rgba(255, 255, 255, 0.25);
  transform: translateY(-1px);
}

.formula-tab:hover {
  background: rgba(255, 255, 255, 0.12);
}

.formula-inputs {
  display: grid;
  gap: 14px;
  margin-bottom: 18px;
}

.input-row {
  display: grid;
  gap: 8px;
}

.input-row label {
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.8);
}

.custom-input {
  width: 100%;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.05);
  color: #fff;
  padding: 12px 14px;
  font-size: 1rem;
}

.custom-input::placeholder {
  color: rgba(255, 255, 255, 0.4);
}

.calculate-btn {
  width: 100%;
  border: none;
  border-radius: 16px;
  padding: 14px 18px;
  background: linear-gradient(135deg, #53a0ff, #6f62ff);
  color: #fff;
  font-weight: 700;
  letter-spacing: 0.01em;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.calculate-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 12px 30px rgba(83, 160, 255, 0.3);
}

.result-card {
  margin-top: 18px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 18px;
  padding: 16px 18px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.result-card .label {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.95rem;
}

.result-card .value {
  font-size: 1rem;
  color: #fff;
  font-weight: 700;
}

@media (max-width: 576px) {
  .formula-tabs {
    grid-template-columns: 1fr;
  }
}
</style>
