<script setup>
    import Sizable from "../src/components/sizable.vue"
</script>

# Sizable

Adds a handle to a block element to allow either horizontal or vertical resizing of this element.

## Default Component
```html
<sizable class="w-full h-[500px] bg-emerald-500" />
```
::: info Result
<sizable class="w-full h-96  bg-emerald-500" />
:::

## A Vertical Sizable
```html
<div class="flex flex-col w-full h-[500px]">
    <sizable :vertical="true" class="flex-shrink-0 mb-6 h-1/2">
        <div class="h-full bg-emerald-500"></div>
    </sizable>
    <div class="w-full h-full flex-shrink-1 bg-amber-500"></div>
</div>
```
::: info Result
<div class="flex flex-col w-full h-[500px]">
    <sizable :vertical="true" class="flex-shrink-0 mb-6 h-1/2">
        <div class="h-full bg-emerald-500"></div>
    </sizable>
    <div class="w-full h-full flex-shrink-1 bg-amber-500"></div>
</div>
:::

## Properties
| Name       | Type                 | Default | Description                                                                                  |
|------------|----------------------|---------|----------------------------------------------------------------------------------------------|
| `vertical` | `Boolean`            |         | appends the handle to the lower end of the block element and changes height instead of width |

## Events
| Name                | Arguments                                    | Description                                        |
|---------------------|----------------------------------------------|----------------------------------------------------|
| `dragStart`         |                                              | Emitted when a handle is grabbed by mouse or touch |
| `dragStop`          |                                              | Emitted when a handle is released                  |