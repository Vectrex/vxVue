<script setup>
  import { computed, useAttrs } from "vue"

  const model = defineModel()

  const inputAttrs = computed(() => {
    let attrs = Object.assign({}, useAttrs())
    delete attrs['class']
    return attrs
  })
  const disabled = computed( () => useAttrs().disabled || useAttrs().disabled === '')
</script>

<template>
  <label :class="$attrs['class']" tabindex="0">
    <span
      role="switch"
      :class="['inline-flex relative shrink-0 w-11 p-[2px] rounded-full transition-colors duration-200 ease-in-out cursor-pointer focus:ring-2 focus:ring-offset-2 focus:outline-hidden focus:ring-vxvue',
               disabled ? 'bg-slate-200' : (model ? 'bg-vxvue' : 'bg-slate-300')
      ]"
      :aria-checked="model"
      :aria-label="$attrs['aria-label']"
    >
      <span
        aria-hidden="true"
        :class="['block relative size-5 rounded-full transition duration-200 ease-in-out transform pointer-events-none',
                 model ? 'translate-x-5' : 'translate-x-0',
                 disabled ? 'bg-slate-100' : 'bg-white'
        ]"
      ><slot name="handle">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="6"
          stroke="currentColor"
          :class="['absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-3', model && !disabled ? 'text-vxvue' : 'text-slate-300']"
        >
          <path stroke-linecap="round" :d="model ? 'M12 18 V6' : 'm18.5 12 c0 3.5 -3 6.5 -6.5 6.5 -3.5 0 -6.5 -3 -6.5 -6.5 0 -3.5 3 -6.5 6.5 -6.5 3.5 0 6.5 3 6.5 6.5z'" />
        </svg>
      </slot></span>
      <input
        v-model="model"
        v-bind="inputAttrs"
        class="hidden"
        value="1"
        type="checkbox"
      >
    </span>
    <slot />
  </label>
</template>