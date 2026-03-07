<script setup>
  import { XMarkIcon } from '@heroicons/vue/24/solid'
  import VxVueTransition from './VxVueTransition.vue'
  import { computed, onBeforeUnmount, watch } from 'vue'

  defineOptions({ inheritAttrs: false })

  const props = defineProps({
    title: { type: String, default: '' },
    message: { type: [String, Array], default: null },
    timeout: { type: Number, default: 3000 },
    active: { type: Boolean, default: false },
    showTimeoutProgress: { type: Boolean, default: false }
  })
  const emit = defineEmits(['close'])
  const lines = computed(() => typeof props.message === 'string' ? [props.message] : (props.message ?? []))

  const close = () => emit('close')
  let activeTimeout = null
  const startTimeout = () => {
    clearTimeout(activeTimeout)
    if (props.active && props.timeout) activeTimeout = setTimeout(close, props.timeout)
  }
  watch(() => [props.active, props.timeout], startTimeout, { immediate: true })
  onBeforeUnmount(() => window.clearTimeout(activeTimeout))
</script>

<template>
  <div role="status" aria-live="polite" aria-atomic="true" class="flex fixed inset-0 items-start py-6 px-4 pointer-events-none sm:p-6 z-(--zIndex-toast)">
    <div class="flex flex-col items-center space-y-4 w-full">
      <vx-vue-transition name="vert-fade">
        <div v-if="active" class="overflow-hidden w-full max-w-sm rounded-md ring-1 shadow-lg pointer-events-auto ring-black/5" v-bind="$attrs">
          <div class="p-4">
            <div class="flex items-start">
              <div class="shrink-0">
                <slot name="icon" />
              </div>
              <div class="flex-1 pt-0.5 ml-3 w-0">
                <slot name="title">
                  <div class="font-bold">
                    {{ title }}
                  </div>
                </slot>
                <slot>
                  <!-- eslint-disable-next-line vue/require-v-for-key -->
                  <p v-for="line in lines" class="mt-1">
                    {{ line }}
                  </p>
                </slot>
              </div>
              <div class="flex ml-4 shrink-0">
                <button type="button" aria-label="Close message" class="inline-flex text-white focus:ring-2 bg-black/20 rounded-xs hover:text-stone-200 focus:outline-hidden focus:ring-stone-200" @click="close">
                  <span class="sr-only">Close</span>
                  <x-mark-icon class="size-5" />
                </button>
              </div>
            </div>
          </div>
          <div
            v-if="showTimeoutProgress && timeout"
            class="toast-progress"
            :style="{ animationDuration: timeout + 'ms' }"
            role="progressbar"
            aria-hidden="false"
            aria-label="notification timer"
          />
        </div>
      </vx-vue-transition>
    </div>
  </div>
</template>
<style scoped>
  @reference '../index.css';

  .toast-progress {
    @apply h-1 bg-vxvue-alt origin-left motion-safe:animate-none;
    animation-name: toast-progress;
    animation-timing-function: linear;
    animation-fill-mode: forwards;
    will-change: transform;
  }
  @keyframes toast-progress {
    from {
      transform: scaleX(1);
    }
    to {
      transform: scaleX(0);
    }
}
</style>