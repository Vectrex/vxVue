<script setup>
    import DateInput from "../src/components/date-input.vue"
    import { ref } from "vue"
    const pickedDate = ref(null)
</script>

# Date Input

## Default Component
```html
<date-input v-model="pickedDate" />
```
::: info Result
<date-input v-model="pickedDate" />
:::

## Properties
| Name         | Type   | Default | Description |
|--------------|--------|---------|-------------|
| `modelValue` | `Date` |         |             |

## Events
| Name                | Arguments           | Description |
|---------------------|---------------------|-------------|
| `update:modelValue` | `pickedDate` - Date |             |
