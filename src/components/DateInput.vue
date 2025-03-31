<script setup>
  import { CalendarIcon, XMarkIcon } from "@heroicons/vue/24/solid"
  import { parseDate } from "../composables/parseDate"
  import { formatDate } from "@vueuse/core"
  import { computed, ref, useAttrs, watch } from "vue"

  defineOptions({ inheritAttrs: false })
  const emit = defineEmits(['update:modelValue', 'toggle-datepicker'])
  const props = defineProps({
        outputFormat: { type: String, default: 'YYYY-MM-DD' },
        inputFormat: { type: String, default: 'YYYY-MM-DD' },
        showToggle: { type: Boolean, default: false },
        modelValue: Date
      }
  )
  const inputString = ref('')
  const dateString = computed(() => props.modelValue ? formatDate(props.modelValue, props.outputFormat) : '')
  const inputAttrs = computed(() => { let attrs = Object.assign({}, useAttrs()); delete attrs['class']; return attrs })
  watch(() => props.modelValue, v => inputString.value = v ? formatDate(v, props.outputFormat) : '')
</script>
<template>
  <div class="inline-block relative" :class="$attrs['class']">
    <div v-show="dateString">
      <div class="block flex items-center w-full form-input bg-vxvue-50" :class="{ 'pr-10': showToggle }">
        <span class="text-vxvue-700">{{ dateString }}</span>
        <button
          v-if="!inputAttrs.disabled"
          class="inline-flex shrink-0 justify-center items-center ml-2 rounded-full focus:text-white focus:outline-hidden size-4 text-vxvue hover:bg-vxvue-100 hover:text-vue-700 focus:bg-vxvue-700"
          @click="emit('update:modelValue', null)"
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
        @blur="emit('update:modelValue', parseDate(inputString, props.inputFormat).date?.value || null)"
        @input.prevent
      >
    </div>
    <button
      v-if="showToggle"
      ref="toggleButton"
      :class="['flex absolute inset-y-0 right-0 items-center px-2 text-vxvue-700', inputAttrs.disabled ? 'cursor-not-allowed' : 'hover:text-vxvue']"
      :disabled="inputAttrs.disabled"
      aria-label="datepicker-toggle"
      @click.stop="emit('toggle-datepicker')"
    >
      <calendar-icon class="size-6" />
    </button>
    <slot />
  </div>
</template>