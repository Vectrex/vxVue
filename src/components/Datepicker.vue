<script setup>
  import DateInput from "./DateInput.vue"
  import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/vue/24/solid"
  import { onClickOutside } from "@vueuse/core"
  import { ref, computed, watch, nextTick, onMounted } from "vue"

  defineOptions({ inheritAttrs: false })
  const props = defineProps({
    modelValue: { type: [Date, Array], default: null, validator: ((v, props) => v instanceof Date && props.maxNumberOfValues === 1 || v.every(item => item instanceof Date || item === null) && v.length <= props.maxNumberOfValues) },
    shownMonth: Date,
    maxNumberOfValues: { type: Number, default: 1 },
    validFrom: Date,
    validUntil: Date,
    dayNames: { type: Array, default: (() => "S M T W T F S".split(" ")) },
    highlightRange: Boolean,
    locale: { type: String, default: 'default' },
    startOfWeekIndex: { type: Number, default: 0, validator: value => value === 0 || value === 1 },
    hasInput: { type: Boolean, default: true },
  })
  const emit = defineEmits(['update:modelValue', 'month-change', 'year-change'])
  const today = (() => { const d = new Date(); return new Date(d.getFullYear(), d.getMonth(), d.getDate())})()

  const sheetDate = ref(null)
  const selectedDate = ref([])
  const expanded = ref(false)
  const panelShown = ref('days')
  const panelYear = ref(0)
  const align = ref({ horiz: 'left-0', vert: 'top-0' })
  const input = ref(null)
  const calendar = ref(null)
  const toggleButton = ref(null)
  const allowToggle = computed(() => props.hasInput && props.maxNumberOfValues === 1)
  const calendarProps = computed(() => allowToggle.value ? { class: ['absolute', expanded.value ? 'block' : 'hidden'] } : {})
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
  const localizedDayNames = computed(() => !props.startOfWeekIndex ? props.dayNames : props.dayNames.slice(1).concat(props.dayNames[0]))
  watch(() => props.modelValue, v => {
    if (v) {
      if (Array.isArray(v)) {
        const f = [], s = selectedDate.value
        v.forEach(item => { if(item) f.push(new Date(item.getFullYear(), item.getMonth(), item.getDate())) })
        if (f.length !== s.length || ![...new Set([...f, ...s])].every(i => f.filter(j => j.getTime() === i.getTime()).length === s.filter(j => j.getTime() === i.getTime()).length)) {
          selectedDate.value = f
          sheetDate.value = new Date((f[0] || today).getTime())
          sheetDate.value.setDate(1)
        }
      }
      else {
        selectedDate.value = [new Date(v.getFullYear(), v.getMonth(), v.getDate())]
        sheetDate.value = new Date(v.getFullYear(), v.getMonth(), 1)
      }
    }
    else {
      selectedDate.value = []
      sheetDate.value = new Date(today.getFullYear(), today.getMonth(), 1)
    }
  }, { immediate: true })
  watch (() => props.shownMonth, v => {
    sheetDate.value = new Date((v || today).getTime())
    sheetDate.value.setDate(1)
  }, { immediate: true })
  watch(expanded, v => {
    if (v && allowToggle.value) {
      nextTick(() => {
        const inputDim = input.value.$el.getBoundingClientRect()
        const calDim = calendar.value.getBoundingClientRect()
        align.value = {
          horiz: inputDim.right - calDim.width < 0 ? 'left-0' : 'right-0',
          vert: inputDim.bottom + calDim.height > window.innerHeight ? 'bottom-0 -translate-y-12' : 'top-0 translate-y-12'
        }
      })
    }
  })
  onClickOutside(calendar, () => { expanded.value = false; panelShown.value = 'days' }, { ignore: [toggleButton] })
  const setMonth = month => { sheetDate.value = new Date(sheetDate.value.getFullYear(), month, 1); emit("month-change", sheetDate.value) }
  const setYear = year => { sheetDate.value = new Date(year, sheetDate.value.getMonth(), 1); emit("year-change", sheetDate.value) }
  const handleInput = date => emit('update:modelValue', date)
  const selectDate = day => {
    expanded.value = false

    if(props.maxNumberOfValues === 1) {
      emit('update:modelValue', day)
    }
    else {
      const picked = selectedDate.value

      // toggle

      let ndx = picked.findIndex(item => item.getTime() === day.getTime())
      if (ndx !== -1) {
        picked.splice(ndx, 1)
      }

      // append

      else if (picked.length < props.maxNumberOfValues) {
        picked.push(day)
      }
      emit('update:modelValue', picked)
    }
  }
  const isSelected = date => selectedDate.value.find(item => item?.getTime() === date.getTime())
  const daysButtonClass = date => {
    const padded = date.getMonth() !== sheetDate.value.getMonth()
    const selected = isSelected(date)
    const now = date.getTime() === today.getTime()
    const invalid = (props.validFrom && props.validFrom > date) || (props.validUntil && props.validUntil < date)
    const disabled = !selected && props.maxNumberOfValues > 1 && selectedDate.value.length === props.maxNumberOfValues
    const highlight = props.highlightRange && date > Math.min(...selectedDate.value) && date < Math.max(...selectedDate.value)
    return {
        'cursor-not-allowed': invalid || disabled,
        'text-vxvue-700': !invalid && !padded && !now && !selected,
        'text-error': invalid && !padded,
        'text-gray-400': padded && !now && !selected,
        'bg-vxvue-alt-300 font-bold': now && !selected,
        'bg-vxvue-700 text-white': selected,
        'hover:ring-2 hover:ring-vxvue': !invalid,
        'bg-vxvue-100/50': highlight && !now && !selected,
      }
  }
  onMounted(() => toggleButton.value = input.value?.$refs.toggleButton)
</script>

<template>
  <div :class="['relative', $attrs['class']]">
    <date-input
      v-if="allowToggle"
      v-bind="$attrs"
      ref="input"
      :model-value="selectedDate[0]"
      :show-toggle="true"
      class="w-full"
      @toggle-datepicker="expanded = !expanded"
      @update:model-value="handleInput"
    >
      <slot />
    </date-input>

    <div v-bind="calendarProps" ref="calendar" class="overflow-hidden z-10 bg-white rounded-sm shadow-md min-w-72 sm:min-w-80" :class="[align.horiz, align.vert]">
      <template v-if="panelShown === 'days'">
        <div class="flex items-center py-2 px-3 text-white bg-vxvue-700">
          <div class="flex justify-between w-1/2">
            <button class="shrink-0 text-vxvue-100 hover:text-vxvue-50" @click.stop="setMonth(sheetDate.getMonth() - 1)">
              <chevron-left-icon class="size-6" />
            </button>
            <span>{{ sheetDate.toLocaleString(locale, { month: 'long' }) }}</span>
            <button class="shrink-0 text-vxvue-100 hover:text-vxvue-50" @click.stop="setMonth(sheetDate.getMonth() + 1)">
              <chevron-right-icon class="size-6" />
            </button>
          </div>
          <div class="flex justify-between w-1/2">
            <button class="shrink-0 text-vxvue-100 hover:text-vxvue-50" @click.stop="setYear(sheetDate.getFullYear() - 1)">
              <chevron-left-icon class="size-6" />
            </button>
            <button class="text-vxvue-100 hover:text-vxvue-50" @click="panelShown = 'years'; panelYear = sheetDate.getFullYear()">
              {{ sheetDate.getFullYear() }}
            </button>
            <button class="shrink-0 text-vxvue-100 hover:text-vxvue-50" @click.stop="setYear(sheetDate.getFullYear() + 1)">
              <chevron-right-icon class="size-6" />
            </button>
          </div>
        </div>

        <div class="grid grid-cols-7 gap-0.5 p-0.5">
          <div v-for="(weekday, ndx) in localizedDayNames" :key="ndx" class="py-2 text-center bg-gray-200">
            {{ weekday }}
          </div>

          <button
            v-for="day in days"
            :key="day"
            :class="['py-2 rounded-xs block text-center', daysButtonClass(day)]"
            :disabled="(validFrom && validFrom > day) || (validUntil && validUntil < day) || maxNumberOfValues > 1 && selectedDate.length === maxNumberOfValues && !isSelected(day)"
            @click.stop="selectDate(day)"
          >
            {{ day.getDate() }}
          </button>
        </div>
      </template>
      <template v-if="panelShown === 'years'">
        <div class="flex justify-between items-center py-2 px-3 text-white bg-vxvue-700">
          <button class="shrink-0 text-vxvue-100 hover:text-vxvue-50" @click.stop="panelYear -= 10">
            <chevron-left-icon class="size-6" />
          </button>
          <span>{{ panelYear }} - {{ panelYear + 9 }}</span>
          <button class="shrink-0 text-vxvue-100 hover:text-vxvue-50" @click.stop="panelYear += 10">
            <chevron-right-icon class="size-6" />
          </button>
        </div>

        <div class="grid grid-cols-2 gap-0.5 p-0.5">
          <div
            v-for="n in 10"
            :key="n"
            class="text-center hover:ring-2 text-vxvue-700 hover:ring-vxvue"
          >
            <button class="py-2 px-3" @click.stop="setYear(panelYear + n - 1); panelShown = 'days'">
              {{ panelYear + n - 1 }}
            </button>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>
