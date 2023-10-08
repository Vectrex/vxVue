# vxVue

## Introduction
VxVue provides a handful of reusable Vue components styled with Tailwind CSS. All components are geared towards simplicity leaving room for customizations, extensions or adaptations. At some point a more verbose documentation than this brief readme might emerge.

## Requirements
* Vue.js 3.*
* Tailwind CSS 3.*

The official Tailwind CSS forms plugin is used to provide basic styling of the form components using the class strategy which allows the styling of non-form elements consistently.
An easy to configure color theming is applied. Since Tailwind won't observe classes in imported components tailwind.config.js should contain
```
module.exports = {
    content: [
        './node_modules/vx-vue/**/*.js',
        ...
    ],
    ...
}
```
## Provided components
So far the following components have been implemented:

| element          | description                                                                                        |
|------------------|----------------------------------------------------------------------------------------------------|
| `password-input` | a simple input with toggle button which toggles between `type='button'` and `type='text'`          |
| `form-select`    | a select element adapted for Vue.js integration                                                    |                                                                               
| `form-switch`    | a fancy checkbox                                                                                   |       
| `sortable`       | a sortable table; the `columns` attribute specifies the columns and their sorting options          |       
| `message-toast`  | displays a notification which dismisses itself after a configurable timeout                        |      
| `confirm`        | promise-based component which can either take one ("confirm") or two buttons ("confirm", "cancel") | 
| `pagination`     | a pagination component for arbitrary items; opinionated in its layout                              |  
| `tabs`           | a tabs component which allows both badges and icons                                                |
| `simple-tree`    | a simple tree implemented with a recursive component                                               |
| `date-input`     | input element for guided date inputs, also used by the datepicker                                  |
| `datepicker`     | a bare bones datepicker component                                                                  |
