<template>
  <label class="form-checkbox">
    <input value="1" type="checkbox" @change="$emit('update:modelValue', $event.target.checked)" v-bind="$attrs" :checked="modelValue">
    <i class="form-icon"></i><slot></slot>
  </label>
</template>
<script>
  export default {
    name: 'form-checkbox',
    inheritAttrs: false,
    props: ['modelValue'],
    emits: ['update:modelValue']
  }
</script>