<template>
    <div class="formula-panel card bg-white bg-opacity-10 text-white p-3 mt-4">
    <h2 class="h5 mb-3">Formulas</h2>
    <div class="mb-3">
      <label class="form-label">Choose formula</label>
      <select v-model="selectedFormula" class="form-select bg-gray text-white">
        <option v-for="option in formulaOptions" :key="option.value" :value="option.value">
          {{ option.label }}
        </option>
      </select>
    </div>

    <div v-for="field in activeFields" :key="field.key" class="mb-3">
      <label class="form-label">{{ field.label }}</label>
      <input
        type="number"
        step="any"
        class="form-control bg-gray text-white"
        v-model="inputs[field.key]"
        :placeholder="field.placeholder"
      />
    </div>

    <button class="btn btn-primary w-100" @click="calculateFormula">Calculate</button>

    <div class="result mt-3">
      <strong>Result:</strong>
      <span>{{ result }}</span>
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
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 16px;
}

.formula-panel input,
.formula-panel select {
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.result {
  font-size: 1rem;
  color: #fff;
}
</style>
