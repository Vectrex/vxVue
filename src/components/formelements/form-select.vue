<template>
    <select
        v-bind="$attrs"
        :value="modelValue"
        class="form-select focus:border-vxvue"
        @change="emit($event.target.selectedIndex)"
    >
      <option
          v-for="option in options"
          :value="option.key !== undefined ? option.key : (option.label || option)"
          :selected="(option.key !== undefined ? option.key : (option.label || option)) === modelValue"
      >{{ option.label || option }}
      </option>
    </select>
</template>

<script>
    export default {
      name: 'form-select',
      props: { options: Array, modelValue: [String, Number] },
      emits: ['update:modelValue'],
      methods: {
        emit (ndx) {
          this.$emit('update:modelValue', this.options[ndx].key !== undefined ? this.options[ndx].key : (this.options[ndx].label || this.options[ndx]));
        }
      }
    }
</script>