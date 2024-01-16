<script setup>
  const emit = defineEmits(['select'])
  const props = defineProps({ show: Boolean })
  defineOptions({ name: 'accordion-panel' })
  const handleClick = () => emit('select')
</script>

<template>
  <slot name="header">
    <div @click="handleClick">Header</div>
  </slot>
  <slot name="body" v-if="show">
    <div>Body.</div>
  </slot>
</template>
