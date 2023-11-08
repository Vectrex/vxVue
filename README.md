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

| element            | description                                                                                                                                    | props                                                                                           | events                                  | slots                                        |
|--------------------|------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------|-----------------------------------------|----------------------------------------------|
| `confirm`          | promise-based component which can either take one ("confirm") or two buttons ("confirm", "cancel")                                             |                                                                                                 |                                         | `title` `icon` `message`                     |
| `date-input`       | input element for guided date inputs, also used by the datepicker                                                                              | `outputFormat` `inputFormat` `showButton` `locale` `modelValue`                                 | `update:modelValue` `toggle-datepicker` | `default`                                    |
| `datepicker`       | a bare bones datepicker component                                                                                                              | `modelValue` `validFrom` `validUntil` `dayNames` `locale` `startOfWeekIndex` `hasInput`         | `update:modelValue` `month-change`      |                                              |
| `form-file-button` | a thinly wrapped type-file input to allow proper styling and integration                                                                       | `modelValue` `accept` `multiple` `name` `id`                                                    | `update:modelValue` `form-data`         |                                              |
| `form-select`      | a select element adapted for Vue.js integration                                                                                                | `options` `modelValue` `disabledLabel`                                                          | `update:modelValue`                     |                                              |
| `form-switch`      | a fancy checkbox                                                                                                                               | `modelValue`                                                                                    | `update:modelValue`                     | `default`                                    |
| `message-toast`    | displays a notification which dismisses itself after a configurable timeout                                                                    | `title` `message`, `timeout` `active`                                                           | `timeout`, `close`                      | `icon` `title` `default`                     |
| `modal`            | modal overlay                                                                                                                                  | `show` `containerClass` `headerClass` `contentClass`                                            | `clicked-outside`                       | `title` `default`                            |
| `pagination`       | a pagination component for arbitrary items; opinionated in its layout                                                                          | `page` `total` `perPage` `showNavButtons` `prevText` `nextText` `showAllPages` `markerPosition` | `update:page`                           |                                              |
| `password-input`   | a simple input with toggle button which toggles between `type='button'` and `type='text'`                                                      | `modelValue`                                                                                    | `update:modelValue`                     | `default`                                    |
| `simple-tree`      | a simple tree implemented with a recursive component                                                                                           | `branch`                                                                                        | `branch-selected` `expand`              |                                              |
| `slider`           | a slider with one or more thumbs; `modelValue` can be a number or an array of numbers; the length of the array determines the number of thumbs | `modelValue` `min` `max`                                                                        | `update:modelValue`                     |                                              |
| `sortable`         | a sortable table; the `columns` prop specifies the columns and their sorting options                                                           | `columns` `rows` `offset` `count` `sortProp` `sortDirection` `keyProperty`                      | `before-sort` `after-sort`              | `{ column: prop }-header` `{ column: prop }` |
| `tabs`             | a tabs component which allows both badges and icons                                                                                            | `items` `activeIndex`                                                                           | `update:active-index`                   | `icon` `default`                             |
