<script setup>
  const props = defineProps({ name: { type: String, required: true, validator: val => ['appear', 'vert-fade'].includes(val) } })
</script>

<template>
  <transition :name="name">
    <slot />
  </transition>
</template>

<style scoped>
@import '../index.css' reference;

.appear-enter-from,
.appear-leave-to
{
  @apply transform opacity-0 scale-90;
}
.appear-enter-to,
.appear-leave-from {
  @apply transform opacity-100 scale-100;
}
.appear-enter-active {
  @apply transition ease-out duration-200;
}
.appear-leave-active {
  @apply transition ease-out duration-150;
}
.vert-fade-enter-from, .vert-fade-leave-to {
  @apply opacity-0 transform-gpu -translate-y-10;
}
.vert-fade-enter-to, .vert-fade-leave-from {
  @apply opacity-100 translate-y-0;
}
.vert-fade-enter-active, .vert-fade-leave-active {
  @apply transition-all duration-300;
}

</style>