<script setup>
    import MessageToast from "../../src/components/message-toast.vue"
    import { ref } from "vue"
    const defaultToast = ref({ message: '', active: false, title: 'You need to click!' })
    const timeoutToast = ref({ message: 'The default timeout is 5 seconds.', active: false, title: 'You can click or wait!' })
    const slottedToast = ref({
        message: ['Might be important.', 'Who knows?', 'It\'s gonna be fine!'],
        active: false,
        title: 'Scoped Toast'
     })
</script>

# MessageToast

A simple component which displays notifications and can either be dismissed manually or after a given timeout.

## Default Component
Dismissing requires a listener for the `close` event which then sets the `active` attribute to false.
::: code-group
```js
const toast = ref({
    message: '',
    active: false,
    title: 'You need to click!'
})
```
```html
<button @click="toast.active = true">Click Me</button>
<message-toast
    v-bind="toast"
    @close="toast.active = false"
    class="!bg-success-100 !text-success-700"
/>
```
:::
::: info Result
<button @click="defaultToast.active = true">Click Me</button>
<message-toast v-bind="defaultToast" @close="defaultToast.active = false" class="!bg-success-100 !text-success-700" />
:::

## Component That Reacts Both to Timeout And User Interaction
Both the `timeout` and `close` listeners set the `active` attribute to false.

In addition the timeout progress is visualized by a bar activated with `show-timeout-progress` to `true`.
::: code-group
```js
const toast = ref({
    message: 'The default timeout is 5 seconds.',
    active: false,
    title: 'You can click or wait!'
})
```
```html
<button @click="toast.active = true">Click Me</button>
<message-toast
    v-bind="toast"
    @close="toast.active = false"
    @timeout="toast.active = false"
    :show-timeout-progress="true"
    class="!bg-success-100 !text-success-700"
/>
```
:::
::: info Result
<button @click="timeoutToast.active = true">Click Me</button>
<message-toast
    v-bind="timeoutToast"
    @close="timeoutToast.active = false"
    @timeout="timeoutToast.active = false"
    :show-timeout-progress="true"
    class="!bg-success-100 !text-success-700"
/>
:::

## Component With Custom Slots
`icon`, `title` and `message` slots are used.
::: code-group
```js
const toast = ref({
    message: ['Might be important.', 'Who knows?', 'It\'s gonna be fine'],
    active: false,
    title: 'Scoped Toast'
})
```
```html
<button @click="toast.active = true">Click Me</button>
<message-toast
    v-bind="toast"
    @close="toast.active = false"
    @timeout="toast.active = false"
    class="!bg-success-100 !text-success-700"
>
    <template #title><span class="text-3xl">{{ toast.title }}</span></template>
    <template #icon>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-12">
            <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
        </svg>
    </template>
    <template #default>
        <ol>
            <li v-for="line in toast.message">{{ line }}</li>
        </ol>
    </template>
</message-toast>
```
:::
::: info Result
<button @click="slottedToast.active = true">Click Me</button>
<message-toast v-bind="slottedToast" @close="slottedToast.active = false" @timeout="slottedToast.active = false" class="!bg-success-100 !text-success-700">
    <template #title><span class="text-3xl">{{ slottedToast.title }}</span></template>
    <template #icon>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-12">
            <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
        </svg>
    </template>
    <template #default><ol><li v-for="line in slottedToast.message">{{ line }}</li></ol></template>
</message-toast>
:::

## Properties
| Name                    | Type                 | Default     | Description                                                                                                       |
|-------------------------|----------------------|-------------|-------------------------------------------------------------------------------------------------------------------|
| `title`                 | `String`             |             | Title of the toast                                                                                                |
| `message`               | `String`, `String[]` |             | Text message of the toast; when an array of strings is submitted every array item is displayed in a separate line |
| `active`                | `Boolean`            | `false`     | When set to `true` the toast is displayed and the timeout starts to count                                         |
| `timeout`               | `Number`             | `5000`      | Duration in milliseconds after which the timeout event fires                                                      |
| `show-timeout-progress` | `Boolean`            | `false`     | when `true` a progress bar synced with the remaining timeout is displayed                                         |
| `transition`            | `String`             | `vert-fade` | Name of the transition used when displaying the component                                                         |

## Events
| Name      | Arguments | Description                                            |
|-----------|-----------|--------------------------------------------------------|
| `close`   |           | Emitted when the user clicks the _close_ button        |
| `timeout` |           | Emitted when the configured timeout period has elapsed |

## Slots
| Name      | Scoped | Description                                                                 |
|-----------|--------|-----------------------------------------------------------------------------|
| `default` |        | The container holding the message line(s)                                   |
| `title`   |        | The title line                                                              |
| `icon`    |        | An additional slot which allows the display of an icon along with the title |
