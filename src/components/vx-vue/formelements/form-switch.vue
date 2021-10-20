<template>
  <label class="form-switch">
    <input value="1" type="checkbox" @change="$emit('update:modelValue', $event.target.checked)" v-bind="$attrs" :checked="modelValue">
    <i class="form-icon"></i><slot></slot>
  </label>
</template>
<script>
  export default {
    name: 'form-switch',
    inheritAttrs: false,
    props: ['modelValue'],
    emits: ['update:modelValue']
  }
</script>