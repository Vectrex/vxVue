<script setup>
  import DateInput from "./date-input.vue"
  import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/vue/24/solid"
  import { onClickOutside } from "@vueuse/core"
  import { ref, computed, watch, nextTick, onMounted } from "vue"

  defineOptions({ inheritAttrs: false })
  const props = defineProps({
    modelValue: [Date, Boolean],
    validFrom: Date,
    validUntil: Date,
    dayNames: { type: Array, default: (() => "S M T W T F S".split(" ")) },
    locale: { type: String, default: 'default' },
    startOfWeekIndex: { type: Number, default: 0, validator: value => value === 0 || value === 1 },
    hasInput: { type: Boolean, default: true }
  })
  const emit = defineEmits(['update:modelValue', 'month-change', 'year-change'])
  const today = (() => { let d = new Date(); return new Date(d.getFullYear(), d.getMonth(), d.getDate())})()

  const sheetDate = ref(new Date(today.getFullYear(), today.getMonth(), 1))
  const selectedDate = ref(null)
  const expanded = ref(!props.hasInput)
  const panelShown = ref('days')
  const panelYear = ref(0)
  const align = ref({ horiz: 'left-0', vert: 'top-0' })
  const input = ref(null)
  const calendar = ref(null)
  const toggleButton = ref(null)
  const calendarProps = computed(() => props.hasInput ? { class: ['absolute', expanded.value ? 'block' : 'hidden'] } : {})
  const days = computed(() => {
    const
      dates = [],
      y = sheetDate.value.getFullYear(),
      m = sheetDate.value.getMonth(),
      nextMonth = new Date(y, m + 1, 0),
      precedingDays = (new Date(y, m, 0)).getDay() + 1 - props.startOfWeekIndex,
      trailingDays = (6 + props.startOfWeekIndex - nextMonth.getDay()) % 7
    for (let i = -precedingDays, j = nextMonth.getDate() + trailingDays; i < j; ++i) {
      dates.push(new Date(y, m, i + 1))
    }
    return dates
  })
  const localizedDayNames = computed(() => !props.startOfWeekIndex ? props.dayNames.slice() : props.dayNames.slice(1).concat(props.dayNames[0]))
  watch(() => props.modelValue, v => {
    if (v) {
      selectedDate.value = new Date(v.getFullYear(), v.getMonth(), v.getDate())
      sheetDate.value = new Date(selectedDate.value.getTime())
    }
    else {
      selectedDate.value = null
      sheetDate.value = new Date(today.getTime())
    }
    sheetDate.value.setDate(1)
  }, { immediate: true })
  watch(expanded, v => {
    if (v && props.hasInput) {
      nextTick(() => {
        const inputDim = input.value.$el.getBoundingClientRect()
        const calDim = calendar.value.getBoundingClientRect()
        align.value = {
          horiz: inputDim.left + calDim.width > window.innerWidth ? 'right-0' : 'left-0',
          vert: inputDim.bottom + calDim.height > window.innerHeight ? 'bottom-0 -translate-y-12' : 'top-0 translate-y-12'
        }
      })
    }
  })
  onClickOutside(calendar, () => { expanded.value = false; panelShown.value = 'days' }, { ignore: [toggleButton] })
  const setMonth = month => { sheetDate.value = new Date(sheetDate.value.getFullYear(), month, 1); emit("month-change", sheetDate.value) }
  const setYear = year => { sheetDate.value = new Date(year, sheetDate.value.getMonth(), 1); emit("year-change", sheetDate.value) }
  const selectDate = day => { expanded.value = !props.hasInput; selectedDate.value = day; emit('update:modelValue', day) }
  const handleInput = date => { selectedDate.value = date; emit('update:modelValue', date) }
  const daysButtonClass = date => {
    const padded = date.getMonth() !== sheetDate.value.getMonth()
    const selected = selectedDate.value && date.getTime() === selectedDate.value.getTime()
    const now = date.getTime() === today.getTime()
    const invalid = (props.validFrom && props.validFrom > date) || (props.validUntil && props.validUntil < date)
    return [
        'py-2 px-3 rounded-sm block text-center',
      {
        'text-vxvue-700': !invalid && !padded && !now && !selected,
        'text-error': invalid && !padded,
        'text-gray-400': padded && !now && !selected,
        'bg-gray-200': now && !selected,
        'bg-vxvue-700 text-white': selected,
        'hover:ring-2 hover:ring-vxvue': !invalid
      }
    ]
  }
  onMounted(() => toggleButton.value = input.value?.$refs.toggleButton)
</script>

<template>
  <div :class="['relative', $attrs['class']]">

    <date-input
        v-if="hasInput"
        :modelValue="selectedDate"
        @toggle-datepicker="expanded = !expanded"
        @update:modelValue="handleInput"
        v-bind="$attrs"
        ref="input"
        class="w-full"
        :locale="locale"
    ><slot /></date-input>

    <div class="z-10 bg-white shadow-md min-w-80" v-bind="calendarProps" ref="calendar" :class="[align.horiz, align.vert]">
      <template  v-if="panelShown === 'days'">
        <div class="flex items-center py-2 px-3 text-white bg-vxvue-700">
          <div class="flex justify-between w-1/2">
            <button @click.stop="setMonth(sheetDate.getMonth() - 1)" class="flex-shrink-0 text-vxvue-100 hover:text-vxvue-50">
              <chevron-left-icon class="size-6" />
            </button>
            <span>{{ sheetDate.toLocaleString(locale, { month: 'long'}) }}</span>
            <button @click.stop="setMonth(sheetDate.getMonth() + 1)" class="flex-shrink-0 text-vxvue-100 hover:text-vxvue-50">
              <chevron-right-icon class="size-6" />
            </button>
          </div>
          <div class="flex justify-between w-1/2">
            <button @click.stop="setYear(sheetDate.getFullYear() - 1)" class="flex-shrink-0 text-vxvue-100 hover:text-vxvue-50">
              <chevron-left-icon class="size-6" />
            </button>
            <button class="text-vxvue-100 hover:text-vxvue-50" @click="panelShown = 'years'; panelYear = sheetDate.getFullYear()">{{ sheetDate.getFullYear() }}</button>
            <button @click.stop="setYear(sheetDate.getFullYear() + 1)" class="flex-shrink-0 text-vxvue-100 hover:text-vxvue-50">
              <chevron-right-icon class="size-6" />
            </button>
          </div>
        </div>

        <div class="grid grid-cols-7 gap-0.5 p-0.5">
          <div v-for="(weekday, ndx) in localizedDayNames" class="py-2 text-center bg-gray-200" :key="ndx">{{ weekday }}</div>

          <button
              v-for="day in days"
              :class="daysButtonClass(day)"
              :disabled="(validFrom && validFrom > day) || (validUntil && validUntil < day)"
              @click.stop="(validFrom && validFrom > day) || (validUntil && validUntil < day) ? null : selectDate(day)"
          >{{ day.getDate() }}</button>
        </div>
      </template>
      <template v-if="panelShown === 'years'">
        <div class="flex justify-between items-center py-2 px-3 text-white bg-vxvue-700">
          <button @click.stop="panelYear -= 10" class="flex-shrink-0 text-vxvue-100 hover:text-vxvue-50">
            <chevron-left-icon class="size-6" />
          </button>
          <span>{{ panelYear }} - {{ panelYear + 9 }}</span>
          <button @click.stop="panelYear += 10" class="flex-shrink-0 text-vxvue-100 hover:text-vxvue-50">
            <chevron-right-icon class="size-6" />
          </button>
        </div>

        <div class="grid grid-cols-2 gap-0.5 p-0.5">
          <div v-for="n in 10" class="text-center text-vxvue-700 hover:ring-2 hover:ring-vxvue">
            <button class="py-2 px-3" @click.stop="setYear(panelYear + n - 1); panelShown = 'days'">{{ panelYear + n - 1 }}</button>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>
