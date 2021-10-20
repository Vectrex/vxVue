<template>
    <select
        v-bind="$attrs"
        :value="modelValue"
        class="form-select"
        @change="$emit('update:modelValue', $event.target.value)"
    >
      <option
          v-for="option in options"
          :value="option.key || option.label || option"
          :selected="(option.key || option.label || option) == modelValue"
      >{{ option.label || option }}
      </option>
    </select>
</template>

<script>
    export default {
      name: 'form-select',
      props: { options: Array, modelValue: [String, Number] },
      emits: ['update:modelValue']
    }
</script>