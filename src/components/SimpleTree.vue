<script setup>
  import { PlusIcon, MinusIcon } from '@heroicons/vue/24/solid'
  import { computed, ref, watch } from 'vue'
  defineOptions({ inheritAttrs: false })

  const props = defineProps({ branch: { type: Object, default: ()  => ({}) } })
  const emit = defineEmits(['expand'])
  const model = defineModel({ type: Object, default: null })
  const expanded = ref(false)
  const hasChildren = computed(() => props.branch.branches && props.branch.branches.length)
  watch (() => model.value, v => {
    if (v === props.branch) {
      expanded.value = true
      emit('expand', true)
    }
  }, { immediate: true })
</script>

<template>
  <div :class="[!hasChildren ? 'terminates' : '', $attrs['class']]">
    <div class="flex items-center pb-1">
      <button v-if="hasChildren" type="button" class="mr-2 focus:ring-4 focus:outline-hidden focus:ring-vxvue/50" @click="expanded = !expanded">
        <slot name="toggle" :branch="branch" :expanded="expanded">
          <component :is="expanded ? MinusIcon : PlusIcon" class="p-0.5 text-white rounded size-5 bg-vxvue-700 hover:bg-vxvue" />
        </slot>
      </button>
      <slot v-if="branch === model" name="label-selected" :branch="branch">
        <strong>{{ branch.label }}</strong>
      </slot>
      <button v-else type="button" class="focus:ring-4 focus:outline-hidden focus:ring-vxvue/50" @click="model = branch">
        <slot name="label" :branch="branch">
          {{ branch.label }}
        </slot>
      </button>
    </div>
    <div v-if="hasChildren" v-show="expanded" class="ml-6">
      <simple-tree
        v-for="(child, ndx) in branch.branches"
        :key="child.id || child.key || ndx"
        :branch="child"
        v-model="model"
        @expand="expanded = $event; emit('expand', $event)"
      >
        <template v-for="(_, name) in $slots" #[name]="slotData">
          <slot :name="name" v-bind="slotData" />
        </template>
      </simple-tree>
    </div>
  </div>
</template>