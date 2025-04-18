<script setup>
    import Confirm from "../../src/components/Confirm.vue"
    import { ref } from "vue"

    const confirmDialog = ref(null) 
    const alertDialog = ref(null) 
    const message = ref("")
    
    const doConfirm = () => {
    confirmDialog.value.open("General Brewster", "Shall we turn on Skynet?").
        then(() => {
            message.value = 'Skynet begins to learn at a geometric rate. It becomes self-aware at 2:14 a.m. Eastern time, August 29th.'
        }).
        catch(() => {
            message.value = 'August 29th never happened.'
        })
    }
    const doAlert = () => alertDialog.value.open().then(() => {}).catch(() => {})
</script>

# Confirm

A confirm/alert modal which ensures consistent behaviour and appearance in different environments.

The component is exposes an `open` method which returns a promise. Clicking a `true` button resolves it, a `false` button rejects it. If no values are defined with the buttons the first button resolves, the second one rejects.

The component accepts a maximum of two buttons.

## Component With Two Buttons
Each button is individually styled by its own class property. The `icon` slot is filled.

::: code-group
```js
const confirmDialog = ref(null)
const message = ref("")

const doConfirm = () => {
confirmDialog.value.open("General Brewster", "Shall we turn on Skynet?").
    then(() => {
        message.value = 'Skynet begins to learn at a geometric rate. It becomes self-aware at 2:14 a.m. Eastern time, August 29th.'
    }).
    catch(() => {
        message.value = 'August 29th never happened.'
    })
}
```
``` html
  <button @click="doConfirm">Let Me Confirm!</button>
  <teleport to="body">
    <confirm
        ref="confirmDialog"
        :buttons="[
          { label: 'Go ahead!', value: true, class: 'py-2 px-4 bg-error-600 hover:bg-error-500 text-white rounded-md' },
          { label: 'Cancel', value: false, class: 'py-2 px-4 text-stone-700 hover:bg-stone-200 rounded-md' }
        ]"
    >
        <template #icon>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-12">
                <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
            </svg>
        </template>
    </confirm>
  </teleport>
  <div><strong>{{ message }}</strong></div>
```
:::

::: info Result
  <button @click="doConfirm">Let Me Confirm!</button>
  <teleport to="body">
    <confirm
        ref="confirmDialog"
        :buttons="[
          { label: 'Go ahead!', value: true, class: 'py-2 px-4 bg-error-600 hover:bg-error-500 text-white rounded-md' },
          { label: 'Cancel', value: false, class: 'py-2 px-4 text-stone-700 hover:bg-stone-200 rounded-md' }
        ]"
    >
        <template #icon>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-12">
                <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
            </svg>
        </template>
    </confirm>
  </teleport>
  <div><strong>{{ message }}</strong></div>
:::

## Component With One Button
Only the default button is shown. The button-class property is used for button styling, the header-class property for styling the header. Both title and content are filled by their slots.
::: code-group
```js
const alertDialog = ref(null)
const doAlert = () => alertDialog.value.open().then(() => {}).catch(() => {})
```
``` html
  <button @click="doAlert">Alert Me!</button>
  <teleport to="body">
    <confirm
        ref="alertDialog"
        button-class="py-2 px-4 bg-vxvue-700 hover:bg-vxvue-600 text-white"
        header-class="bg-vxvue-700 text-white"
    >
        <template #title>Han Solo</template>
        <template #message>The mighty Jabba has decreed that you are to be thrown into the Sarlacc pit.</template>
    </confirm>
  </teleport>
```
:::

::: info Result
  <button @click="doAlert">Alert Me!</button>
  <teleport to="body">
    <confirm
        ref="alertDialog"
        button-class="py-2 px-4 bg-vxvue-700 hover:bg-vxvue-600 text-white"
        header-class="bg-vxvue-700 text-white"
    >
        <template #title>Han Solo</template>
        <template #default>The mighty Jabba has decreed that you are to be thrown into the Sarlacc pit.</template>
    </confirm>
  </teleport>
:::

## Properties
| Name          | Type             | Default         | Description                                                                                                                                                                 |
|---------------|------------------|-----------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `buttons`     | `Object`,`Array` | `{label: 'Ok'}` | Object or Array of **up to two** objects; each button object requires a `label` string, a `value` boolean and a `class` string - determining the CSS classes - are optional |
| `buttonClass` | `String`         |                 | A string determining the default CSS classes for all buttons                                                                                                                |
| `headerClass` | `String`         |                 | A string determining the CSS classes for the title                                                                                                                          |

## Slots
| Name      | Scoped                                                              | Description                                                                 |
|-----------|---------------------------------------------------------------------|-----------------------------------------------------------------------------|
| `default` | `message` - the message string passed to the component when opening | The container holding the message                                           |
| `title`   | `title` - the title string passed to the component when opening     | The title line                                                              |
| `icon`    |                                                                     | An additional slot which allows the display of an icon along with the title |

## Exposes
| Method  | Arguments                          | Description                                                                       |
|---------|------------------------------------|-----------------------------------------------------------------------------------|
| `open`  | `title ?String`, `message ?String` | Returns a promise which depending on the button values either resolves or rejects |
