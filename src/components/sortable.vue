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
    sortProp: { type: String },
    sortDirection: { type: String, validator: val => !val || ['asc', 'desc'].indexOf(val) !== -1 },
    keyProperty: { type: String, default: 'key' }
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
    <thead class="text-white bg-slate-700">
      <tr>
        <th
            scope="col"
            class="py-3 px-6 text-left"
            v-for="column in columns"
            :class="[
                      { 'cursor-pointer': column.sortable, 'active': sortBy === column.prop },
                      column.cssClass
                  ]"
            @click="column.sortable ? clickSort(column.prop) : null"
        >
          <slot :name="column.prop + '-header'" :column="column" :sort-dir="sortDir" :sort-prop="sortBy">
            <div class="flex items-center space-x-1"><span>{{ column.label }}</span>
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
    <tbody>
      <tr v-for="row in sortedRows" :key="row[keyProperty]" :class="row.cssClass">
        <td v-for="column in columns" class="py-3 px-6 whitespace-nowrap text-ellipsis overflow-hidden" :class="{ 'active': sortBy === column.prop }">
          <slot :name="column.prop" :row="row">{{ row[column.prop] }}</slot>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
  tbody tr:nth-of-type(2n + 1) {
    @apply bg-slate-100 text-slate-700;
  }
  tbody tr:nth-of-type(2n) {
    @apply bg-slate-200 text-slate-800;
  }
  tbody tr:nth-of-type(2n + 1) td.active {
    @apply bg-amber-100 text-amber-700;
  }
  tbody tr:nth-of-type(2n) td.active {
    @apply bg-amber-200 text-amber-800;
  }
  thead th.active {
      @apply bg-amber-800;
  }
</style>