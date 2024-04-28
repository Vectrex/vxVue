<script setup>
    import Tabs from "../src/components/tabs.vue"
    import { UserIcon, ShieldExclamationIcon } from "@heroicons/vue/24/solid"
    import { ref } from "vue"

  const tabs = ref({
    items: [
      { name: 'Profile', badge: '!', icon: UserIcon },
      { name: 'Tech' },
      { name: 'Intelligence', disabled: true },
      { name: 'Strategy' },
      { name: 'Confidential', disabled: true, badge: '10', icon: ShieldExclamationIcon }
    ],
    activeIndex: 0
  })
</script>

# Tabs

The component only handles the rendering of the tab headers. The display of the tabbed content itself (depending on the `activeIndex` property) must be dealt with separately. 
Tabs are defined by an array of objects. Each of these objects
- must provide a `name` property
- and optionally a
  - `disabled` (`Boolean`)
  - `icon` (`Component`)
  - and `badge` (`String`) property

On small screens the tabs fall back to a select element.

## Default Component

```html
<tabs :items="tabs.items" v-model:active-index="tabs.activeIndex" />
```
::: info Result
<tabs :items="tabs.items" v-model:active-index="tabs.activeIndex" />
:::

## Component Using Slots

```html
    <tabs :items="tabs.items" v-model:active-index="tabs.activeIndex" />
```
::: info Result
<tabs :items="tabs.items" v-model:active-index="tabs.activeIndex">
    <template #icon="slotProps">
        <component v-if="slotProps.tab.icon" :is="slotProps.tab.icon" class="size-5 mr-2" fill="currentColor" />
    </template>
    <template #default="slotProps">
        <strong>{{ slotProps.tab.name }}</strong>
    </template>
    <template #badge="slotProps">
        <span class="ml-2 text-sm" v-if="slotProps.tab.badge">[{{ slotProps.tab.badge }}]</span>
    </template>
</tabs>

:::

## Properties
| Name          | Type       | Default | Description                                                                  |
|---------------|------------|---------|------------------------------------------------------------------------------|
| `activeIndex` | `Number`   | 0       | determines which tab is selected                                             |
| `items`       | `Object[]` | []      | An array of objects determining the appearance and interactivity of each tab |

## Events
| Name                  | Arguments        | Description                               |
|-----------------------|------------------|-------------------------------------------|
| `update:activeIndex`  | `index` - Number | Emitted when tab is clicked (or selected) |

## Slots
| Name      | Scoped                                               | Description                                                      |
|-----------|------------------------------------------------------|------------------------------------------------------------------|
| `default` | `tab` - the data defining the currently rendered tab | Slot which holds the name of the tab                             |
| `icon`    | `tab` - the data defining the currently rendered tab | Slot which contains the icon displayed to the left of the name   |
| `badge`   | `tab` - the data defining the currently rendered tab | Slot which contains the badge displayed to the right of the name |
