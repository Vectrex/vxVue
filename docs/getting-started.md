# Getting Started

## Introduction
VxVue provides a handful of reusable Vue components styled with Tailwind CSS. All components are geared towards simplicity leaving room for customizations, extensions or adaptations.

## Requirements
* Vue.js 3.4+
* Tailwind CSS 3.4+

## Installation
Install vxVue by
```shell
npm install -D vx-vue
```

## Setup
The official Tailwind CSS forms plugin is used to provide basic styling of the form components using the class strategy which allows the styling of non-form elements consistently.
An easy to configure color theming is applied. `vxvue` and `vxvue-alt` are used as the two colors scales. Since Tailwind won't observe classes in imported components tailwind.config.js should also list the node package in the content array.
```js
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

```js
import 'vx-vue/vx-vue.css'
```
to your main.js or index.js file.

The components use an extra color palette.
