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

A date picker component which allows the selection of a single date. Wraps a [date-input](/date-input) component (unless the `has-input` property is set to `false`)

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
The `input-format` and `output-format` properties are passed on the [`date-input`](date-input) component and interpreted there.

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

## Component Without Toggle (and Input)

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
Properties of the [dateInput](date-input) component can be declared and are passed on.

| Name               | Type      | Default                                  | Description                                                                                                                                |
|--------------------|-----------|------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------|
| `modelValue`       | `Date`    |                                          | The selected date                                                                                                                          |
| `validFrom`        | `Date`    |                                          | When set dates before this date can not be selected                                                                                        |
| `validUntil`       | `Date`    |                                          | When set dates after this date can not be selected                                                                                         |
| `highlightTo`      | `Date`    |                                          | Day elements between this date and the selected date are differently colored; this allows to combine two datepickers to select date ranges |
| `dayNames`         | `Array`   | ['S', 'M', 'T', 'W', 'T', 'F', 'S', 'S'] | An array with day names used for labelling the dates grid                                                                                  |
| `locale`           | `String`  | 'default'                                | The locale used for rendering month names                                                                                                  |
| `startOfWeekIndex` | `Number`  | 0                                        | Accepts 0 for Sunday and 1 for Monday                                                                                                      |
| `hasInput`         | `Boolean` | true                                     | When true a [date-input](date-input) component with a toggle is rendered; when false the datepicker is always visible                      |

## Events
| Name                | Arguments           | Description                                                                                    |
|---------------------|---------------------|------------------------------------------------------------------------------------------------|
| `update:modelValue` | `pickedDate` - Date | Emitted when a date is clicked                                                                 |
| `month-changed`     | `sheetDate` - Date  | Emitted when the month is changed, sheetDate is the first day of the currently displayed month |
| `year-changed`      | `sheetDate` - Date  | Emitted when the year is changed, sheetDate is the first day of the currently displayed month  |
