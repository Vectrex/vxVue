<script setup>
    import Sortable from "../src/components/sortable.vue"
    import { computed, ref } from "vue"
    const cols = [
      { label: 'Name', prop: 'name', sortable: true },
      { label: 'Role', prop: 'role', sortable: true },
      { label: 'Born in', prop: 'yob', sortable: true }
    ]
    const rows = ref([
        { key: 1, name: 'Linda', role: 'Sarah', yob: 1956 },
        { key: 2, name: 'Robert', role: 'T1000', yob: 1958 },
        { key: 3, name: 'Arnold', role: 'T800', yob: 1947 },
        { key: 4, name: 'Edward', role: 'John', yob: 1977 },
        { key: 5, name: 'Michael', role: 'Kyle', yob: 1956 },
        { key: 6, name: 'Joe', role: 'Miles', yob: 1947 },
        { key: 7, name: 'Kristanna', role: 'T-X', yob: 1979 },
        { key: 8, name: 'Gabriel', role: 'REV-9', yob: 1982 },
        { key: 9, name: 'Mackenzie', role: 'Grace', yob: 1987 },
    ])
    const offset = ref(0)
    const count = ref(4)
    const colsAlt = [
      { label: 'Name', prop: 'name', sortable: true },
      { label: 'Born in', prop: 'yob', sortable: true },
      { label: 'Role', prop: 'role' }
    ]
    const rowsAlt = ref([
        { key: 1, name: "Robert", yob: 1958, role: "T1000" },
        { key: 2, name: "Harrison", yob: 1942, role: "Indiana Jones" },
        { key: 3, name: "Morgan", yob: 1937, role: "Red" },
        { key: 4, name: "Sigourney", yob: 1949, role: "Ripley" },
        { key: 5, name: "Tom", yob: 1962, role: "Forrest Gump" },
        { key: 6, name: "Jodie", yob: 1962, role: "Clarice Starling" },
        { key: 7, name: "Bruce", yob: 1955, role: "John McClane" },
        { key: 8, name: "Julia", yob: 1967, role: "Vivian Ward" },
        { key: 9, name: "Jack", yob: 1937, role: "Jack Torrance" },
        { key: 10, name: "Uma", yob: 1970, role: "The Bride" },
        { key: 11, name: "Johnny", yob: 1963, role: "Jack Sparrow" },
        { key: 12, name: "Leonardo", yob: 1974, role: "Jack Dawson" },
        { key: 13, name: "Angelina", yob: 1975, role: "Lara Croft" },
        { key: 14, name: "Keanu", yob: 1964, role: "Neo" },
        { key: 15, name: "Anthony", yob: 1937, role: "Hannibal Lecter" },
        { key: 16, name: "Charlize", yob: 1975, role: "Imperator Furiosa" },
        { key: 17, name: "Jim", yob: 1962, role: "Ace Ventura" },
        { key: 18, name: "Meryl", yob: 1949, role: "Miranda Priestly" },
        { key: 19, name: "Daniel", yob: 1968, role: "James Bond" },
        { key: 20, name: "Ian", yob: 1939, role: "Gandalf" }
    ])
</script>

# Sortable

A table which can be sorted by clicking the column headers. The component requires an array of objects each bound to a `rows` and `columns` property.

**Properties of column objects**

| Property           | Required | Type       | Description                                                     |
|--------------------|----------|------------|-----------------------------------------------------------------|
| `label`            | yes      | `String`   | Label in the table header; required, but can be an empty string |
| `prop`             | yes      | `String`   | The property of a row object displayed in this column           |
| `sortable`         |          | `Boolean`  | If missing or `false`, won't allow user interaction             |
| `sortAscFunction`  |          | `Function` | Replaces the default sort function for ascending sorts          |
| `sortDescFunction` |          | `Function` | Replaces the default sort function for descending sorts         |
| `cssClass`         |          | `String`   | Defines extra classes applied to the `th` elements              |

Row objects should provide a property which can be used as `key` attribute in the list rendering.

As default a `key` property is assumed but can be declared otherwise with the `key-property` attribute of the component.

## Default Component
::: code-group
```js
    const cols = [
        { label: 'Name', prop: 'name', sortable: true },
        { label: 'Role', prop: 'role', sortable: true },
        { label: 'Born in', prop: 'yob', sortable: true }
    ]
    const rows = ref([
        { key: 1, name: 'Linda', role: 'Sarah', yob: 1956 },
        { key: 2, name: 'Robert', role: 'T1000', yob: 1958 },
        { key: 3, name: 'Arnold', role: 'T800', yob: 1947 },
        { key: 4, name: 'Edward', role: 'John', yob: 1977 },
        { key: 5, name: 'Michael', role: 'Kyle', yob: 1956 },
        { key: 6, name: 'Joe', role: 'Miles', yob: 1947 },
        { key: 7, name: 'Kristanna', role: 'T-X', yob: 1979 },
        { key: 8, name: 'Gabriel', role: 'REV-9', yob: 1982 },
        { key: 9, name: 'Mackenzie', role: 'Grace', yob: 1987 },
    ])
```
```html
    <sortable :rows="rows" :columns="cols" />
```
:::

::: info Result
<sortable :rows="rows" :columns="cols" />
:::

## Component using offset and count
Useful in combination with a [pagination](/pagination) component. The _Role_ column has sorting disabled.

::: code-group
```js
    const offset = ref(0)
    const count = ref(4)
    const cols = [
        { label: 'Name', prop: 'name', sortable: true },
        { label: 'Role', prop: 'role' },
        { label: 'Born in', prop: 'yob', sortable: true }
    ]
    const rows = ref([
        { key: 1, name: "Robert", yob: 1958, role: "T1000" },
        { key: 2, name: "Harrison", yob: 1942, role: "Indiana Jones" },
        { key: 3, name: "Morgan", yob: 1937, role: "Red" },
        { key: 4, name: "Sigourney", yob: 1949, role: "Ripley" },
        { key: 5, name: "Tom", yob: 1962, role: "Forrest Gump" },
        { key: 6, name: "Jodie", yob: 1962, role: "Clarice Starling" },
        { key: 7, name: "Bruce", yob: 1955, role: "John McClane" },
        { key: 8, name: "Julia", yob: 1967, role: "Vivian Ward" },
        { key: 9, name: "Jack", yob: 1937, role: "Jack Torrance" },
        { key: 10, name: "Uma", yob: 1970, role: "The Bride" },
        { key: 11, name: "Johnny", yob: 1963, role: "Jack Sparrow" },
        { key: 12, name: "Leonardo", yob: 1974, role: "Jack Dawson" },
        { key: 13, name: "Angelina", yob: 1975, role: "Lara Croft" },
        { key: 14, name: "Keanu", yob: 1964, role: "Neo" },
        { key: 15, name: "Anthony", yob: 1937, role: "Hannibal Lecter" },
        { key: 16, name: "Charlize", yob: 1975, role: "Imperator Furiosa" },
        { key: 17, name: "Jim", yob: 1962, role: "Ace Ventura" },
        { key: 18, name: "Meryl", yob: 1949, role: "Miranda Priestly" },
        { key: 19, name: "Daniel", yob: 1968, role: "James Bond" },
        { key: 20, name: "Ian", yob: 1939, role: "Gandalf" }
    ])
```
```html
    <div class="flex items-center space-x-2">
        <button class="px-4 py-2 bg-vxvue text-white rounded" @click="offset = Math.max(0, offset - 1)">-</button>
        <span>Offset {{ offset }}</span>
        <button class="px-4 py-2 bg-vxvue text-white rounded" @click="offset = Math.min(rows.length - count, offset + 1)">+</button>
    </div>
    <sortable :rows="rowsAlt" :columns="colsAlt" :offset="offset" :count="count" />
```
:::

::: info Result
<div class="flex items-center space-x-2">
<button class="px-4 py-2 bg-vxvue text-white rounded" @click="offset = Math.max(0, offset - 1)">-</button>
<span>Offset {{ offset }}</span>
<button class="px-4 py-2 bg-vxvue text-white rounded" @click="offset = Math.min(rowsAlt.length - count, offset + 1)">+</button>
</div>
<sortable :rows="rowsAlt" :columns="colsAlt" :offset="offset" :count="count" />
:::

## Component Using Slots
Slots are exposed for both table headers and table cells.4
::: code-group
```js
    const cols = [
        { label: 'Name', prop: 'name', sortable: true },
        { label: 'Role', prop: 'role', sortable: true },
        { label: 'Born in', prop: 'yob', sortable: true }
    ]
    const rows = ref([
        { key: 1, name: 'Linda', role: 'Sarah', yob: 1956 },
        { key: 2, name: 'Robert', role: 'T1000', yob: 1958 },
        { key: 3, name: 'Arnold', role: 'T800', yob: 1947 },
        { key: 4, name: 'Edward', role: 'John', yob: 1977 },
        { key: 5, name: 'Michael', role: 'Kyle', yob: 1956 },
        { key: 6, name: 'Joe', role: 'Miles', yob: 1947 },
        { key: 7, name: 'Kristanna', role: 'T-X', yob: 1979 },
        { key: 8, name: 'Gabriel', role: 'REV-9', yob: 1982 },
        { key: 9, name: 'Mackenzie', role: 'Grace', yob: 1987 },
    ])
```
```html
    <sortable :rows="rows" :columns="cols">
        <template #name-header="slotProps">
            <div :class="['w-32 flex items-center justify-between', slotProps.sortProp === 'name' ? 'text-white' : 'text-vxvue']">
                <span>{{ slotProps.column.label }}</span>
                <span v-if="slotProps.sortProp === 'name'">{{ slotProps.sortDir === 'asc' ? '+' : '-' }}</span>
            </div>
        </template>
        <template #role-header="slotProps">
            <div :class="['w-32 flex items-center justify-between', slotProps.sortProp === 'role' ? 'text-white' : 'text-vxvue']">
                <span>{{ slotProps.column.label }}</span>
                <span v-if="slotProps.sortProp === 'role'">{{ slotProps.sortDir === 'asc' ? '+' : '-' }}</span>
            </div>
        </template>
        <template #yob-header="slotProps">
            <div :class="['w-48 flex items-center justify-between', slotProps.sortProp === 'yob' ? 'text-white' : 'text-vxvue']">
                <span>YOB</span>
                <span v-if="slotProps.sortProp === 'yob'">{{ slotProps.sortDir === 'asc' ? '+' : '-' }}</span>
            </div>
        </template>
        <template #yob="slotProps">
            <em>{{ slotProps.row.name }} was born in</em> {{ slotProps.row.yob }}
        </template>
    </sortable>
```
:::

::: info Result
<sortable :rows="rows" :columns="cols">
    <template #name-header="slotProps">
        <div :class="['w-32 flex items-center justify-between', slotProps.sortProp === 'name' ? 'text-white' : 'text-vxvue']"><span>{{ slotProps.column.label }}</span><span v-if="slotProps.sortProp === 'name'">{{ slotProps.sortDir === 'asc' ? '+' : '-' }}</span></div>
    </template>
    <template #role-header="slotProps">
        <div :class="['w-32 flex items-center justify-between', slotProps.sortProp === 'role' ? 'text-white' : 'text-vxvue']"><span>{{ slotProps.column.label }}</span><span v-if="slotProps.sortProp === 'role'">{{ slotProps.sortDir === 'asc' ? '+' : '-' }}</span></div>
    </template>
    <template #yob-header="slotProps">
        <div :class="['w-48 flex items-center justify-between', slotProps.sortProp === 'yob' ? 'text-white' : 'text-vxvue']"><span>YOB</span><span v-if="slotProps.sortProp === 'yob'">{{ slotProps.sortDir === 'asc' ? '+' : '-' }}</span></div>
    </template>
    <template #yob="slotProps">
        <em>{{ slotProps.row.name }} was born in</em> {{ slotProps.row.yob }}
    </template>
</sortable>
:::


## Properties
| Name            | Type       | Default | Description                                                                                                 |
|-----------------|------------|---------|-------------------------------------------------------------------------------------------------------------|
| `columns`       | `Object[]` |         | **required**; defines the table columns; every object requires at least the `label` and the `prop` property |
| `rows`          | `Object[]` |         | **required**; holds the row data                                                                            |
| `offset`        | `Number`   | null    | Starting index at which the sorted rows are displayed                                                       |
| `count`         | `Number`   | null    | Number of rows which are displayed                                                                          |
| `sortProp`      | `String`   |         | Determines whether a "previous" and "next" button will be provided                                          |
| `sortDirection` | `String`   |         | If set the allowed values are `asc` and `desc`                                                              |
| `keyProperty`   | `String`   | "key"   | property in rows which is assigned to the `:key` attribute when filling the table                           |

## Events
| Name          | Arguments                                      | Description                                                           |
|---------------|------------------------------------------------|-----------------------------------------------------------------------|
| `before-sort` | `{ prop: columnObject, dir: "asc", "desc") }`  | Fires when a column header is clicked, but before any rows are sorted |
| `after-sort`  | `{ prop: columnObject, dir: "asc", "desc" }`   | Fires after a the sorting of rows is complete                         |

## Slots
| Name                    | Scoped                          | Description                                       |
|-------------------------|---------------------------------|---------------------------------------------------|
| `{columnProperty}-name` | `sortDir`, `sortProp`, `column` | The content of the `th` element of a column       |
| `{columnProperty}`      | `row`                           | The content of a td element in the sortable tbody |
