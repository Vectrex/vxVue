<template>
  <div v-bind="rootProps">

    <date-input
        v-if="hasInput"
        :modelValue="selectedDate"
        @toggle-datepicker="toggleDatepicker"
        @update:modelValue="handleInput"
        v-bind="inputProps"
        ref="input"
        class="w-full"
    ></date-input>

    <div class="w-full bg-white z-10" v-bind="calendarProps" ref="calendar"
         :class="align === 'left' ? 'left-0' : 'right-0'">
      <div class="w-full flex flex-row items-center">
        <button type="button" @click.stop="previousMonth" class="flex-shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div class="flex-grow text-center">{{ monthLabel }} {{ sheetDate.getFullYear() }}</div>
        <button type="button" @click.stop="nextMonth" class="flex-shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      <div class="grid grid-cols-7">
        <div v-for="weekday in weekdays" class="text-center">{{ weekday }}</div>
        <div v-for="day in days" class="text-center"
             :class="['text-gray-600', '', 'text-gray-600'][day.getMonth() - sheetDate.getMonth() + 1]">
          <button
              type="button"
              class="date-item"
              :class="{
                'bg-vxvue-50': selectedDate && day.getTime() === selectedDate.getTime(),
                'bg-red-400': day.getTime() === today.getTime()
              }"
              :disabled="(validFrom && validFrom) > day || (validUntil && validUntil < day)"
              @click.stop="(validFrom && validFrom) > day || (validUntil && validUntil < day) ? null : selectDate(day)"
          >{{ day.getDate() }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DateInput from './date-input.vue';

export default {
  name: 'date-picker',
  components: {
    DateInput
  },
  emits: ['update:modelValue', 'month-change'],
  inheritAttrs: false,

  data() {
    return {
      sheetDate: null,
      selectedDate: null,
      expanded: !this.hasInput,
      align: 'left'
    };
  },

  watch: {
    modelValue(newValue) {
      if (newValue) {
        this.selectedDate = new Date(newValue.getFullYear(), newValue.getMonth(), newValue.getDate()); // crop any timedata
        this.sheetDate = new Date(this.selectedDate.getTime());
      }
      else {
        this.selectedDate = null;
        this.sheetDate = this.today;
      }
      this.sheetDate.setDate(1);
    },
    expanded(newValue) {
      if (newValue && this.hasInput) {
        this.$nextTick(() =>
            this.align = this.$refs.input.$el.getBoundingClientRect().left + this.$refs.calendar.getBoundingClientRect().width > window.innerWidth ? 'right' : 'left'
        );
      }
    }
  },

  computed: {
    rootProps() {
      return {
        class: ['relative', this.$attrs['class']]
      }
    },
    inputProps() {
      return {
        inputFormat: this.$attrs['input-format'],
        outputFormat: this.$attrs['output-format'],
        dayNames: this.$attrs['day-names'],
        monthNames: this.$attrs['month-names'],
        showButton: this.$attrs['show-button']
      }
    },
    calendarProps() {
      if (this.hasInput) {
        return {
          'class': [
              'absolute',
              this.expanded ? 'block' : 'hidden'
          ]
          /*
            display: this.expanded ? 'block' : 'none',
            position: 'absolute',
            top: '100%',
            transform: 'translateY(.2rem)',
            'z-index': 300
          } : {}

           */
        }
      }
    },
    days() {
      const dates = [], yr = this.sheetDate.getFullYear(), mon = this.sheetDate.getMonth();
      const nextMonth = new Date(yr, mon + 1, 0);
      const preceedingDays = (new Date(yr, mon, 0)).getDay() + 1 - this.startOfWeekIndex;
      const trailingDays = (7 - nextMonth.getDay()) % 7 - 1 + this.startOfWeekIndex;

      for (let i = -preceedingDays, j = nextMonth.getDate() + trailingDays; i < j; ++i) {
        dates.push(new Date(yr, mon, i + 1));
      }

      return (dates);
    },
    monthLabel() {
      return this.monthNames[this.sheetDate.getMonth()];
    },
    today() {
      const now = new Date();
      return new Date(now.getFullYear(), now.getMonth(), now.getDate());
    }
  },

  props: {
    modelValue: Date,
    validFrom: Date,
    validUntil: Date,
    weekdays: {
      type: Array,
      default: (() => "M T W T F S S".split(" "))
    },
    monthNames: {
      type: Array,
      default: (() => "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "))
    },
    startOfWeekIndex: {
      type: Number,
      default: 1,
      validator: value => !value || value === 1
    },
    hasInput: {
      type: Boolean,
      default: true
    }
  },
  created () {
    this.sheetDate = new Date(this.today.getTime());
    this.sheetDate.setDate(1);
  },
  mounted() {
    if (this.hasInput) {
      document.body.addEventListener('click', this.handleBodyClick);
    }
    if (this.modelValue) {
      this.sheetDate = new Date(this.modelValue.getTime());
      this.sheetDate.setDate(1);
      this.selectedDate = new Date(this.modelValue.getFullYear(), this.modelValue.getMonth(), this.modelValue.getDate());
    }
  },
  beforeUnmount() {
    document.body.removeEventListener('click', this.handleBodyClick);
  },

  methods: {
    previousMonth() {
      this.sheetDate = new Date(this.sheetDate.getFullYear(), this.sheetDate.getMonth() - 1, 1);
      this.$emit("month-change", this.sheetDate);
    },
    nextMonth() {
      this.sheetDate = new Date(this.sheetDate.getFullYear(), this.sheetDate.getMonth() + 1, 1);
      this.$emit("month-change", this.sheetDate);
    },
    selectDate(day) {
      this.selectedDate = day;
      this.$emit('update:modelValue', day);
      this.expanded = !this.hasInput;
    },
    toggleDatepicker() {
      this.expanded = !this.expanded;
    },
    handleBodyClick() {
      this.expanded = false;
    },
    handleInput(date) {
      this.selectedDate = date;
      this.$emit('update:modelValue', date);
    }
  }
}
</script>