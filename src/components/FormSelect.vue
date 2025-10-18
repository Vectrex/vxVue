<script setup>
  const props = defineProps({
    options: { type: Array, default: () => [] },
    placeholder: { type: String, default: null }
  })
  const model = defineModel()
</script>

<template>
  <select
    v-bind="$attrs"
    v-model="model"
    class="form-select"
  >
    <option v-if="placeholder" :value="null" disabled hidden>
      {{ placeholder }}
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