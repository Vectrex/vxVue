<script setup>
  import { computed } from "vue"
  const props = defineProps({ radius: { type: Number, default: 10 }, strokeWidth: { type: Number, default: 4 }})
  const center = computed(() => props.radius + props.strokeWidth / 2)
  const viewBox = computed(() => props.radius * 2 + props.strokeWidth)
  const dashLen = computed(() => props.radius * Math.PI / 1.5) // 120°
</script>
<template>
  <svg class="animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" :viewBox="'0 0 ' + viewBox + ' ' + viewBox" role="progressbar">
    <circle class="opacity-35" :cx="center" :cy="center" :r="radius" stroke="currentColor" :stroke-width="strokeWidth" />
    <circle :cx="center" :cy="center" :r="radius" stroke="currentColor" :stroke-width="strokeWidth" :stroke-dasharray="dashLen + ' ' + radius * 100" stroke-linecap="round" />
  </svg>
</template>
