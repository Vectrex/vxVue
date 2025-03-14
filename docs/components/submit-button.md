<script setup>
    import SubmitButton from "../../src/components/SubmitButton.vue"
    import { ref } from "vue"
    const busy = ref(false)
    const doSubmit = () => { busy.value = true; setTimeout(() => busy.value = false, 3000) }
</script>

# SubmitButton

A themed button with an animated spinner. OOTB styling is deliberately sparse.

## Default Submit Button
Tailwind CSS styles are applied.
```html
<submit-button
    class="px-4 py-2 font-medium rounded text-white bg-vxvue hover:bg-vxvue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-vxvue"
    @submit="doSubmit"
    :busy="busy"
>
    Submit button
</submit-button>
```
::: info Result
<submit-button class="px-4 py-2 font-medium rounded text-white bg-vxvue hover:bg-vxvue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-vxvue" @submit="doSubmit" :busy="busy">Submit button</submit-button>
:::

## Disabled Submit Button
```html
<submit-button
    class="px-4 py-2 font-medium rounded text-white bg-vxvue hover:bg-vxvue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-vxvue"
    :disabled="true"
>
    Submit button
</submit-button>
```
::: info Result
<submit-button :disabled="true" class="px-4 py-2 font-medium rounded text-white bg-vxvue hover:bg-vxvue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-vxvue">Submit button</submit-button>
:::
## Themed Submit Button
Two themes are available: `success` and `error`.

```html
<submit-button
    class="px-4 py-2 font-medium rounded focus:outline-none focus:ring-2 focus:ring-offset-2"
    @submit="doSubmit"
    :busy="busy"
    theme="success"
>
    Submit button
</submit-button>
```
::: info Result
<submit-button class="px-4 py-2 font-medium rounded focus:outline-none focus:ring-2 focus:ring-offset-2" @submit="doSubmit" :busy="busy" theme="success">Submit button</submit-button>
:::

```html
<submit-button
    class="px-4 py-2 font-medium rounded focus:outline-none focus:ring-2 focus:ring-offset-2"
    @submit="doSubmit"
    :busy="busy"
    theme="error"
>
    Submit button
</submit-button>
```
::: info Result
<submit-button class="px-4 py-2 font-medium rounded focus:outline-none focus:ring-2 focus:ring-offset-2" @submit="doSubmit" :busy="busy" theme="error">Submit button</submit-button>
:::

## Submit Button With Custom Spinner Class
```html
<submit-button
    class="px-4 py-2 font-medium rounded text-white bg-vxvue hover:bg-vxvue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-vxvue"
    @submit="doSubmit"
    :busy="busy"
    spinner-class="size-8 text-amber-500"
>
    Submit button
</submit-button>
```
::: info Result
<submit-button spinner-class="size-8 text-amber-500" class="px-4 py-2 font-medium rounded text-white bg-vxvue hover:bg-vxvue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-vxvue" @submit="doSubmit" :busy="busy">Submit button</submit-button>
:::

## Properties
| Name            | Type      | Default | Description                                                                                                     |
|-----------------|-----------|---------|-----------------------------------------------------------------------------------------------------------------|
| `busy`          | `Boolean` | `false` | Disables user interaction and changes appearance of button, displays spinner                                    |
| `spinner-class` | `String`  |         | A string which partially replaces the class string of the spinner; useful for setting size and color of spinner |
| `theme`         | `String`  |         | Possible values are `success` and `error`; applies a matching color theme to both button and spinner            |

## Events
| Name     | Arguments | Description                                                 |
|----------|-----------|-------------------------------------------------------------|
| `submit` |           | Emitted when user clicks a non-busy and not disabled button |

## Slots
| Name      | Scoped | Description             |
|-----------|--------|-------------------------|
| `default` |        | The label on the button |
