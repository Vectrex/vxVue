# vxVue

## Introduction
VxVue provides a handful of reusable Vue components styled with Tailwind CSS. All components are geared towards simplicity leaving room for customizations, extensions or adaptations. At some point a more verbose documentation than this brief readme might emerge.

## Requirements
* Vue.js 3.5+
* Tailwind CSS 4+

## Setup
The official Tailwind CSS forms plugin is used to provide basic styling of the form components using the class strategy which allows the styling of non-form elements consistently.
An easy to configure color theming is applied. `vxvue` and `vxvue-alt` are used as the two colors scales. Since Tailwind won't observe classes in imported components tailwind.config.js should also list the node package in the content array. 

```css
@source '<path-to-node_modules>/vx-vue/**/*.js'
```

Import the few scoped styles along with your CSS add to your main.js or index.js file.

```js
import 'vx-vue/vx-vue.css'
```
The components use an extra color palette. Used library specific colors are

```
*-vxvue
*-vxvue-50
*-vxvue-100
*-vxvue-600
*-vxvue-700

*-vxvue-alt
*-vxvue-alt-50
*-vxvue-alt-100
*-vxvue-alt-300
*-vxvue-alt-800
*-vxvue-alt-900

*-error
*-error-50
*-error-600

*-success
*-success-700
```

Style them in your projects main CSS file with

```css
@theme {
    --color-vxvue-50: ...;
    --color-vxvue-100: ...;
    ...
    --color-vxvue: ...;

    --color-vxvue-alt-50: ...;
    --color-vxvue-alt-100: ...;
    ...
    --color-vxvue-alt: -...;
```

