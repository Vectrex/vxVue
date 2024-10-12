# vxVue

## Introduction
VxVue provides a handful of reusable Vue components styled with Tailwind CSS. All components are geared towards simplicity leaving room for customizations, extensions or adaptations. At some point a more verbose documentation than this brief readme might emerge.

## Requirements
* Vue.js 3.5+
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