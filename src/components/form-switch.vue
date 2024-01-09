<script setup>
  import { computed, useAttrs } from "vue"

  const props = defineProps(['modelValue'])
  const emit = defineEmits(['update:modelValue'])

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
        :class="[
          'inline-flex relative flex-shrink-0 w-11 h-6 rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out cursor-pointer focus:ring-2 focus:ring-offset-2 focus:outline-none focus:ring-vxvue',
          disabled ? 'bg-slate-200' : (modelValue ? 'bg-vxvue' : 'bg-slate-300')
        ]"
        :aria-checked="!!modelValue"
        :aria-label="$attrs['aria-label']"
    >
      <span
          aria-hidden="true"
          :class="[
            'inline-block size-5 rounded-full ring-0 shadow transition duration-200 ease-in-out transform pointer-events-none',
            modelValue ? 'translate-x-5' : 'translate-x-0',
            disabled ? 'bg-slate-100' : 'bg-white'
          ]"
      ></span>
      <input
          v-bind="inputAttrs"
          :checked="modelValue"
          class="hidden"
          value="1"
          type="checkbox"
          @change="emit('update:modelValue', $event.target.checked)"
      />
    </span>
  </label>
  <slot></slot>
</template>