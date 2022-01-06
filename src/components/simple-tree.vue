<template>
  <ul class="flex">
    <simple-tree-branch :branch="branch" @branch-selected="$emit('branch-selected', $event)" v-bind="$attrs" />
  </ul>
</template>

<script>
    import SimpleTreeBranch from './simple-tree-branch.vue';

    export default {
        name: 'simple-tree',
        props: {
            branch: Object
        },
        components: {
          SimpleTreeBranch: SimpleTreeBranch
        }
    };
</script>
