<script setup>
  import { XMarkIcon } from '@heroicons/vue/24/solid'
  import VxVueTransition from './VxVueTransition.vue'
  import { computed, onMounted, ref, watch } from 'vue'

  defineOptions({
    inheritAttrs: false
  })
  const props = defineProps({
    title: { type: String, default: '' },
    message: { type: [String, Array], default: null },
    timeout: { type: Number, default: 5000 },
    active: { type: Boolean, default: false },
    showTimeoutProgress: { type: Boolean, default: false }
  })
  const emit = defineEmits(['timeout', 'close'])
  const lines = computed(() => typeof props.message === 'string' ? [props.message] : props.message)
  const progressWidth = ref(0)
  let activeTimeout = null
  const startTimeout = () => {
    window.clearTimeout(activeTimeout)
    progressWidth.value = 100

    // timeout 0 disables fadeout

    if (props.active && props.timeout) {
      activeTimeout = window.setTimeout(() => { emit('timeout') }, props.timeout)
      window.setTimeout(() => progressWidth.value = 0, 0)
    }
  }

  watch(() => props.active, startTimeout)
  onMounted(startTimeout)
</script>

<template>
  <div aria-live="assertive" class="flex fixed inset-0 z-[var(--zIndex-toast)] items-start py-6 px-4 pointer-events-none sm:p-6">
    <div class="flex flex-col items-center space-y-4 w-full">
      <vx-vue-transition name="vert-fade">
        <div v-if="active" class="overflow-hidden w-full max-w-sm rounded-md ring-1 ring-black/5 shadow-lg pointer-events-auto" :class="$attrs['class']">
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
              <div class="flex shrink-0 ml-4">
                <button class="inline-flex text-white bg-black/20 rounded-xs focus:ring-2 focus:outline-hidden hover:text-stone-200 focus:ring-stone-200" @click="emit('close')">
                  <span class="sr-only">Close</span>
                  <x-mark-icon class="size-5" />
                </button>
              </div>
            </div>
          </div>
          <div
            v-if="showTimeoutProgress && timeout"
            class="h-1 transition-all ease-linear bg-vxvue-alt"
            :style="{
              width: progressWidth +'%',
              'transition-duration': timeout + 'ms',
            }"
            role="progressbar"
            aria-hidden="false"
            aria-label="notification timer"
          />
        </div>
      </vx-vue-transition>
    </div>
  </div>
</template>