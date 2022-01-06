<template>
  <li :class="[!branch.branches || !branch.branches.length ? 'terminates' : '', $attrs['class']]">
    <div class="flex items-center pb-1">
      <template v-if="branch.branches && branch.branches.length">
        <input type="checkbox" :id="'branch-' + branch.id" @click="expanded = !expanded" :checked="expanded" class="hidden">
        <label :for="'branch-' + branch.id" class="mr-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="border h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" v-if="expanded">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 12H6" />
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" class="border h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" v-else>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </label>
      </template>
      <strong v-if="branch.current">{{ branch.label }}</strong>
      <a :href="branch.path" @click.prevent="$emit('branch-selected', branch)" v-else>{{ branch.label }}</a>
    </div>
    <ul v-if="branch.branches && branch.branches.length" v-show="expanded" class="ml-6">
      <simple-tree-branch v-for="child in branch.branches" :branch="child" :key="child.id" @branch-selected="$emit('branch-selected', $event)" />
    </ul>
  </li>
</template>

<script>
export default {
  name: 'simple-tree-branch',
  emits: ['branch-selected'],
  data() {
    return {
      expanded: false
    }
  },

  props: {
    branch: { type: Object, default: {} }
  },

  mounted() {
    if (this.branch.current) {
      let parent = this.$parent;
      while (parent && parent.branch && parent.expanded !== undefined) {
        parent.expanded = true;
        parent = parent.$parent;
      }
    }
  }
};
</script>
