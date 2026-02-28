<script setup>
  import { CalendarIcon, XMarkIcon } from '@heroicons/vue/24/solid'
  import { parseDate } from '../composables/parseDate'
  import { formatDate } from '@vueuse/core'
  import { computed, ref, useAttrs, watch } from 'vue'

  defineOptions({ inheritAttrs: false })
  const emit = defineEmits(['toggle-datepicker'])
  const props = defineProps({
        outputFormat: { type: String, default: 'YYYY-MM-DD' },
        inputFormat: { type: String, default: 'YYYY-MM-DD' },
        showToggle: { type: Boolean, default: false }
      }
  )
  const attrs = useAttrs()
  const model = defineModel({ type: Date, default: null })
  const inputString = ref('')
  const dateString = computed(() => model.value ? formatDate(model.value, props.outputFormat) : '')
  const inputAttrs = computed(() => {
    const { class: _, ...rest } = attrs
    return rest
  })
  watch(model, v => inputString.value === v ? formatDate(v, props.outputFormat) : '')
</script>
<template>
  <div class="inline-block relative" :class="$attrs['class']">
    <div v-show="dateString">
      <div class="flex items-center w-full form-input bg-vxvue-50" :class="{ 'pr-10': showToggle }">
        <span class="text-vxvue-700">{{ dateString }}</span>
        <button
          type="button"
          v-if="!inputAttrs.disabled"
          class="inline-flex justify-center items-center ml-2 rounded-full focus:text-white shrink-0 size-4 text-vxvue hover:bg-vxvue-100 hover:text-vue-700 focus:outline-hidden focus:bg-vxvue-700"
          @click="model = null"
        >
          <x-mark-icon class="size-4" />
        </button>
      </div>
    </div>
    <div v-show="!dateString">
      <input
        v-model="inputString"
        type="text"
        class="block w-full form-input peer focus:border-vxvue"
        :class="{ 'pr-10': showToggle }"
        v-bind="inputAttrs"
        @blur="model = parseDate(inputString, props.inputFormat).date?.value || null"
        @input.prevent
      >
    </div>
    <button
      type="button"
      v-if="showToggle"
      ref="toggleButton"
      :disabled="inputAttrs.disabled"
      aria-label="Toggle datepicker"
      class="flex absolute inset-y-0 right-0 items-center px-2 text-vxvue-700 focus-visible:outline-none focus-visible:bg-vxvue/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      @click.stop="emit('toggle-datepicker')"
    >
      <calendar-icon class="size-5" />
    </button>
    <slot />
  </div>
</template>