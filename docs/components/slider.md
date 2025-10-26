<script setup>
    import Slider from "../../src/components/Slider.vue"
    import { ref } from "vue"
    const slider0 = ref(30)
    const slider1 = ref(10)
    const slider2 = ref(10)
    const slider3 = ref([10, 20])
    const slider3a = ref([-10, 0, 10])
    const slider4 = ref([10, 20])
    const slider5 = ref([-20, 20])
    const slider6 = ref([-20, 20])
    const slider7 = ref([-1000, 1000])
    const slider8 = ref([-20, 20])
</script>

# Slider

A more versatile and better looking alternative to a range input.

## Default Component
```html
<slider v-model="slider1" />
```
::: info Result
<div class="flex items-center space-x-4"><slider v-model="slider1" /><span class="inline-block w-10">{{ slider1 }}</span></div>
:::

## Disabled Slider
```html
<slider v-model="slider0" :disabled="true" />
```
::: info Result
<div class="flex items-center space-x-4"><slider v-model="slider0" :disabled="true" /><span class="inline-block w-10">{{ slider0 }}</span></div>
:::

## Component With Range Limits
```html
<slider v-model="slider2" :min="-20" :max="20" />
```
::: info Result
<div class="flex items-center space-x-4"><slider v-model="slider2" :min="-20" :max="20" /><span class="inline-block w-10">{{ slider2 }}</span></div>
:::

## Slider With Two Or More Handles
When the bound modelValue is an array a handle will be added for each array item.
```html
<slider v-model="slider3" :min="-50" :max="50" />
```
::: info Result
<div class="flex items-center space-x-4"><slider v-model="slider3" :min="-50" :max="50" /><span class="inline-block w-32">{{ slider3 }}</span></div>
:::
::: info Result
<div class="flex items-center space-x-4"><slider v-model="slider3a" :min="-50" :max="50" /><span class="inline-block w-32">{{ slider3a }}</span></div>
:::

## A Vertical Slider (With Two Handles)
When the bound modelValue is an array a handle will be added for each array item.
```html
<slider v-model="slider4" :min="-50" :max="50" :vertical="true"/>
```
::: info Result
<div class="flex flex-col items-center space-y-2 h-96"><slider v-model="slider4" :min="-50" :max="50" :vertical="true" /><span class="inline-block">{{ slider4 }}</span></div>
:::

## Tooltips
Tooltips are shown above their corresponding handles with horizontal sliders and to the left with vertical sliders. In case the tooltip is too close to the top or left viewport border they are moved below or to the right of the handle. 

Display the tooltip permanently.
```html
<slider v-model="slider5" :min="-50" :max="50" show-tooltip="always" />
```
::: info Result
<div class="flex items-center space-x-4"><slider v-model="slider5" :min="-50" :max="50" show-tooltip="always" /><span class="inline-block w-32">{{ slider5 }}</span></div>
:::

Display the tooltip only when the handle is focused.
```html
<slider v-model="slider6" :min="-50" :max="50" show-tooltip="focus" />
```
::: info Result
<div class="flex items-center space-x-4"><slider v-model="slider6" :min="-50" :max="50" show-tooltip="focus" /><span class="inline-block w-32">{{ slider6 }}</span></div>
:::

Use a callback function to format the tooltip label.
```html
<slider
    v-model="slider7"
    :min="-5000"
    :max="5000"
    show-tooltip="always"
    :format-tooltip="v => new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(v)"
/>
```
::: info Result
<div class="flex items-center space-x-4"><slider v-model="slider7" :min="-5000" :max="5000" show-tooltip="always" :format-tooltip="v => new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(v)" /><span class="inline-block w-32">{{ slider7 }}</span></div>
:::

Use a slot to customize the tooltip label.
```html
<slider
    v-model="slider8"
    :min="-50"
    :max="50"
    show-tooltip="always"
>
    <template #tooltip="{ value, ndx }">Handle {{ ndx + 1}}: {{ value }}</template>
</slider>
```
::: info Result
<div class="flex items-center space-x-4"><slider v-model="slider8" :min="-50" :max="50" show-tooltip="always"><template #tooltip="{ value, ndx }">Handle {{ ndx + 1}}: {{ value }}</template></slider><span class="inline-block w-32">{{ slider8 }}</span></div>
:::


## Properties
| Name            | Type                 | Default          | Description                                                                              |
|-----------------|----------------------|------------------|------------------------------------------------------------------------------------------|
| `modelValue`    | `Number`, `Number[]` |                  | If an array of numbers is bound a handle is shown for each array entry                   |
| `min`           | `Number`             |                  | The left (or bottom) boundary of the slider                                              |
| `max`           | `Number`             |                  | The right (or top) boundary of the slider                                                |
| `disabled`      | `Boolean`            |                  | Disables the slider                                                                      |
| `vertical`      | `Boolean`            |                  | Rotates the slider by 90 degree counterclockwise (min value at bottom, max value at top) |
| `showTooltip`   | `String`             | `never`          | Valid values are `never`, `always` and `focus`                                           |
| `formatTooltip` | `Function`           | `v => String(v)` | Allows formatting the tooltip label with a callback function                             |

## Events
| Name                | Arguments                                    | Description                                        |
|---------------------|----------------------------------------------|----------------------------------------------------|
| `update:modelValue` | `value` - can be a single number or an array | Emitted when handles are moved by user interaction |
| `dragStart`         |                                              | Emitted when a handle is grabbed by mouse or touch |
| `dragStop`          |                                              | Emitted when a handle is released                  |

## Slots
| Name      | Scoped | Description                                                                                   |
|-----------|--------|-----------------------------------------------------------------------------------------------|
| `tooltip` |        | Bound tooltip properties are `value` and `ndx`, the array index when `modelValue` is an array |

## Keys 
| Key            | Action                                                             |
|----------------|--------------------------------------------------------------------|
| `tab`          | Each handle can be focused                                         |
| `left`, `down` | Decreases bound value of selected handle by 1                      |
| `right`, `up`  | Increases bound value of selected handle by 1                      |
| `home`         | Sets bound value of selected handle to min                         |
| `end`          | Sets bound value of selected handle to max                         |
| `pageDown`     | Decreases bound value of selected handle by 1/10 of min-max range  |
| `pageUp`       | Increases bound value of selected handle  by 1/10 of min-max range |
