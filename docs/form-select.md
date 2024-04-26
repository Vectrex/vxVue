<script setup>
    import FormSelect from "../src/components/form-select.vue"
    import { ref } from "vue"
    const options = []
    const selection1 = ref(null)
    const selection2 = ref(null)
    const selection3 = ref(null)
</script>

# FormSelect

A select element which makes passing options easier.

## Default Component
```html
<form-select
    v-model="selection1"
    :options="['Please', 'Select', 'Me']"
    class="w-full"
/>
```
::: info Result
<div class="flex items-center space-x-4"><form-select v-model="selection1" :options="['Please', 'Select', 'Me']" class="w-full" /><span class="inline-block w-24">{{ selection1 }}</span></div>
:::

## Disabled Component
The `disabled-label` property can be used to display a default option.
```html
<form-select
    :disabled="true"
    disabled-label="(I am inactive)"
    class="w-full"
/>
```
::: info Result
<form-select class="w-full" :disabled="true" disabled-label="(I am inactive)" />
:::

## Component With A Set DisabledLabel
The `disabled-label` property will be displayed when initially no option is selected.
```html
<form-select
    v-model="selection2"
    :options="['Please', 'Select', 'Me']"
    disabled-label="(Pick an option)"
    class="w-full"
/>
```
::: info Result
<div class="flex items-center space-x-4"><form-select v-model="selection2" :options="['Please', 'Select', 'Me']" disabled-label="(Pick an option)" class="w-full" /><span class="inline-block w-24">{{ selection2 }}</span></div>
:::

## Component With Key-Label Options
```html
<form-select
    v-model="selection3"
    :options="[
        { key: 1, label: 'Option 1' },
        { key: 2, label: 'Option 2' },
        { key: 3, label: 'Option 3' }
    ]"
    disabled-label="(Pick an option)"
    class="w-full"
/>
```
::: info Result
<div class="flex items-center space-x-4"><form-select v-model="selection3" :options="[{ key: 1, label: 'Option 1' },{ key: 2, label: 'Option 2' },{ key: 3, label: 'Option 3' }]" disabled-label="(Pick an option)" class="w-full" /><span class="inline-block w-24">{{ selection3 }}</span></div>
:::

## Properties
| Name            | Type     | Default | Description                                                                         |
|-----------------|----------|---------|-------------------------------------------------------------------------------------|
| `modelValue`    | `Mixed`  |         | Either a string or whatever the `key` property of an option contains                |
| `options`       | `Array`  |         | Can be an array of strings or an array of objects with `key` and `label` properties |
| `disabledLabel` | `String` |         | Displayed option if no selection has been made                                      |


## Events
| Name                | Arguments                     | Description                                                                                  |
|---------------------|-------------------------------|----------------------------------------------------------------------------------------------|
| `update:modelValue` | `selection` - Selected option | Depending on the `options` this is either a string or the `key` property of an option object |
