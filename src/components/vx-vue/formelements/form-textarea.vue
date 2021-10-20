<template>
    <textarea
        :value="modelValue"
        class="form-input"
        @input="$emit('update:modelValue', $event.target.value)"
    />
</template>
<script>
export default {
  name: 'form-textarea',
  props: ['modelValue'],
  emits: ['update:modelValue']
}
</script>