<template>
  <div class="relative inline-block" :class="$attrs['class']">
    <div v-if="dateString">
      <div class="block w-full form-input bg-vxvue-50 flex items-center" :class="{ 'pr-10': showButton }">
        <span class="text-vxvue-700">{{ dateString }}</span>
        <button @click="handleClear" type="button" class="flex-shrink-0 ml-2 h-4 w-4 rounded-full inline-flex items-center justify-center text-vxvue hover:bg-vxvue-100 hover:text-vue-700 focus:outline-none focus:bg-vxvue-700 focus:text-white">
          <svg class="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8"><path stroke-linecap="round" stroke-width="1.5" d="M1 1l6 6m0-6L1 7" /></svg>
        </button>
      </div>
    </div>
    <input v-else
       type="text"
       class="block w-full form-input focus:border-vxvue"
       :class="{ 'pr-10': showButton }"
       v-model="inputString"
       @blur="handleBlur"
       @input.prevent
       v-bind="inputAttrs"
    >
    <button
      v-if="showButton"
      type="button"
      class="absolute right-0 pr-3 flex items-center inset-y-0 text-vxvue-700"
      @click.stop="$emit('toggle-datepicker')"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
      </svg>
    </button>
  </div>
</template>

<script>
import DateFunctions from "../../../util/date-functions.js";

export default {
  emits: ['update:modelValue', 'toggle-datepicker'],
  name: 'date-input',
  data() {
    return {
      inputString: ''
    }
  },
  inheritAttrs: false,
  props: {
    monthNames: {
      type: Array,
      default: () => "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" ")
    },
    dayNames: {
      type: Array,
      default: () => "Mon Tue Wed Thu Fri Sat Sun".split(" ")
    },
    outputFormat: {
      type: String,
      default: "y-mm-dd"
    },
    inputFormat: {
      type: String,
      default: 'y-m-d'
    },
    showButton: {
      type: Boolean,
      default: true
    },
    modelValue: Date
  },

  watch: {
    modelValue(value) {
      this.inputString = value ? DateFunctions.formatDate(value, this.outputFormat) : '';
    }
  },

  computed: {
    dateString() {
      return this.modelValue ? DateFunctions.formatDate(this.modelValue, this.outputFormat) : '';
    },
    inputAttrs() {
      let attrs = Object.assign({}, this.$attrs);
      delete attrs['class'];
      return attrs;
    }
  },

  methods: {
    handleBlur() {
      let date = DateFunctions.parseDate(this.inputString, this.inputFormat);
      this.$emit('update:modelValue', date || null);
    },
    handleClear() {
      this.$emit('update:modelValue', null);
    }
  }
}
</script>