<script setup>
  import Spinner from "./spinner.vue"
  defineOptions({ inheritAttrs: false })
  const props = defineProps({
    busy: Boolean,
    spinnerClass: { type: String, default: null },
    theme: { type: String, default: null },
  })
  const emit = defineEmits(['submit'])
</script>

<template>
  <div class="flex items-center space-x-2">
    <button
      :class="[$attrs.class, theme]"
      :disabled="$attrs.disabled || busy"
      type="button"
      @click="emit('submit')"
    >
      <slot />
    </button>
    <spinner
      v-if="busy"
      :class="spinnerClass || ['size-5', { error: 'text-error', success: 'text-success', default: 'text-vxvue' }[theme || 'default']]"
    />
  </div>
</template>

<style scoped>
  @import '../index.css' reference;

  button.success {
    @apply bg-success text-white hover:bg-success-700 focus:ring-success
  }
  button.error {
    @apply bg-error text-error-50 hover:bg-error-600 focus:ring-error-600
  }
  button:disabled {
    @apply bg-slate-300 text-slate-800 hover:bg-slate-300 focus:ring-0
  }
</style>