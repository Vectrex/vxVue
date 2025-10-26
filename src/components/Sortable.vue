<script setup>
  import { ChevronDownIcon, ChevronUpIcon, ChevronUpDownIcon } from "@heroicons/vue/24/solid"
  import { computed, nextTick, ref } from "vue"

  const props = defineProps({
    columns: {
      type: Array,
      required: true,
      validator: val => {
        for (const c of val) {
          if(c.label === undefined || c.prop === undefined) {
            return false
          }
        }
        return true
      }
    },
    rows: { type: Array, required: true },
    offset: { type: Number, default: null },
    count: { type: Number, default: null },
    sortProp: { type: String, default: null },
    sortDirection: { type: String, default: null, validator: val => !val || ['asc', 'desc'].includes(val) },
    keyProperty: { type: String, default: 'key' },
    headerClass: { type: String, default: 'text-white bg-vxvue-700 [&_*[data-active]]:bg-vxvue-alt-800' },
    bodyClass: { type: String, default: '[&>*:nth-child(even)]:bg-vxvue-50 [&>*:nth-child(even)_*[data-active]]:bg-vxvue-alt-100 [&>*:nth-child(odd)_*[data-active]]:bg-vxvue-alt-50' }
  })
  const emit = defineEmits(['before-sort', 'after-sort'])

  const sortBy = ref(props.sortProp)
  const sortDir = ref(props.sortDirection)
  const sortedRows = computed(() => {
    let rows = props.rows.slice()
    const col = props.columns.find(({ prop }) => prop === sortBy.value)
    if(col) {
      if (sortDir.value === 'asc' && col.sortAscFunction) {
        rows.sort (col.sortAscFunction)
      }
      else if (sortDir.value === 'desc' && col.sortDescFunction) {
        rows.sort (col.sortDescFunction)
      }
      else {
        rows.sort((a, b) => {
          if (a[sortBy.value] < b[sortBy.value]) {
            return sortDir.value === "asc" ? -1 : 1
          }
          if (a[sortBy.value] > b[sortBy.value]) {
            return sortDir.value === "asc" ? 1 : -1
          }
          return 0
        })
      }
    }
    return rows.slice(props.offset || 0, (props.offset || 0) + (props.count || rows.length))
  })
  const clickSort = prop => {
    emit('before-sort', { prop: sortBy.value, dir: sortDir.value })
    if(sortBy.value === prop) {
      sortDir.value = sortDir.value === 'asc' ? 'desc' : 'asc'
    }
    else {
      sortBy.value = prop
      sortDir.value = sortDir.value || 'asc'
    }
    nextTick( () => emit('after-sort', { prop: sortBy.value, dir: sortDir.value }))
  }
</script>

<template>
  <table :class="$attrs.class || 'w-full divide-y divide-y-slate-900 table-fixed'">
    <thead :class="headerClass">
      <tr>
        <th
          v-for="column in columns"
          :key="column.prop"
          scope="col"
          :data-active="sortBy === column.prop ? 'active' : null"
          :class="['py-3 px-6 text-left',
            { 'cursor-pointer': column.sortable },
            column.cssClass
          ]"
          @click="column.sortable ? clickSort(column.prop) : null"
        >
          <slot :name="column.prop + '-header'" :column="column" :sort-dir="sortDir" :sort-prop="sortBy">
            <div class="flex items-center space-x-1">
              <span>{{ column.label }}</span>
              <component
                :is="sortBy !== column.prop ? ChevronUpDownIcon : (sortDir === 'asc' ? ChevronDownIcon : ChevronUpIcon)"
                v-if="column.sortable"
                class="size-4"
              />
            </div>
          </slot>
        </th>
      </tr>
    </thead>
    <tbody :class="bodyClass">
      <tr
        v-for="row in sortedRows"
        :key="row[keyProperty]"
        :class="row.cssClass"
      >
        <td
          v-for="column in columns"
          :key="column.prop"
          :data-active="sortBy === column.prop ? 'active' : null"
          class="overflow-hidden py-3 px-6 whitespace-nowrap text-ellipsis"
        >
          <slot :name="column.prop" :row="row">
            {{ row[column.prop] }}
          </slot>
        </td>
      </tr>
    </tbody>
  </table>
</template>