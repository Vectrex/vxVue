# vxVue

## Introduction
VxVue provides a handful of reusable Vue components styled with Tailwind CSS. All components are geared towards simplicity leaving room for customizations, extensions or adaptations. At some point a more verbose documentation than this brief readme might emerge.

## Requirements
* Vue.js 3.*
* Tailwind CSS 3.*

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

| element            | description                                                                                                                                    | props                                                                                                                                                                                                                                           | events                                      | slots                                            |
|--------------------|------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------|--------------------------------------------------|
| `autocomplete`     | component which provides suggestions with each keystroke                                                                                       | `modelValue [String]`<br/>`search [Function]`<br/>`baseClass [String]`<br/>`resultListClass [String]`<br/>`resultItemClass [String]`<br/>`inputClass [String]`<br/>`autoSelect [Boolean]`<br/>`getResultValue [Function]`                       | `update:modelValue`<br/>`blur`<br/>`submit` | `result`                                         |
| `confirm`          | promise-based component which can either take one ("confirm") or two buttons ("confirm", "cancel")                                             |                                                                                                                                                                                                                                                 |                                             | `title`<br/>`icon`<br/>`message`                 |
| `date-input`       | input element for guided date inputs, also used by the datepicker                                                                              | `modelValue [Date]`<br/>`outputFormat [String]`<br/>`inputFormat [String]`<br/>`showButton [Boolean]`<br/>`locale [String]`                                                                                                                     | `update:modelValue`<br/>`toggle-datepicker` | `default`                                        |
| `datepicker`       | a bare bones datepicker component                                                                                                              | `modelValue [Date]`<br/>`validFrom  [Date]`<br/>`validUntil  [Date]`<br/>`dayNames [Array]`<br/>`locale [String]`<br/>`startOfWeekIndex [Number]`<br/>`hasInput [Boolean]`                                                                      | `update:modelValue`<br/>`month-change`      |                                                  |
| `form-file-button` | a thinly wrapped type-file input to allow proper styling and integration                                                                       | `modelValue [Array]`<br/>`accept [String]`<br/>`multiple [Boolean]`<br/>`name [String]`<br/>`id [String]`                                                                                                                                       | `update:modelValue`<br/>`form-data`         |                                                  |
| `form-select`      | a select element adapted for Vue.js integration                                                                                                | `modelValue [String, Number]`<br/>`options [Array]`<br/>`disabledLabel [String]`                                                                                                                                                                | `update:modelValue`                         |                                                  |
| `form-switch`      | a fancy checkbox                                                                                                                               | `modelValue [Mixed]`                                                                                                                                                                                                                            | `update:modelValue`                         | `default`                                        |
| `message-toast`    | displays a notification which dismisses itself after a configurable timeout                                                                    | `title [String]`<br/>`message [String, Array]`<br/>`timeout [Number]`<br/>`active [Boolean]`                                                                                                                                                    | `timeout`<br/>`close`                       | `icon`<br/>`title`<br/>`default`                 |
| `modal`            | modal overlay                                                                                                                                  | `show [Boolean]`<br/>`containerClass [String]`<br/>`headerClass [String]`<br/>`contentClass [String]`                                                                                                                                           | `clicked-outside`                           | `title`<br/>`default`                            |
| `pagination`       | a pagination component for arbitrary items; opinionated in its layout                                                                          | `page [Number]`<br/>`total [Number]`<br/>`perPage [Number]`<br/>`showNavButtons [Boolean]`<br/>`prevText [String]`<br/>`nextText [String]`<br/>`showAllPages [Boolean]`<br/>`markerPosition ['above', 'below']`                                 | `update:page`                               |                                                  |
| `password-input`   | a simple input with toggle button which toggles between `type='button'` and `type='text'`                                                      | `modelValue [String]`                                                                                                                                                                                                                           | `update:modelValue`                         | `default`                                        |
| `simple-tree`      | a simple tree implemented with a recursive component                                                                                           | `branch [Object]`                                                                                                                                                                                                                               | `branch-selected`<br/>`expand`              |                                                  |
| `slider`           | a slider with one or more thumbs; `modelValue` can be a number or an array of numbers; the length of the array determines the number of thumbs | `modelValue [Number]`<br/>`min [Number]`<br/>`max [Number]`<br/>`vertical [Boolean]`<br/>`disabled [Boolean]`                                                                                                                                   | `update:modelValue`                         |                                                  |
| `sortable`         | a sortable table; the `columns` prop specifies the columns and their sorting options                                                           | `columns [Array]`<br/>`rows [Array]`<br/>`offset [Number]`<br/>`count [Number]`<br/>`sortProp [String]`<br/>`sortDirection ['asc', 'desc']`<br/>`keyProperty [String]`                                                                          | `before-sort`<br/>`after-sort`              | `{ column: prop }-header`<br/>`{ column: prop }` |
| `tabs`             | a tabs component which allows both badges and icons                                                                                            | `items [Array]`<br/>`activeIndex [Number]`                                                                                                                                                                                                      | `update:active-index`                       | `icon`<br/>`default`                             | 
