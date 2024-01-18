<script setup>
  import { ChevronRightIcon,XMarkIcon } from "@heroicons/vue/24/solid"
  import { ref, useAttrs } from "vue"

  defineOptions({ inheritAttrs: false })
  const emit = defineEmits(['select', 'keyup', 'keydown'])
  const props = defineProps({ show: Boolean, disabled: Boolean })
  const attrs = useAttrs()
  const btn = ref(null)
  const rndStr = Math.random().toString(20).substring(2, 8)
  const handleKeys = e => {
    if (!props.disabled) {
      const evt = (new Map([[40, 'keydown'], [38, 'keyup']])).get(e.keyCode)
      if (evt) {
        emit(evt)
        e.preventDefault()
      }
    }
  }
  const focus = () => btn.value.focus()
  defineExpose({ focus, disabled: props.disabled })
</script>

<template>
  <div>
    <button
      @click="emit('select')"
      @keydown="handleKeys"
      :class="['flex items-center w-full space-x-2 px-4 py-2 ring-vxvue',
          show ? 'rounded-t' : 'rounded',
          disabled ? 'bg-slate-300 text-slate-700' : 'bg-vxvue hover:bg-vxvue-600 text-white',
          attrs.class
      ]"
      :id="'ap-control-' + rndStr"
      :disabled="disabled"
      :aria-expanded="show"
      :aria-controls="'ap-' + rndStr"
      ref="btn"
      tabindex="0"
    >
      <x-mark-icon class="size-5" v-if="disabled" />
      <chevron-right-icon v-else :class="['size-5 transform-gpu transition-transform duration-300', { 'rotate-90': show }]" />
      <span><slot name="header" /></span>
    </button>
    <div
      :class="['grid transition-grid-template-rows duration-300 ease-in-out', show && !disabled ? 'grid-rows-1' : 'grid-rows-0']"
      :aria-labelledby="'ap-control-' + rndStr"
      :id="'ap-' + rndStr"
    >
      <div class="overflow-hidden rounded-b">
        <slot />
      </div>
    </div>
  </div>
</template>