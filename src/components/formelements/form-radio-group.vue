<template>
  <label class="flex items-center" v-for="option in options" v-bind="containerAttrs">
    <input
        @change="$emit('update:modelValue', $event.target.value)"
        :checked="(option.key || option.label || option) == modelValue"
        :value="option.key || option.label || option"
        :name="$attrs['name']"
        type="radio"
        class="h-4 w-4 form-radio text-vxvue focus:ring-vxvue"
    >
    <span class="ml-2">
      <slot :option="option">{{ option.label || option }}</slot>
    </span>
  </label>
</template>

<script>
export default {
  props: { modelValue: [String, Number], options: Array },
  computed: {
    containerAttrs () {
      return (({ name, ...others }) => others)(this.$attrs);
    }
  }
}
</script>