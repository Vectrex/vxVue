<script setup>
  const props = defineProps({ options: Array, modelValue: [String, Number], disabledLabel: String })
  const emit = defineEmits(['update:modelValue'])
</script>

<template>
    <select
        v-bind="$attrs"
        :value="modelValue"
        class="form-select"
        @change="emit('update:modelValue', $event.target.value)"
    >
      <option v-if="disabledLabel" disabled value="">{{ disabledLabel }}</option>
      <option
          v-for="option in options"
          :value="option.key !== undefined ? option.key : (option.label || option)"
          :selected="(option.key !== undefined ? option.key : (option.label || option)) === modelValue"
      >{{ option.label || option }}
      </option>
    </select>
</template>
