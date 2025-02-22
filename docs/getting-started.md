# Getting Started

## Introduction
VxVue provides a handful of reusable Vue components styled with Tailwind CSS. All components are geared towards simplicity leaving room for customizations, extensions or adaptations.

## Requirements
* Vue.js 3.5+
* Tailwind CSS 4.x+

## Installation
Install vxVue by
```shell
npm install -D vx-vue
```

## Setup
The official Tailwind CSS forms plugin is used to provide basic styling of the form components using the class strategy which allows the styling of non-form elements consistently.
An easy to configure color theming is applied. `vxvue` and `vxvue-alt` are used as the two colors scales. Since Tailwind won't observe classes in imported components your CSS should include a
```css
@source '<path-to-node_modules>/vx-vue/**/*.js'
```
directive.

To use the few scoped styles along with your CSS add

```js
import 'vx-vue/vx-vue.css'
```
to your main.js or index.js file.

The components then use the extra color palettes. In particular the following shades are used:
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
