<script setup>
  import { computed, useAttrs } from 'vue'

  const model = defineModel({ type: Boolean, default: false })
  const attrs = useAttrs()

  const onPath = 'M12 18 V6'
  const offPath = 'm18.5 12 c0 3.5 -3 6.5 -6.5 6.5 -3.5 0 -6.5 -3 -6.5 -6.5 0 -3.5 3 -6.5 6.5 -6.5 3.5 0 6.5 3 6.5 6.5z'

  const inputAttrs = computed(() => {
    const { class: _, 'aria-label': __, ...rest } = attrs
    return rest
  })
  const disabled = computed(() => [true, '', 'disabled'].includes(attrs.disabled))
  const switchClasses = computed(() =>  [
    'inline-flex relative shrink-0 w-11 p-0.5 rounded-full transition-colors duration-200 ease-in-out cursor-pointer',
    'focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-vxvue/50',
    disabled.value ? 'bg-slate-200' : model.value ? 'bg-vxvue' : 'bg-slate-300'
  ])
  const handleClasses = computed(() =>  [
    'block relative size-5 rounded-full transition duration-200 ease-in-out transform pointer-events-none',
    model.value ? 'translate-x-5' : 'translate-x-0',
    disabled.value ? 'bg-slate-100' : 'bg-white'
  ])
  const slotClasses = computed(() => [
    'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-3',
    model.value && !disabled.value ? 'text-vxvue' : 'text-slate-300'
  ])
  const toggle = () => { if(!disabled.value) model.value = !model.value }
</script>

<template>
  <label
    :class="$attrs['class']"
  >
    <span
      role="switch"
      :class="switchClasses"
      :aria-checked="model"
      :aria-label="$attrs['aria-label']"
      :aria-disabled="disabled"
      :tabindex="disabled ? -1 : 0"
      @keydown.space.prevent="toggle"
      @keydown.enter.prevent="toggle"
    >
      <span
        aria-hidden="true"
        :class="handleClasses"
      ><slot name="handle">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="6"
          stroke="currentColor"
          :class="slotClasses"
        >
          <path stroke-linecap="round" :d="model ? onPath : offPath" />
        </svg>
      </slot></span>
      <input
        v-model="model"
        v-bind="inputAttrs"
        class="hidden"
        type="checkbox"
      >
    </span>
    <slot />
  </label>
</template>