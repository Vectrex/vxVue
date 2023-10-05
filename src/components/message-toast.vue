<script setup>
  import { XMarkIcon } from '@heroicons/vue/24/solid'
  import { computed, onMounted, ref, watch } from 'vue'

  defineOptions({
    inheritAttrs: false
  })
  const props = defineProps({
    title: String,
    message: [String, Array],
    timeout: { type: Number, default: 5000 },
    active: { type: Boolean, default: false }
  })
  const emit = defineEmits(['timeout', 'close'])
  const activeTimeout = ref(null)
  const lines = computed(() => typeof props.message === 'string' ? [props.message] : props.message)
  const startTimeout = () => {
    window.clearTimeout(activeTimeout.value)

    // timeout 0 disables fadeout

    if (props.active && props.timeout) {
      activeTimeout.value = window.setTimeout(() => { emit('timeout') }, props.timeout)
    }
  }

  watch(() => props.active, startTimeout)
  onMounted(startTimeout)
</script>

<template>
  <div aria-live="assertive" class="flex fixed inset-0 z-50 items-start py-6 px-4 pointer-events-none sm:p-6">
    <div class="flex flex-col items-center space-y-4 w-full">
      <transition name="messagetoast-fade">
        <div v-if="active" class="overflow-hidden w-full max-w-sm rounded-md ring-1 ring-black ring-opacity-5 shadow-lg pointer-events-auto" :class="$attrs['class']">
          <div class="p-4">
            <div class="flex items-start">
              <div class="flex-shrink-0">
                <slot name="icon"></slot>
              </div>
              <div class="flex-1 pt-0.5 ml-3 w-0">
                <p class="font-bold">
                  <slot name="title">{{ title }}</slot>
                </p>
                <p class="mt-1" v-for="line in lines">
                  <slot>{{ line }}</slot>
                </p>
              </div>
              <div class="flex flex-shrink-0 ml-4">
                <button @click="emit('close')" class="inline-flex text-white bg-black bg-opacity-20 rounded-sm focus:ring-2 focus:outline-none hover:text-stone-200 focus:ring-stone-200">
                  <span class="sr-only">Close</span>
                  <x-mark-icon class="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<style>
  .messagetoast-fade-enter-from,
  .messagetoast-fade-leave-to {
    @apply opacity-0 transform-gpu -translate-y-10;
  }
  .messagetoast-fade-enter-to,
  .messagetoast-fade-leave-from {
    @apply opacity-100 translate-y-0;
  }
  .messagetoast-fade-enter-active,
  .messagetoast-fade-leave-active {
    @apply transition-all duration-300;
  }
</style>
