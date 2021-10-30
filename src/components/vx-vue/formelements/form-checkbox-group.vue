<template>
  <label class="flex items-center" v-for="(option, ndx) in options" v-bind="containerAttrs">
    <input
        @change="handleChange($event.target)"
        :checked="checked.indexOf(option.key || option.label || option) !== -1"
        :value="option.key || option.label || option"
        :name="$attrs['name']"
        type="checkbox"
        class="h-4 w-4 form-checkbox text-vxvue focus:ring-vxvue"
    >
    <span class="ml-2">
      <slot :option="option">{{ option.label || option }}</slot>
    </span>
  </label>
</template>

<script>
export default {
  data () {
    return {
      checked: []
    }
  },
  props: { modelValue: { type: Array, default: () => [] }, options: Array },
  watch: {
    modelValue (newValue) {
      this.checked = newValue;
    }
  },
  computed: {
    containerAttrs () {
      return (({ name, ...others }) => others)(this.$attrs);
    }
  },
  methods: {
    handleChange(target) {
      if (target.checked) {
        this.checked.push(target.value);
      }
      else {
        this.checked.splice(this.checked.indexOf(target.value), 1);
      }
      this.$emit('update:modelValue', this.checked);
    }
  }
}
</script>