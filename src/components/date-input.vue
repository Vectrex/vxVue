<script setup>
  import { parseDate } from "@/composables/parseDate"
  import { formatDate } from "@vueuse/core"
  import { computed, ref, useAttrs, watch } from "vue"

  const emit = defineEmits(['update:modelValue', 'toggle-datepicker'])
  const props = defineProps({
        outputFormat: { type: String, default: 'YYYY-MM-DD' },
        inputFormat: { type: String, default: 'YYYY-MM-DD' },
        showButton: { type: Boolean, default: true },
        locale: { type: String, default: 'default' },
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
    <div v-if="dateString">
      <div class="block flex items-center w-full form-input bg-vxvue-50" :class="{ 'pr-10': showButton }">
        <span class="text-vxvue-700">{{ dateString }}</span>
        <button @click="emit('update:modelValue', null)" class="inline-flex flex-shrink-0 justify-center items-center ml-2 w-4 h-4 rounded-full focus:text-white focus:outline-none text-vxvue hover:bg-vxvue-100 hover:text-vue-700 focus:bg-vxvue-700">
          <svg class="w-2 h-2" stroke="currentColor" fill="none" viewBox="0 0 8 8"><path stroke-linecap="round" stroke-width="1.5" d="M1 1l6 6m0-6L1 7" /></svg>
        </button>
      </div>
    </div>
    <input v-else
       type="text"
       class="block w-full form-input focus:border-vxvue peer"
       :class="{ 'pr-10': showButton }"
       v-model="inputString"
       @blur="emit('update:modelValue', parseDate(inputString, props.inputFormat).date?.value || null)"
       @input.prevent
       v-bind="inputAttrs"
    >
    <button
      v-if="showButton"
      class="flex absolute inset-y-0 right-0 items-center px-2 text-vxvue-700 hover:text-vxvue"
      @click.stop="emit('toggle-datepicker')"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    </button>
    <slot />
  </div>
</template>