<template>
    <table class="min-w-full divide-y divide-gray-200 sortable table-fixed">
        <thead class="bg-gray-100">
        <tr>
            <th
                scope="col"
                class="px-6 py-3 text-left"
                v-for="column in columns"
                :class="[
                    { 'cursor-pointer' : column.sortable },
                    column.cssClass,
                    column.width,
                ]"
                @click="column.sortable ? clickSort(column) : null"
            >
                <slot :name="column.prop + '-header'" :column="column">
                  <div class="flex items-center"><span>{{ column.label }}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 flex-shrink-0 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" v-if="column.sortable">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="sortDir === 'asc' ? 'M19 9l-7 7-7-7' : 'M5 15l7-7 7 7'" v-if="sortColumn === column" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4" v-else />
                    </svg>
                  </div>
                </slot>
            </th>
        </tr>
        </thead>
        <tbody>
            <tr v-for="row in sortedRows" :key="row[keyProperty]" :class="row.cssClass">
                <td v-for="column in columns" class="px-6 py-3 whitespace-nowrap" :class="{ 'active': sortColumn === column }">
                  <slot :name="column.prop" :row="row">{{ row[column.prop] }}</slot>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
    export default {
        name: 'sortable',
        emits: ['before-sort', 'after-sort'],
        props: {
            columns: {
                type: Array,
                required: true,
                validator (val) {
                    for(let l = val.length; l--;) {
                        if(val[l].label === undefined || val[l].prop === undefined) {
                            return false;
                        }
                    }
                    return true;
                }
            },
            rows: {
                type: Array,
                required: true
            },
            offset: {
                type: Number,
                default: null
            },
            count: {
                type: Number,
                default: null
            },
            sortProp: {
                type: String
            },
            sortDirection: {
                type: String,
                validator (val) {
                    return !val || ['asc', 'desc'].indexOf(val) !== -1;
                }
            },
            keyProperty: {
              type: String,
              default: 'key'
            }
        },

        data() {
            return {
                sortColumn: this.columns.find(({prop}) => prop === this.sortProp),
                sortDir: this.sortDirection
            };
        },

        computed: {
            sortedRows () {
                let rows = this.rows.slice();

                if(this.sortColumn) {
                    if (this.sortDir === 'asc' && this.sortColumn.sortAscFunction) {
                        rows.sort (this.sortColumn.sortAscFunction);
                    }
                    else if (this.sortDir === 'desc' && this.sortColumn.sortDescFunction) {
                        rows.sort (this.sortColumn.sortDescFunction);
                    }
                    else {
                        let prop = this.sortColumn.prop;

                        rows.sort((a, b) => {
                            if (a[prop] < b[prop]) {
                                return this.sortDir === "asc" ? -1 : 1;
                            }
                            if (a[prop] > b[prop]) {
                                return this.sortDir === "asc" ? 1 : -1;
                            }
                            return 0;
                        });
                    }
                }

                let offset = this.offset || 0, count = this.count || rows.length;

                return rows.slice(offset, offset + count);
            }
        },

        methods: {
            clickSort (column) {
                this.$emit('before-sort');
                if(this.sortColumn === column) {
                    this.sortDir = this.sortDir === 'asc' ? 'desc' : 'asc';
                }
                else {
                    this.sortColumn = column;
                    this.sortDir = this.sortDir || 'asc';
                }
                this.$nextTick( () => this.$emit('after-sort') );
            }
        }
    }
</script>

<style scoped>
  tbody tr:nth-of-type(2n + 1) {
    @apply bg-gray-50
  }
</style>
