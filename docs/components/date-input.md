<script setup>
    import DateInput from "../../src/components/date-input.vue"
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

The disabled default component

```html
<date-input v-model="pickedDate" :disabled="true"  />
```
::: info Result
<date-input v-model="pickedDate" :disabled="true" />
:::

## Component Using Input and Output Format
For the `input-format`
- D/d represents a single or double digit day
- M/m represents a single or double digit month
- DD/dd represents a double digit day (and requires a padding zero with single digits)
- MM/mm represents a double digit month (and requires a padding zero with single digits)
- YYYY/yyyy represents a four digit year

For the `output-format`[`useDateFormat`](https://vueuse.org/shared/useDateFormat) of VueUse is used and all format options documented there apply.

```html
<date-input
    v-model="pickedDate"
    input-format="D/M/YYYY"
    output-format="DD MMMM YYYY"
/>
```
::: info Result
<date-input v-model="pickedDate" input-format="d/m/yyyy" output-format="DD MMMM YYYY" />
:::

## Properties

Attributes are passed on the wrapped input element with the exception of the `class` attribute and a `disabled` attribute will not only disable the input element itself but also the button for emptying the modelValue.

| Name           | Type      | Default      | Description                                                                  |
|----------------|-----------|--------------|------------------------------------------------------------------------------|
| `modelValue`   | `Date`    |              | The date displayed after applying the output format                          |
| `inputFormat`  | `String`  | 'YYYY-MM-DD' | The required input format of a string to be interpreted as a date            |
| `outputFormat` | `String`  | 'YYYY-MM-DD' | The output format of an accepted date                                        |
| `showToggle`   | `Boolean` | false        | When true a toggle is shown which allows a [datepicker](datepicker.md) behavior |

## Events
| Name                | Arguments                       | Description                                                                                           |
|---------------------|---------------------------------|-------------------------------------------------------------------------------------------------------|
| `update:modelValue` | `pickedDate` - Date \| Null     | emitted when input element receives a blur event or when the close button of a picked date is clicked |                                           |
| `toggle-datepicker` | `datepickerVisibilty` - Boolean | emitted when datepicker toggle is clicked                                                             |
