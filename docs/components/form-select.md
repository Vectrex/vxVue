<script setup>
    import FormSelect from "../../src/components/FormSelect.vue"
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

## Component With Placeholder

The `placeholder` property will be displayed when initially no option is selected. Since the placeholder option has `null` set as its value, any value other than `null` that does not match an option will result in an empty select element.

```html
<form-select
    v-model="selection2"
    :options="['Please', 'Select', 'Me']"
    placeholder="(Pick an option)"
    class="w-full"
/>
```
::: info Result
<div class="flex items-center space-x-4"><form-select v-model="selection2" :options="['Please', 'Select', 'Me']" placeholder="(Pick an option)" class="w-full" /><span class="inline-block w-24">{{ selection2 }}</span></div>
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
    placeholder="(Pick an option)"
    class="w-full"
/>
```
::: info Result
<div class="flex items-center space-x-4"><form-select v-model="selection3" :options="[{ key: 1, label: 'Option 1' },{ key: 2, label: 'Option 2' },{ key: 3, label: 'Option 3' }]" placeholder="(Pick an option)" class="w-full" /><span class="inline-block w-24">{{ selection3 }}</span></div>
:::

## Properties
| Name          | Type     | Default | Description                                                                         |
|---------------|----------|---------|-------------------------------------------------------------------------------------|
| `modelValue`  | `Mixed`  |         | Either a string or whatever the `key` property of an option contains                |
| `options`     | `Array`  |         | Can be an array of strings or an array of objects with `key` and `label` properties |
| `placeholder` | `String` |         | Placeholder option if no selection has been made                                    |


## Events
| Name                | Arguments                     | Description                                                                                  |
|---------------------|-------------------------------|----------------------------------------------------------------------------------------------|
| `update:modelValue` | `selection` - Selected option | Depending on the `options` this is either a string or the `key` property of an option object |
