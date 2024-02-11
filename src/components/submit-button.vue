<script setup>
  import Spinner from "./spinner.vue"
  defineOptions({ inheritAttrs: false })
  const props = defineProps({ busy: Boolean, spinnerClass: String, theme: String })
  const emit = defineEmits(['submit'])
</script>

<template>
  <div class="flex items-center space-x-2">
    <button
      :class="[$attrs.class || 'button', theme || '']"
      :disabled="busy"
      type="button"
      @click="emit('submit')"
      ><slot />
    </button>
    <spinner
      v-if="busy"
      :class="spinnerClass || ['size-5', { error: 'text-error', success: 'text-success', default: 'text-vxvue'}[theme || 'default']]"
    />
  </div>
</template>

<style>
  .button {
    @apply inline-flex items-center justify-center px-4 py-2 border border-transparent font-medium rounded text-white bg-vxvue hover:bg-vxvue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-vxvue;
  }
  .button.success {
    @apply bg-success hover:bg-success-700 focus:ring-success text-white
  }
  .button.error {
    @apply bg-error hover:bg-error-600 focus:ring-error-600 text-error-50
  }
  .button:disabled {
    @apply bg-slate-300 hover:bg-slate-300 focus:ring-0 text-slate-800
  }
</style>