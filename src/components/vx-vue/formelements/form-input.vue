<template>
    <input
        :type="type"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
    >
</template>
<script>
  export default {
    name: 'form-input',
    props: {
      modelValue: String,
      type: {
        type: String,
        default: 'text'
      }
    },
    emits: ['update:modelValue']
  }
</script>