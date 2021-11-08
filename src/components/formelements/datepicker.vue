<script setup>
  import DateInput from './date-input.vue';
</script>

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
        :day-names="dayNames"
        :month-names="monthNames"
    ></date-input>

    <div class="bg-white z-10 shadow-md" v-bind="calendarProps" ref="calendar" :class="[alignHoriz, alignVert]">

      <div class="flex flex-row items-center bg-vxvue-700 text-white py-2 px-3">
        <button type="button" @click.stop="previousMonth" class="flex-shrink-0 hover:text-vxvue-50 text-vxvue-100">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div class="flex-grow text-center">{{ monthLabel }} {{ sheetDate.getFullYear() }}</div>
        <button type="button" @click.stop="nextMonth" class="flex-shrink-0 hover:text-vxvue-50 text-vxvue-100">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div class="grid grid-cols-7 gap-0.5 p-0.5">

        <div v-for="weekday in localizedDayNames" class="text-center bg-gray-200 py-2">{{ weekday }}</div>

        <div v-for="day in days" class="text-center"
             :class="day.getMonth() - sheetDate.getMonth() === 0 ? 'text-vxvue-700' : 'text-gray-400'">
          <button
              type="button"
              class="py-2 px-3 rounded-sm"
              :class="{
                'bg-vxvue-700 text-white': selectedDate && day.getTime() === selectedDate.getTime(),
                'bg-gray-200': day.getTime() === today.getTime()
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
export default {
  name: 'date-picker',
  emits: ['update:modelValue', 'month-change'],
  inheritAttrs: false,

  data() {
    return {
      sheetDate: null,
      selectedDate: null,
      expanded: !this.hasInput,
      alignHoriz: 'left-0',
      alignVert: 'top-0',
      today: (() => { let d = new Date(); return new Date(d.getFullYear(), d.getMonth(), d.getDate())})()
    };
  },

  props: {
    modelValue: Date,
    validFrom: Date,
    validUntil: Date,
    dayNames: {
      type: Array,
      default: (() => "S M T W T F S".split(" "))
    },
    monthNames: {
      type: Array,
      default: (() => "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "))
    },
    startOfWeekIndex: {
      type: Number,
      default: 0,
      validator: value => value === 0 || value === 1
    },
    hasInput: {
      type: Boolean,
      default: true
    }
  },

  watch: {
    modelValue(newValue) {
      if (newValue) {
        this.selectedDate = new Date(newValue.getFullYear(), newValue.getMonth(), newValue.getDate()); // crop any timedata
        this.sheetDate = new Date(this.selectedDate.getTime());
      }
      else {
        this.selectedDate = null;
        this.sheetDate = new Date(this.today.getTime());
      }
      this.sheetDate.setDate(1);
    },
    expanded(newValue) {
      if (newValue && this.hasInput) {
        this.$nextTick(() => {
          const inputDim = this.$refs.input.$el.getBoundingClientRect();
          const calDim = this.$refs.calendar.getBoundingClientRect();
          this.alignHoriz = inputDim.left + calDim.width > window.innerWidth ? 'right-0' : 'left-0';
          this.alignVert = inputDim.bottom + calDim.height > window.innerHeight ? 'bottom-0 -translate-y-12' : 'top-0 translate-y-12';
        });
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
      let attrs = Object.assign({}, this.$attrs);
      delete attrs['class'];
      return attrs;
    },
    calendarProps() {
      if (this.hasInput) {
        return {
          'class': [
              'absolute',
              this.expanded ? 'block' : 'hidden'
          ]
        }
      }
    },
    days() {
      const dates = [], yr = this.sheetDate.getFullYear(), mon = this.sheetDate.getMonth();
      const nextMonth = new Date(yr, mon + 1, 0);
      const preceedingDays = (new Date(yr, mon, 0)).getDay() + 1 - this.startOfWeekIndex;
      const trailingDays = (6 + this.startOfWeekIndex - nextMonth.getDay()) % 7;

      for (let i = -preceedingDays, j = nextMonth.getDate() + trailingDays; i < j; ++i) {
        dates.push(new Date(yr, mon, i + 1));
      }

      return dates;
    },
    monthLabel() {
      return this.monthNames[this.sheetDate.getMonth()];
    },
    localizedDayNames() {
      if (!this.startOfWeekIndex) {
        return this.dayNames.slice();
      }
      return this.dayNames.slice(1).concat(this.dayNames[0]);
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