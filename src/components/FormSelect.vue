<script setup>
  const props = defineProps({
    options: { type: Array, default: () => [] },
    modelValue: { type: [String, Number], default: null },
    disabledLabel: { type: String, default: '' }
  })
  const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <select
    v-bind="$attrs"
    :value="modelValue"
    class="form-select"
    @change="emit('update:modelValue', $event.target.value)"
  >
    <option v-if="disabledLabel" disabled value="">
      {{ disabledLabel }}
    </option>
    <option
      v-for="option in options"
      :key="option.key !== undefined ? option.key : (option.label || option)"
      :selected="(option.key !== undefined ? option.key : (option.label || option)) === modelValue"
      :value="option.key !== undefined ? option.key : (option.label || option)"
    >
      {{ option.label || option }}
    </option>
  </select>
</template>