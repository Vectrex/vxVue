<script setup>
    import Datepicker from "../src/components/datepicker.vue"
    import { ref } from "vue"
    const pickedDate = ref(null)
</script>

# Datepicker

A date picker component which allows the selection of a single date.

## Default Component
```html
<datepicker v-model="pickedDate" />
```
::: info Result
<datepicker v-model="pickedDate" />
:::

## Properties
| Name         | Type   | Default | Description |
|--------------|--------|---------|-------------|
| `modelValue` | `Date` |         |             |

## Events
| Name                | Arguments           | Description |
|---------------------|---------------------|-------------|
| `update:modelValue` | `pickedDate` - Date |             |
