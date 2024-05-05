<script setup>
    import SimpleTree from "../src/components/simple-tree.vue"
    import { computed, ref } from "vue"

    const tree = ref({
        id: 1,
        label: "files",
        branches: [
            {
                id: 325,
                label: "articles",
                branches: [
                    {
                        id: 332,
                        label: "projects",
                        branches: [],
                        path: "files/articles/projects/"
                    },
                    {
                        id: 333,
                        label: "references",
                        branches: [
                            {
                                id: 330,
                                label: "www",
                                branches: [],
                                path: "files/articles/references/www/"
                            }
                        ],
                        path: "files/articles/references/"
                    }
                ],
                path: "files/articles/"
            },
            {
                id: 328,
                label: "media",
                branches: [],
                path: "files/media/"
            },
            {
                id: 329,
                label: "misc",
                branches: [],
                path: "files/misc/"
            }
        ],
        path: "files/"
    })
    const findBranch = (branch, id) => {
        if(branch.id === id) {
            return branch
        }
        if (branch.branches && branch.branches.length) {
            for(let i = 0, l = branch.branches.length; i < l; ++i) {
                let found = findBranch(branch.branches[i], id) 
                if (found) {
                    return found
                }
            }
        }
    }
    const selectedBranch = ref(findBranch(tree.value, 333))
</script>

# SimpleTree

A recursive component which renders nested structures into a tree. The tree starts with a root branch and every branch can have a branches property containing branch objects.

**Properties of a Branch Object**

| Property           | Required | Type               | Description                                                                                                                 |
|--------------------|----------|--------------------|-----------------------------------------------------------------------------------------------------------------------------|
| `label`            | yes      | `String`           | Label of a branch                                                                                                           |
| `id` or `key`      |          | `String`, `Number` | Used as key for Vue's state maintenance                                                                                     |
| `branches`         |          | `Array`            | An array of branches; if it contains objects a [+]/[-] icon will be displayed and the subtree can be expanded and collapsed |


## Default Component
A simple recursive function is used to pre-select a specific branch.

::: code-group
```js
const tree = ref({
    id: 1,
    label: "files",
    branches: [
        {
            id: 325,
            label: "articles",
            branches: [
                {
                    id: 332,
                    label: "projects",
                    branches: [],
                    path: "files/articles/projects/"
                },
                {
                    id: 333,
                    label: "references",
                    branches: [
                        {
                            id: 330,
                            label: "www",
                            branches: [],
                            path: "files/articles/references/www/"
                        }
                    ],
                    path: "files/articles/references/"
                }
            ],
            path: "files/articles/"
        },
        {
            id: 328,
            label: "media",
            branches: [],
            path: "files/media/"
        },
        {
            id: 329,
            label: "misc",
            branches: [],
            path: "files/misc/"
        }
    ],
    path: "files/"
})
const findBranch = (branch, id) => {
    if(branch.id === id) {
        return branch
    }
    if (branch.branches && branch.branches.length) {
        for(let i = 0, l = branch.branches.length; i < l; ++i) {
            let found = findBranch(branch.branches[i], id)
            if (found) {
                return found
            }
        }
    }
}
const selectedBranch = ref(findBranch(tree.value, 333))
```
```html
<div>Selected branch: <em>{{ selectedBranch.label }}</em></div>
<simple-tree :branch="tree" v-model="selectedBranch" />
```
:::

::: info Result
<div>Selected branch: <em>{{ selectedBranch.label }}</em></div>
<simple-tree :branch="tree" v-model="selectedBranch" />
:::

## Properties
| Name          | Type     | Default | Description     |
|---------------|----------|---------|-----------------|
| `modelValue`  | `Object` | `null`  | a branch object |
| `branch`      | `Object` | `{}`    |                 |

## Events
| Name                | Arguments                                                                                                | Description                                                                        |
|---------------------|----------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------|
| `update:modelValue` | `branch` - The branch selected by user interaction                                                       | Emitted when the label of a branch is clicked                                      |
| `expand`            | `state` - Boolean indicating whether a subtree of the branch is expanded (`true`) or collapsed (`false`) | Emitted only when mounted to open up the tree to the branch passed as `modelValue` |
