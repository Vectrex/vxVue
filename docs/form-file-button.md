<script setup>
    import FormFileButton from "../src/components/form-file-button.vue"
    import { ref } from "vue"

    const files = ref([])
</script>

# FormFileButton

## Default Component With Multiple Files Enabled
```html
<form-file-button
    v-model="files"
    :multiple="true"
    class="block py-2 px-4 text-center text-white rounded-md border border-transparent shadow-sm bg-vxvue hover:bg-vxvue-600"
/>
```
::: info Result
<form-file-button v-model="files" :multiple="true" class="block py-2 px-4 text-center text-white rounded-md border border-transparent shadow-sm bg-vxvue hover:bg-vxvue-600" />
:::
<pre>{{ files.length }} file(s) picked</pre>

## Component Filling the Slot
```html
<form-file-button
    v-model="files"
    :multiple="true"
/>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="siz-12 p-2 border-2 border-vxvue-500 rounded">
        <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
    </svg>
</form-file-button>
```
::: info Result
<form-file-button v-model="files" :multiple="true">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-12 p-2 border-2 border-vxvue-500 rounded">
        <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
    </svg>
</form-file-button>
:::

## Properties
| Name         | Type      | Default                            | Description                                                                                                               |
|--------------|-----------|------------------------------------|---------------------------------------------------------------------------------------------------------------------------|
| `modelValue` | `Array`   |                                    | Contains a list of `File` objects                                                                                         |
| `id`         | `String`  | "form-file-button-[randomNumber]"  |                                                                                                                           |
| `name`       | `String`  | "file"                             | The value of the wrapped input element                                                                                    |
| `multiple`   | `Boolean` | false                              | Switches between single and multiple file selection                                                                       |
| `accept`     | `String`  | "*"                                | Restricts selection to specific file types (see also https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/accept) |

## Events
| Name                 | Arguments               | Description                                                           |
|----------------------|-------------------------|-----------------------------------------------------------------------|
| `update:moodelValue` | `pickedFiles`           | Emitted when `change` event of the wrapped input element is triggered |
| `form-data`          | `pickedFilesAsFormData` | Emitted when `change` event of the wrapped input element is triggered |

## Slots
| Name      | Scoped | Description                                    |
|-----------|--------|------------------------------------------------|
| `default` |        | Determines labelling and appearance of element |
