<template>
  <li :class="{ 'terminates': !branch.branches || !branch.branches.length }">
    <template v-if="branch.branches && branch.branches.length">
      <input type="checkbox" :id="'branch-' + branch.id" @click="expanded = !expanded" :checked="expanded">
      <label :for="'branch-' + branch.id"/>
    </template>
    <strong v-if="branch.current">{{ branch.label }}</strong>
    <a :href="branch.path" @click.prevent="$emit('branch-selected', branch)" v-else>{{ branch.label }}</a>
    <ul v-if="branch.branches && branch.branches.length" v-show="expanded">
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
