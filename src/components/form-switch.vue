<script setup>
  import { computed, useAttrs } from "vue"

  const props = defineProps(['modelValue'])
  const emit = defineEmits(['update:modelValue'])

  const outerClass = computed (() => props.modelValue ? "bg-vxvue" : "bg-slate-200")
  const innerClass = computed (() => props.modelValue ? "translate-x-5" : "translate-x-0")
  const inputAttrs = computed(() => {
    let attrs = Object.assign({}, useAttrs())
    delete attrs['class']
    return attrs
  })
</script>

<template>
  <label :class="$attrs['class']">
    <span
        :class="outerClass"
        class="inline-flex relative flex-shrink-0 w-11 h-6 rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out cursor-pointer focus:ring-2 focus:ring-offset-2 focus:outline-none focus:ring-vxvue"
        role="switch"
        :aria-checked="!!modelValue"
    >
      <span
          aria-hidden="true"
          :class="innerClass"
          class="inline-block w-5 h-5 bg-white rounded-full ring-0 shadow transition duration-200 ease-in-out transform pointer-events-none"
      ></span>
      <input class="hidden" value="1" type="checkbox" @change="emit('update:modelValue', $event.target.checked)" v-bind="inputAttrs" :checked="modelValue" />
    </span>
  </label>
  <slot></slot>
</template>
