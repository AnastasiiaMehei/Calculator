<template>
  <div class="display text-white text-end p-4 mb-3 rounded-2">
    {{ value }}
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'Display',
  props: {
    value: {
      type: String as PropType<string>,
      required: true
    }
  }
})
</script>

<style scoped>
.display {
  font-size: 2.5rem !important;
  min-height: 80px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  word-wrap: break-word;
  word-break: break-all;
  border: 2px solid rgba(255, 255, 255, 0.2);
}

@media (max-width: 576px) {
  .display {
    font-size: 1.75rem !important;
    min-height: 60px;
  }
}
</style>
