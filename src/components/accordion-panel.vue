<script setup>
  import { ChevronRightIcon } from "@heroicons/vue/24/solid"

  const emit = defineEmits(['select'])
  const props = defineProps({ show: Boolean })
  defineOptions({ name: 'accordion-panel' })
  const handleClick = () => emit('select')
</script>

<template>
  <button @click="handleClick" class="flex items-center w-full bg-vxvue-alt-100 space-x-2 px-4 py-2 rounded border-b-2 border-b-vxvue-alt-200">
    <chevron-right-icon :class="['size-5 transform-gpu transition-transform duration-500', { 'rotate-90': show }]" />
    <slot name="header" />
  </button>
  <div :class="['grid transition-grid-template-rows duration-500 ease-in-out', show ? 'grid-rows-1' : 'grid-rows-0']">
    <div class="overflow-hidden">
      <slot name="body" />
    </div>
  </div>
</template>
