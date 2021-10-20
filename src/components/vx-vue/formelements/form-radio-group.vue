<template>
  <div v-bind="$attrs">
    <label class="form-radio" v-for="option in options">
      <input
          @change="$emit('update:modelValue', $event.target.checked)"
          :checked="(option.key || option.label || option) == modelValue"
          :value="option.key || option.label || option"
          type="radio"
      >
      <i class="form-icon"></i> {{ option.label || option }}
    </label>
  </div>
</template>

<script>
export default {
  props: { modelValue: [String, Number], options: Array }
}
</script>