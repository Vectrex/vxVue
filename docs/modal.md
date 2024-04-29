<script setup>
    import Modal from "../src/components/modal.vue"
    import { ref } from "vue"
    const show = ref(false)
</script>

# Modal

A simple component which provides a modal container filled by slots.

## Default Component
In this example clicking outside the modal will close it.
```html
<button @click="show = true">Click Me</button>

<modal
    :show="show"
    @clicked-outside="show = false"
    container-class="mx-4 w-full lg:w-1/2 xl:w-1/4"
>
    <template #title>
        <div class="flex fixed justify-between items-center px-4 w-full h-16 bg-vxvue-700">
            <span class="text-xl font-bold text-white">A Modal</span>
        </div>
    </template>
    <template #default>
        <div class="p-4 text-xl text-center">Something of importance might be said here.</div>
    </template>
</modal>
```
:::
::: info Result
<button @click="show = true">Click Me</button>
<modal :show="show" @clicked-outside="show = false" container-class="mx-4 w-full lg:w-1/2 xl:w-1/4">
    <template #title>
      <div class="flex fixed justify-between items-center px-4 w-full h-16 bg-vxvue-700">
        <span class="text-xl font-bold text-white">A Modal</span>
      </div>
    </template>
    <template #default>
      <div class="p-4 text-xl text-center">Something of importance might be said here.</div>
    </template>
</modal>
:::

## Properties
| Name             | Type      | Default          | Description                                                                           |
|------------------|-----------|------------------|---------------------------------------------------------------------------------------|
| `show`           | `Boolean` |                  | display state of the modal                                                            |
| `containerClass` | `String`  | `w-3/4 h-[90vh]` | CSS classes of the modal container, main purpose is controlling the size of the modal |
| `headerClass`    | `String`  | `[empty string]` | CSS classes of the wrapper div of the header section of the modal                     |
| `contentClass`   | `String`  | `[empty string]` | Additional CSS classes of the content div                                             |

## Events
| Name              | Arguments | Description                                    |
|-------------------|-----------|------------------------------------------------|
| `clicked-outside` |           | Emitted when the user clicks outside the modal |

## Slots
| Name      | Scoped | Description                   |
|-----------|--------|-------------------------------|
| `default` |        | The content area of the modal |
| `title`   |        | The title line                |
