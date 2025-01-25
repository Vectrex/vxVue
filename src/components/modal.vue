<script setup>
  import { onClickOutside } from "@vueuse/core"
  import { ref } from "vue"

  const emit = defineEmits(['clicked-outside'])
  const props = defineProps({
    show: Boolean,
    containerClass: { type: String, default: "w-3/4 h-[90vh]" },
    headerClass: { type: String, default: "" },
    contentClass: { type: String, default: "" },
  })
  const container = ref(null)

  onClickOutside(container, () => emit('clicked-outside'))
</script>

<template>
  <div v-if="show" class="fixed inset-0 z-9998 bg-white/50 backdrop-blur-xs" aria-hidden="true" />
  <transition name="appear">
    <div v-if="show" class="fixed inset-0 z-9999">
      <div class="flex justify-center items-center h-screen">
        <div ref="container" :class="['overflow-hidden relative max-w-full bg-white rounded-sm ring-1 ring-black/10 shadow-xl transition-all transform xl:max-w-(--breakpoint-xl)', containerClass]">
          <div :class="headerClass">
            <slot name="title" />
          </div>
          <div :class="['overflow-y-auto h-full pb-4 mt-16', contentClass]">
            <slot />
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
