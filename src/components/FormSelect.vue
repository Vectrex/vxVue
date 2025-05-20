<script setup>
  const props = defineProps({
    options: { type: Array, default: () => [] },
    disabledLabel: { type: String, default: '' }
  })
  const model = defineModel()
</script>

<template>
  <select
    v-bind="$attrs"
    v-model="model"
    class="form-select"
  >
    <option v-if="disabledLabel" disabled value="">
      {{ disabledLabel }}
    </option>
    <option
      v-for="option in options"
      :key="option.key !== undefined ? option.key : (option.label || option)"
      :selected="(option.key !== undefined ? option.key : (option.label || option)) === model"
      :value="option.key !== undefined ? option.key : (option.label || option)"
    >
      {{ option.label || option }}
    </option>
  </select>
</template>