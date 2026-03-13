<script setup>
  const props = defineProps({
    options: { type: Array, default: () => [] },
    placeholder: { type: String, default: null }
  })
  const model = defineModel()
  const getOptionValue = option => option?.key !== undefined ? option.key : (option?.label ?? option)
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
      :key="getOptionValue(option)"
      :value="getOptionValue(option)"
    >
      {{ option.label ?? option }}
    </option>
  </select>
</template>