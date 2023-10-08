<script setup>
  import { PlusIcon, MinusIcon } from '@heroicons/vue/24/solid'
  import { onMounted, ref } from "vue"
  defineOptions({ inheritAttrs: false })

  const props = defineProps({ branch: { type: Object, default: {} }})
  const emit = defineEmits(['branch-selected', 'expand'])
  const expanded = ref(false)
  onMounted(() => {
      if (props.branch.current) {
        emit('expand', true)
      }
  })
</script>
<template>
  <div :class="[!branch.branches || !branch.branches.length ? 'terminates' : '', $attrs['class']]">
    <div class="flex items-center pb-1">
      <template v-if="branch.branches && branch.branches.length">
        <input type="checkbox" :id="'branch-' + branch.id" @click="expanded = !expanded" :checked="expanded" class="hidden">
        <label :for="'branch-' + branch.id" class="mr-2">
          <component :is="expanded ? MinusIcon : PlusIcon" class="w-4 h-4 border" />
        </label>
      </template>
      <strong v-if="branch.current">{{ branch.label }}</strong>
      <a :href="branch.path" @click.prevent="emit('branch-selected', branch)" v-else>{{ branch.label }}</a>
    </div>
    <ul v-if="branch.branches && branch.branches.length" v-show="expanded" class="ml-6">
      <simple-tree
          v-for="child in branch.branches"
          :branch="child"
          :key="child.id"
          @branch-selected="emit('branch-selected', $event)"
          @expand="expanded = $event; emit('expand', $event)"
      />
    </ul>
  </div>
</template>