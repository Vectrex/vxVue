<script setup>
    import Datepicker from "../../src/components/datepicker.vue"
    import { ref } from "vue"
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
    const pickedDate = ref(new Date())
    const dateRange = ref([from, to])
    const dateRangeLarge = ref([])
</script>

# Datepicker

A date picker component which allows the selection of a single date. Wraps a [date-input](date-input.md) component (unless the `has-input` property is set to `false`)

## Default Component
```html
<datepicker v-model="pickedDate" />
```
::: info Result
<datepicker v-model="pickedDate" />
:::

The disabled default component

```html
<datepicker v-model="pickedDate" :disabled="true"  />
```
::: info Result
<datepicker v-model="pickedDate" :disabled="true" />
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
The `input-format` and `output-format` properties are passed on the [`date-input`](date-input.md) component and interpreted there.

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

## Component Allowing More Than a Single Value

Two values and highlighting the range between them.

```html
<datepicker
    v-model="dateRange"
    :max-number-of-values="2"
    :highlight-range="true"
/>
```
::: info Result
<datepicker
v-model="dateRange"
:max-number-of-values="2"
:highlight-range="true"
/>
<pre>{{ dateRange }}</pre>
:::

Ten values which can be toggled randomly.

```html
<datepicker
    v-model="dateRangeLarge"
    :max-number-of-values="10"
    :shown-month="new Date('2024-06-05')"
/>
```
::: info Result
<datepicker
v-model="dateRangeLarge"
:max-number-of-values="10"
:shown-month="new Date('2024-06-05')"
/>
<pre>{{ dateRangeLarge }}</pre>
:::

## Properties
Properties of the [dateInput](date-input.md) component and standard attributes (like `disabled`) component can be declared and are passed on.

| Name                | Type      | Default                                  | Description                                                                                                                                                             |
|---------------------|-----------|------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `modelValue`        | `Date`    |                                          | The selected date                                                                                                                                                       |
| `shownMonth`        | `Date`    |                                          | The month displayed when opening the datepicker; defaults to the current month when not set                                                                             |
| `maxNumberOfValues` | `Number`  | 1                                        | Determines how many dates you can pick; values greater than one `hasInput` will be ignored, no date input will be provided and picked dates can be "toggled" on and off |
| `validFrom`         | `Date`    |                                          | When set dates before this date can not be selected                                                                                                                     |
| `validUntil`        | `Date`    |                                          | When set dates after this date can not be selected                                                                                                                      |
| `highlightRange`    | `Boolean` |                                          | With `maxNumberOfValues`greater than one this will highlight all date cells between the highest and lowest date value                                                   |
| `dayNames`          | `Array`   | ['S', 'M', 'T', 'W', 'T', 'F', 'S', 'S'] | An array with day names used for labelling the dates grid                                                                                                               |
| `locale`            | `String`  | 'default'                                | The locale used for rendering month names                                                                                                                               |
| `startOfWeekIndex`  | `Number`  | 0                                        | Accepts 0 for Sunday and 1 for Monday                                                                                                                                   |
| `hasInput`          | `Boolean` | true                                     | When true a [date-input](date-input.md) component with a toggle is rendered; when false the datepicker is always visible                                                |

## Events
| Name                | Arguments           | Description                                                                                    |
|---------------------|---------------------|------------------------------------------------------------------------------------------------|
| `update:modelValue` | `pickedDate` - Date | Emitted when a date is clicked                                                                 |
| `month-changed`     | `sheetDate` - Date  | Emitted when the month is changed, sheetDate is the first day of the currently displayed month |
| `year-changed`      | `sheetDate` - Date  | Emitted when the year is changed, sheetDate is the first day of the currently displayed month  |
