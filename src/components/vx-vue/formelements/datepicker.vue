<template>
  <div v-bind="rootProps">

    <date-input
        v-if="hasInput"
        v-model="selectedDate"
        @toggle-datepicker="toggleDatepicker"
        v-bind="inputProps"
        ref="input"
    ></date-input>

    <div class="calendar" v-bind="calendarProps" ref="calendar"
         :class="align === 'left' ? 'align-left' : 'align-right'">
      <div class="calendar-nav navbar">
        <button class="btn btn-action btn-link btn-large prvMon" @click.stop="previousMonth"></button>
        <div class="month navbar-primary">{{ monthLabel }} {{ sheetDate.getFullYear() }}</div>
        <button class="btn btn-action btn-link btn-large nxtMon" @click.stop="nextMonth"></button>
      </div>
      <div class="calendar-container">
        <div class="calendar-header">
          <div v-for="weekday in weekdays" class="calendar-date">{{ weekday }}</div>
        </div>
        <div class="calendar-body">
          <div v-for="day in days" class="calendar-date text-center"
               :class="['prev-month', '', 'next-month'][day.getMonth() - sheetDate.getMonth() + 1]">
            <button
                type="button"
                class="date-item"
                :class="{
                  'active': selectedDate && day.getTime() === selectedDate.getTime(),
                  'date-today': day.getTime() === today.getTime()
                }"
                :disabled="(validFrom && validFrom) > day || (validUntil && validUntil < day)"
                @click.stop="(validFrom && validFrom) > day || (validUntil && validUntil < day) ? null : selectDate(day)"
            >{{ day.getDate() }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DateInput from './date-input';

export default {
  name: 'date-picker',
  components: {
    DateInput
  },
  emits: ['update:modelValue', 'month-change'],

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
        class: ['datepicker', this.$attrs['class']],
        style: {position: 'relative'}
      }
    },
    inputProps() {
      return {
        style: {position: 'relative'},
        inputFormat: this.$attrs['input-format'],
        outputFormat: this.$attrs['output-format'],
        dayNames: this.$attrs['day-names'],
        monthNames: this.$attrs['month-names'],
        showButton: this.$attrs['show-button']
      }
    },
    calendarProps() {
      return {
        style: this.hasInput ? {
          display: this.expanded ? 'block' : 'none',
          position: 'absolute',
          top: '100%',
          transform: 'translateY(.2rem)',
          'z-index': 300
        } : {}
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