<script setup>
  import VxVueTransition from './VxVueTransition.vue'
  import { useSimpleFocusTrap } from '../composables/useSimpleFocusTrap'
  import { onClickOutside } from '@vueuse/core'
  import { computed, ref, watch } from 'vue'

  const emit = defineEmits(['clicked-outside'])
  const props = defineProps({
    show: Boolean,
    containerClass: {
      type: String,
      default: 'mx-4 w-full lg:w-1/2 xl:w-1/4 max-h-[90vh]',
    },
    headerClass: { type: String, default: '' },
    contentClass: { type: String, default: '' },
  })
  const container = ref(null)
  const body = ref(null)

  // handle outside click and escape key, ensure focus trapping within modal body

  onClickOutside(container, () => emit('clicked-outside'), { enabled: () => props.show })
  useSimpleFocusTrap(body, computed(() => props.show), { closeOnEscape: true, onEscape: () => emit('clicked-outside') })

  // prevented body scroll when modal is open

  watch(() => props.show, v => document.body.style.overflow = v ? 'hidden' : '')
</script>

<template>
  <div
    v-if="show"
    class="fixed inset-0 z-[calc(var(--zIndex-modal)-1)] bg-white/50 backdrop-blur-xs"
    aria-hidden="true"
  />
  <vx-vue-transition name="appear">
    <div v-if="show" class="fixed inset-0 z-(--zIndex-modal)" role="dialog" aria-modal="true">
      <div class="flex justify-center items-center h-screen">
        <div
          ref="container"
          :class="['flex flex-col overflow-hidden max-w-full bg-white rounded-sm ring-1 ring-black/10 shadow-xl transition-all transform xl:max-w-(--breakpoint-xl)',
            containerClass,
          ]"
        >
          <div :class="['grow-0', headerClass]">
            <slot name="title" />
          </div>
          <div ref="body" :class="['overflow-y-auto h-full', contentClass]">
            <slot />
          </div>
        </div>
      </div>
    </div>
  </vx-vue-transition>
</template>
