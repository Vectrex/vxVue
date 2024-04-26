<script setup>
    import FormSwitch from "../src/components/form-switch.vue"
    import { XMarkIcon } from "@heroicons/vue/24/solid"
    import { ref } from "vue"
    const state = ref(false)
</script>

# Form Switch

A simple checkbox replacement.

## Default Component Using the Default Slot
```html
<form-switch v-model="state" class="flex items-center space-x-2">
    <span>{{ state ? 'on' : 'off' }}</span>
</form-switch>
```
::: info Result
<form-switch v-model="state" class="flex items-center space-x-2"><span>{{ state ? 'on' : 'off' }}</span></form-switch>
:::

## Disabled Component
```html
<form-switch :disabled="true" />
```
::: info Result
<form-switch :disabled="true" />
:::

## Component Customizing the Handle Slot
```html
<form-switch v-model="state">
    <template #handle>
        <x-mark-icon class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-3 text-vxvue-300" />
    </template>
</form-switch>
```
::: info Result
<form-switch v-model="state"><template #handle><x-mark-icon class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-3 text-vxvue-300" /></template></form-switch>
:::

## Properties
| Name         | Type      | Default | Description         |
|--------------|-----------|---------|---------------------|
| `modelValue` | `Boolean` |         | State of the switch |

## Events
| Name                | Arguments                                              | Description                                           |
|---------------------|--------------------------------------------------------|-------------------------------------------------------|
| `update:modelValue` | `state` - Boolean with the current state of the switch | Emitted when switch state changes by user interaction |

## Slots
| Name      | Scoped | Description                                                         |
|-----------|--------|---------------------------------------------------------------------|
| `default` |        | Content placed within the wrapping label to the right of the switch |
| `handle`  |        | Content to place on the circular handle                             |
