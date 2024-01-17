<script setup>
  import { ChevronRightIcon,XMarkIcon } from "@heroicons/vue/24/solid"
  import { useAttrs } from "vue"

  defineOptions({ inheritAttrs: false })
  const emit = defineEmits(['select'])
  const props = defineProps({ show: Boolean, disabled: Boolean })
  const attrs = useAttrs()
  const handleClick = () => emit('select')
</script>

<template>
  <div>
    <button
      @click="handleClick"
      :class="[
          'flex items-center w-full space-x-2 px-4 py-2',
          show ? 'rounded-t' : 'rounded',
          disabled ? 'bg-slate-300 text-slate-700' : 'bg-vxvue hover:bg-vxvue-600 text-white',
          attrs.class
      ]"
      :disabled="disabled"
    >
      <x-mark-icon class="size-5" v-if="disabled" />
      <chevron-right-icon v-else :class="['size-5 transform-gpu transition-transform duration-300', { 'rotate-90': show }]" />
      <span><slot name="header" /></span>
    </button>
    <div :class="['grid transition-grid-template-rows duration-300 ease-in-out', show ? 'grid-rows-1' : 'grid-rows-0']">
      <div class="overflow-hidden rounded-b">
        <slot />
      </div>
    </div>
  </div>
</template>