# vxVue

## Introduction
VxVue provides a handful of reusable Vue components styled with Tailwind CSS. All components are geared towards simplicity leaving room for customizations, extensions or adaptations. At some point a more verbose documentation than this brief readme might emerge.

## Requirements
* Vue.js 3.4+
* Tailwind CSS 3.4+

The official Tailwind CSS forms plugin is used to provide basic styling of the form components using the class strategy which allows the styling of non-form elements consistently.
An easy to configure color theming is applied. `vxvue` and `vxvue-alt` are used as the two colors scales. Since Tailwind won't observe classes in imported components tailwind.config.js should also list the node package in the content array. 
```javascript
module.exports = {
    content: [
        './node_modules/vx-vue/**/*.js',
        ...
    ],
    theme: {
        extend: {
            colors: {
                'vxvue': {
                    DEFAULT: ...,
                    '50': ...,
                    ...
                    '900': ...
                },
                'vxvue-alt': {
                    ...                
                }
            }
        }
    }
}
```
To use the few scoped styles along with your CSS add

```javascript
import 'vx-vue/vx-vue.css'
```
to your main.js or index.js file.

The components use an extra color palette.


## Provided components
So far the following components have been implemented:

### Accordion
An Accordion; requires AccordionPanels as child components. Key navigation with tab, cursor up, cursor down is provided.
If `activeIndex` is an array multiple panels can be open at the same time; if it is a number only one panel at a time can be open.

| props                         | events                 | slots |
|-------------------------------|------------------------|-------|
| `activeIndex [Number, Array]` | `update:active-index`  |       |

### AccordionPanel
**Only** useful as child component of an Accordion component.

| props                                    | events                           | slots                 |
|------------------------------------------|----------------------------------|-----------------------|
| `show [Boolean]`<br>`disabled [Boolean]` | `keyup`<br>`keydown`<br>`select` | `header`<br>`default` |


### Autocomplete
A component which provides suggestions with each keystroke.

| props                                                                                                                                                                                                                      | events                                       | slots     |
|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------|-----------|
| `modelValue [String]`<br/>`search [Function]`<br/>`baseClass [String]`<br/>`resultListClass [String]`<br/>`resultItemClass [String]`<br/>`inputClass [String]`<br/>`autoSelect [Boolean]`<br/>`getResultValue [Function]`  | `update:modelValue`<br/>`blur`<br/>`submit`  | `result`  |

### Confirm
A promise-based component which can either take one ("confirm") or two buttons ("confirm", "cancel"). Clicking "confirm" resolves, "cancel" rejects the promise.

| props | events | slots                            |
|-------|--------|----------------------------------|
| none  | none   | `title`<br/>`icon`<br/>`message` |

### DateInput
An input element for guided date inputs, which also serves as child component of the datepicker component.

| props                                                                                                                       | events                                      | slots     |
|-----------------------------------------------------------------------------------------------------------------------------|---------------------------------------------|-----------|
| `modelValue [Date]`<br/>`outputFormat [String]`<br/>`inputFormat [String]`<br/>`showButton [Boolean]`<br/>`locale [String]` | `update:modelValue`<br/>`toggle-datepicker` | `default` |

### Datepicker
A not-too-fancy datepicker.

| props                                                                                                                                                                    | events                                                   | slots     |
|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------|-----------|
| `modelValue [Date]`<br/>`validFrom [Date]`<br/>`validUntil [Date]`<br/>`dayNames [Array]`<br/>`locale [String]`<br/>`startOfWeekIndex [Number]`<br/>`hasInput [Boolean]` | `update:modelValue`<br/>`month-change`<br/>`year-change` | `default` |

### FormFileButton
A thinly wrapped type-file input that allows proper styling and integration.

| props                                                                                                     | events                              | slots |
|-----------------------------------------------------------------------------------------------------------|-------------------------------------|-------|
| `modelValue [Array]`<br/>`accept [String]`<br/>`multiple [Boolean]`<br/>`name [String]`<br/>`id [String]` | `update:modelValue`<br/>`form-data` | none  |

### FormSelect
A select element adapted for Vue.js integration.

| props                                                                            | events              | slots |
|----------------------------------------------------------------------------------|---------------------|-------|
| `modelValue [String, Number]`<br/>`options [Array]`<br/>`disabledLabel [String]` | `update:modelValue` | none  |

### FormSwitch
Nothing more than a fancy checkbox.

| props                | events              | slots     |
|----------------------|---------------------|-----------|
| `modelValue [Mixed]` | `update:modelValue` | `default` |

### MessageToast
Displays a notification message which can either be dismissed by the user and/or by itself after a configurable timeout.

| props                                                                                        | events                | slots                            |
|----------------------------------------------------------------------------------------------|-----------------------|----------------------------------|
| `title [String]`<br/>`message [String, Array]`<br/>`timeout [Number]`<br/>`active [Boolean]` | `timeout`<br/>`close` | `icon`<br/>`title`<br/>`default` |

### Modal
A modal overlay which provides slots.

| props                                                                                                 | events            | slots                 |
|-------------------------------------------------------------------------------------------------------|-------------------|-----------------------|
| `show [Boolean]`<br/>`containerClass [String]`<br/>`headerClass [String]`<br/>`contentClass [String]` | `clicked-outside` | `title`<br/>`default` |

### Pagination
A pagination component for an arbitrary list of items; rather opinionated in its responsive layout.

| props                                                                                                                                                                                                           | events        | slots |
|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------|-------|
| `page [Number]`<br/>`total [Number]`<br/>`perPage [Number]`<br/>`showNavButtons [Boolean]`<br/>`prevText [String]`<br/>`nextText [String]`<br/>`showAllPages [Boolean]`<br/>`markerPosition ['above', 'below']` | `update:page` | none  |

### PasswordInput
A simple input element paired with a toggle button which toggles the input element between between `type='password'` and `type='text'`

| props                 | events              | slots     |
|-----------------------|---------------------|-----------|
| `modelValue [String]` | `update:modelValue` | `default` |

### SimpleTree
A collapsible tree component which is implemented by a single recursive component.

| props             | events                         | slots |
|-------------------|--------------------------------|-------|
| `branch [Object]` | `branch-selected`<br/>`expand` | none  |

### Slider
A slider replacing and enhancing an `input type="range"`.

The component can have one or more thumbs: `modelValue` can either be a number or an array of numbers and the length of the array determines the number of thumbs.

| props                                                                                                         | events              | slots |
|---------------------------------------------------------------------------------------------------------------|---------------------|-------|
| `modelValue [Number]`<br/>`min [Number]`<br/>`max [Number]`<br/>`vertical [Boolean]`<br/>`disabled [Boolean]` | `update:modelValue` | none  |

### Sortable
A sortable table; the `columns` prop specifies the columns and their sorting options.

| props                                                                                                                                                                  | events                         | slots                                            |
|------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------|--------------------------------------------------|
| `columns [Array]`<br/>`rows [Array]`<br/>`offset [Number]`<br/>`count [Number]`<br/>`sortProp [String]`<br/>`sortDirection ['asc', 'desc']`<br/>`keyProperty [String]` | `before-sort`<br/>`after-sort` | `{ column: prop }-header`<br/>`{ column: prop }` |

### Tabs
A responsive tabs component. The items array holds objects with a required `name [String]` and optional `badge [String]`, `icon [Component]` and `disabled [Boolean]` properties. 

| props                                      | events                | slots                |
|--------------------------------------------|-----------------------|----------------------|
| `items [Array]`<br/>`activeIndex [Number]` | `update:active-index` | `icon`<br/>`default` | 
