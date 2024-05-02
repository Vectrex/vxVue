<script setup>
    import Sortable from "../src/components/sortable.vue"
    import { computed, ref } from "vue"
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
    const cols = [
      { label: 'Name', prop: 'name', sortable: true },
      { label: 'Role', prop: 'role', sortable: true },
      { label: 'Born in', prop: 'yob', sortable: true }
    ]
</script>

# Sortable

A table which can be sorted by clicking the column headers. 

## Default Component
::: code-group
```js
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
    const cols = [
      { label: 'Name', prop: 'name', sortable: true },
      { label: 'Role', prop: 'role', sortable: true },
      { label: 'Born in', prop: 'yob', sortable: true }
    ]
```
```html
    <sortable :rows="rows" :columns="cols" />
```
:::

::: info Result
<sortable :rows="rows" :columns="cols" />
:::

## Properties
| Name            | Type       | Default | Description                                                                                                 |
|-----------------|------------|---------|-------------------------------------------------------------------------------------------------------------|
| `columns`       | `Object[]` |         | **required**; defines the table columns; every object requires at least the `label` and the `prop` property |
| `rows`          | `Object[]` |         | **required**; holds the row data                                                                            |
| `offset`        | `Number`   | null    |                                                                                                             |
| `count`         | `Number`   | null    |                                                                                                             |
| `sortProp`      | `String`   |         | Determines whether a "previous" and "next" button will be provided                                          |
| `sortDirection` | `String`   |         | If set the allowed values are `asc` and `desc`                                                              |
| `keyProperty`   | `String`   | "key"   | property in rows which is assigned to the `:key` attribute when filling the table                           |

## Events
| Name          | Arguments                                      | Description                                                           |
|---------------|------------------------------------------------|-----------------------------------------------------------------------|
| `before-sort` | `{ prop: columnObject, dir: "asc", "desc") }`  | Fires when a column header is clicked, but before any rows are sorted |
| `after-sort`  | `{ prop: columnObject, dir: "asc", "desc" }`   | Fires after a the sorting of rows is complete                         |

## Slots