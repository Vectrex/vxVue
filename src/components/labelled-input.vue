<script setup>
  const emit = defineEmits(['update:modelValue'])
  const props = defineProps({
    modelValue: { type: [String, Number], default: null },
    label: { type: String, default: '' },
    invalid: Boolean,
    notification: { type: String, default: '' },
  })
</script>

<template>
  <div class="relative">
    <input
      v-bind="$attrs"
      :id="$.uid + '-input'"
      :value="modelValue"
      placeholder=" "
      class="block w-full form-input peer"
      @input="emit('update:modelValue', $event.target.value)"
    >
    <label
      :class="['floating-label', { 'text-error': invalid, 'required': $attrs.required }]"
      :for="$.uid + '-input'"
    >
      {{ label }}
    </label>
  </div>
  <p v-if="notification" :class="['text-sm', { 'text-error': invalid }]">
    {{ notification }}
  </p>
</template>

<style scoped>
@reference '../index.css'
.floating-label {
  @apply absolute px-2 left-1 top-2 scale-90 text-sm z-10 origin-[0] bg-white -translate-y-4 transform-gpu duration-200
  peer-focus:text-blue-600 peer-focus:top-2 peer-focus:scale-90 peer-focus:-translate-y-4
  peer-placeholder-shown:top-1/2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2
}

</style>