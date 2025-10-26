<script setup>
import VxVueTransition from './VxVueTransition.vue'
import { onClickOutside } from '@vueuse/core'
import { ref } from 'vue'

const emit = defineEmits(["clicked-outside"]);
const props = defineProps({
  show: Boolean,
  containerClass: {
    type: String,
    default: "mx-4 w-full lg:w-1/2 xl:w-1/4 max-h-[90vh]",
  },
  headerClass: { type: String, default: "" },
  contentClass: { type: String, default: "" },
});
const container = ref(null);

onClickOutside(container, () => emit("clicked-outside"));
</script>

<template>
  <div
    v-if="show"
    class="fixed inset-0 z-[calc(var(--zIndex-modal)-1)] bg-white/50 backdrop-blur-xs"
    aria-hidden="true"
  />
  <vx-vue-transition name="appear">
    <div v-if="show" class="fixed inset-0 z-[var(--zIndex-modal)]">
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
          <div :class="['overflow-y-auto h-full', contentClass]">
            <slot />
          </div>
        </div>
      </div>
    </div>
  </vx-vue-transition>
</template>
