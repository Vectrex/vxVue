<script setup>
  import DateInput from './DateInput.vue'
  import VxVueTransition from './VxVueTransition.vue'
  import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/24/solid'
  import { onClickOutside } from '@vueuse/core'
  import { computed, nextTick, ref, watch } from 'vue'

  defineOptions({ inheritAttrs: false })

  const props = defineProps({
    shownMonth: Date,
    maxNumberOfValues: { type: Number, default: 1 },
    validFrom: Date,
    validUntil: Date,
    dayNames: { type: Array, default: (() => 'S M T W T F S'.split(' ')) },
    highlightRange: Boolean,
    locale: { type: String, default: 'default' },
    startOfWeekIndex: { type: Number, default: 0, validator: value => value === 0 || value === 1 },
    hasInput: { type: Boolean, default: true },
  })
  const model = defineModel({
    type: [Date, Array],
    default: null,
    validator: ((v, props) => v instanceof Date && props.maxNumberOfValues === 1 || v.every(item => item instanceof Date || item === null) && v.length <= props.maxNumberOfValues)
  })
  const emit = defineEmits(['month-change', 'year-change'])
  const today = (() => { const d = new Date(); return new Date(d.getFullYear(), d.getMonth(), d.getDate())})()

  const panelDate = ref(null)
  const selectedDate = ref([])
  const expanded = ref(false)
  const panelShown = ref('days')
  const panelYear = ref(0)
  const align = ref({ horiz: 'left-0', vert: 'top-0' })
  const input = ref(null)
  const calendar = ref(null)
  const allowToggle = computed(() => props.hasInput && props.maxNumberOfValues === 1)
  const days = computed(() => {
    const
      dates = [],
      y = panelDate.value.getFullYear(),
      m = panelDate.value.getMonth(),
      nextMonth = new Date(y, m + 1, 0),
      precedingDays = (new Date(y, m, 0)).getDay() + 1 - props.startOfWeekIndex,
      trailingDays = (6 + props.startOfWeekIndex - nextMonth.getDay()) % 7
    for (let i = -precedingDays, j = nextMonth.getDate() + trailingDays; i < j; ++i) {
      dates.push(new Date(y, m, i + 1))
    }
    return dates
  })
  const localizedDayNames = computed(() => !props.startOfWeekIndex ? props.dayNames : props.dayNames.slice(1).concat(props.dayNames[0]))
  const selectedTimestamps = computed(() => selectedDate.value.map(d => d.getTime()))
  const selectedMinMax = computed(() => ({
    min: selectedTimestamps.value.length ? Math.min(...selectedTimestamps.value) : null,
    max: selectedTimestamps.value.length ? Math.max(...selectedTimestamps.value) : null
  }))
  const daysMeta = computed(() => {
    const result = new Map()
    for (const date of days.value) {
      const time = date.getTime()
      const invalid = (props.validFrom && props.validFrom > date) || (props.validUntil && props.validUntil < date)
      const padded = date.getMonth() !== panelDate.value.getMonth()
      const selected = selectedTimestamps.value.includes(time)
      const now = time === today.getTime()
      const disabled = invalid || props.maxNumberOfValues > 1 && selectedDate.value.length === props.maxNumberOfValues && !isSelected(date)
      const highlighted = props.highlightRange && selectedMinMax.value.min !== null && selectedMinMax.value.max !== null && time >= selectedMinMax.value.min && time <= selectedMinMax.value.max
      result.set(time, {
        class: {
          'cursor-not-allowed': invalid || disabled,
          'text-vxvue-700': !invalid && !padded && !now && !selected,
          'text-error': invalid && !padded,
          'text-gray-400': padded && !now && !selected,
          'bg-vxvue-alt-300 font-bold': now && !selected,
          'bg-vxvue-700 text-white': selected,
          'hover:ring-2 hover:ring-vxvue': !invalid,
          'bg-vxvue-100/50': highlighted && !now && !selected,
        },
        disabled: disabled,
      })
    }
    return result
  })

  const setMonth = month => { panelDate.value = new Date(panelDate.value.getFullYear(), month, 1); emit('month-change', panelDate.value) }
  const setYear = year => { panelDate.value = new Date(year, panelDate.value.getMonth(), 1); emit('year-change', panelDate.value) }
  const handleInput = date => model.value = date
  const selectDate = day => {
    expanded.value = false

    if(props.maxNumberOfValues === 1) {
      model.value = day
    }
    else {
      const picked = [...selectedDate.value]

      // toggle

      let ndx = picked.findIndex(item => item.getTime() === day.getTime())
      if (ndx !== -1) {
        picked.splice(ndx, 1)
      }

      // append

      else if (picked.length < props.maxNumberOfValues) {
        picked.push(day)
      }
      model.value = picked
    }
  }
  const isSelected = date => selectedDate.value.find(item => item?.getTime() === date.getTime())

  onClickOutside(calendar, () => { expanded.value = false; panelShown.value = 'days' }, { ignore: [input.value?.$refs.toggleButton] })
  watch(expanded, v => {
    if (v && allowToggle.value) {
      nextTick(() => {
        const inputDim = input.value.$el.getBoundingClientRect()
        const panelDim = calendar.value.getBoundingClientRect()
        align.value.horiz = inputDim.right - panelDim.width < 0 ? 'left-0' : 'right-0';
        align.value.vert = inputDim.bottom + panelDim.height > window.innerHeight ? 'bottom-0 -translate-y-12' : 'top-0 translate-y-12'
      })
    }
  })
  const toTimestamps = dates => dates.map(d => d.getTime()).sort()
  watch(model, v => {
    if (!v) {
      selectedDate.value = []
      panelDate.value = new Date(today.getFullYear(), today.getMonth(), 1)
      return
    }
    const incoming = Array.isArray(v) ? toTimestamps(v.filter(Boolean)) : [v.getTime()]
    const current = toTimestamps(selectedDate.value)
    if (incoming.length !== current.length || !incoming.every((i, n) => i === current[n])) {
      selectedDate.value = incoming.map(i => new Date(i))
      panelDate.value = new Date(incoming[0] || today.getTime())
      panelDate.value.setDate(1)
    }
  }, { immediate: true })
  watch (() => props.shownMonth, v => {
    panelDate.value = new Date((v || today).getTime())
    panelDate.value.setDate(1)
  }, { immediate: true })
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
    <vx-vue-transition name="fade">
      <div
        v-show="expanded"
        ref="calendar"
        :class="['overflow-hidden z-(--zIndex-dropdown) bg-white rounded-sm shadow-md min-w-72 sm:min-w-80',
            align.horiz, align.vert,
            {
              absolute: allowToggle
            },
        ]"
      >
        <template v-if="panelShown === 'days'">
          <div class="flex items-center py-2 px-3 text-white bg-vxvue-700">
            <div class="flex justify-between w-1/2">
              <button class="shrink-0 text-vxvue-100 hover:text-vxvue-50" @click.stop="setMonth(panelDate.getMonth() - 1)">
                <chevron-left-icon class="size-6" />
              </button>
              <span>{{ panelDate.toLocaleString(locale, { month: 'long' }) }}</span>
              <button class="shrink-0 text-vxvue-100 hover:text-vxvue-50" @click.stop="setMonth(panelDate.getMonth() + 1)">
                <chevron-right-icon class="size-6" />
              </button>
            </div>
            <div class="flex justify-between w-1/2">
              <button class="shrink-0 text-vxvue-100 hover:text-vxvue-50" @click.stop="setYear(panelDate.getFullYear() - 1)">
                <chevron-left-icon class="size-6" />
              </button>
              <button class="text-vxvue-100 hover:text-vxvue-50" @click="panelShown = 'years'; panelYear = panelDate.getFullYear()">
                {{ panelDate.getFullYear() }}
              </button>
              <button class="shrink-0 text-vxvue-100 hover:text-vxvue-50" @click.stop="setYear(panelDate.getFullYear() + 1)">
                <chevron-right-icon class="size-6" />
              </button>
            </div>
          </div>

          <div class="grid grid-cols-7 gap-0.5 p-0.5">
            <div v-for="weekday in localizedDayNames" class="py-2 text-center bg-gray-200">
              {{ weekday }}
            </div>

            <button
              v-for="day in days"
              :key="day.getTime()"
              class="py-2 rounded-xs block text-center"
              v-bind="daysMeta.get(day.getTime())"
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
    </vx-vue-transition>
  </div>
</template>
