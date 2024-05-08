<script setup>
    import Datepicker from "../src/components/datepicker.vue"
    import { ref } from "vue"
    const pickedDate = ref(null)
    const from = (() => {
        let date = new Date(), d = date.getDate()
        date.setDate(d - 4)
        return date
    })()
    const to = (() => {
        let date = new Date(), d = date.getDate()
        date.setDate(d + 3)
        return date
    })()
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

## Customized Component
This example
- swaps the day names
- limits the selectable dates to a 7-day range around the current date
- starts the week with Mondays

```html
<datepicker
    v-model="pickedDate"
    :day-names="'Su Mo Tu We Th Fr Sa'.split(' ')"
    :valid-from="from"
    :valid-until="to"
    :start-of-week-index="1"
/>
```
::: info Result
<datepicker
v-model="pickedDate"
:day-names="'Su Mo Tu We Th Fr Sa'.split(' ')"
:valid-from="from"
:valid-until="to"
:start-of-week-index="1"
/>
:::

## Date Format and Localization

```html
<datepicker
    v-model="pickedDate"
    locale="en-US"
    input-format="MM/DD/YYYY"
    output-format="MM/DD/YYYY"
/>
```
::: info Result
<datepicker
v-model="pickedDate"
locale="en-US"
input-format="MM/DD/YYYY"
output-format="MM/DD/YYYY"
/>
:::

## A Component Without Toggle (and Input)

```html
<datepicker
    v-model="pickedDate"
    :has-input="false"
/>
```
::: info Result
<datepicker
v-model="pickedDate"
:has-input="false"
/>
:::

## Properties
| Name         | Type   | Default | Description |
|--------------|--------|---------|-------------|
| `modelValue` | `Date` |         |             |

## Events
| Name                | Arguments           | Description |
|---------------------|---------------------|-------------|
| `update:modelValue` | `pickedDate` - Date |             |
