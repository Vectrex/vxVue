<script setup>
    import PasswordInput from "../../src/components/password-input.vue"
    import { ref } from "vue"

    const password = ref('')
</script>

# PasswordInput

An input element which adds a toggle to show the contents of the input field. Replicates the behaviour of input elements of type password on some browsers but ensures consistent styling.
Attributes are passed on the input element except `class` which is exclusively applied to the wrapping div. A `disabled` attribute is applied to the toggle button.

```html
<password-input
    v-model="password"
    placeholder="Your secret"
    class="w-full"
/>
```
::: info Result
<password-input v-model="password" placeholder="Your secret" class="w-full" />
:::

A disabled component
```html
<password-input
    v-model="password"
    :disabled="true"
    placeholder="Your secret"
    class="w-full"
/>
```
::: info Result
<password-input v-model="password" :disabled="true" placeholder="Your secret" class="w-full" />
:::


## Properties
| Name            | Type     | Default | Description                            |
|-----------------|----------|---------|----------------------------------------|
| `modelValue`    | `String` |         | The value of the wrapped input element |

## Events
| Name                  | Arguments      | Description                                                          |
|-----------------------|----------------|----------------------------------------------------------------------|
| `update:moodelValue`  | `passwordText` | Emitted when `input` event of the wrapped input element is triggered |
