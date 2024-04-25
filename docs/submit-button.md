<script setup>
    import SubmitButton from "../src/components/submit-button.vue"
    import { ref } from "vue"
    const busy = ref(false)
    const doSubmit = () => { busy.value = true; setTimeout(() => busy.value = false, 3000) }
</script>

# Submit Button

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
disabled
>
    Submit button
</submit-button>
```
::: info Result
<submit-button disabled class="px-4 py-2 font-medium rounded text-white bg-vxvue hover:bg-vxvue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-vxvue">Submit button</submit-button>
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
