<script setup>
  import { PlusIcon, MinusIcon } from '@heroicons/vue/24/solid'
  import { onMounted, ref } from "vue"
  defineOptions({ inheritAttrs: false })

  const props = defineProps({
    branch: { type: Object, default: ()  => ({}) },
    modelValue: { type: Object, default: null }
  })
  const emit = defineEmits(['update:modelValue', 'expand'])
  const expanded = ref(false)
  onMounted(() => {
      if (props.branch === props.modelValue) {
        emit('expand', true)
      }
  })
</script>
<template>
  <div :class="[!branch.branches || !branch.branches.length ? 'terminates' : '', $attrs['class']]">
    <div class="flex items-center pb-1">
      <button v-if="branch.branches && branch.branches.length" class="mr-2" @click="expanded = !expanded">
        <slot name="toggle" :branch="branch" :expanded="expanded">
          <component :is="expanded ? MinusIcon : PlusIcon" class="p-1 text-white rounded-xs size-5 bg-vxvue-700 hover:bg-vxvue" />
        </slot>
      </button>
      <slot v-if="branch === modelValue" name="label-selected" :branch="branch">
        <strong>{{ branch.label }}</strong>
      </slot>
      <button v-else @click="emit('update:modelValue', branch)">
        <slot name="label" :branch="branch">
          {{ branch.label }}
        </slot>
      </button>
    </div>
    <div v-if="branch.branches && branch.branches.length" v-show="expanded" class="ml-6">
      <simple-tree
        v-for="child in branch.branches"
        :key="child.id || child.key || null"
        :branch="child"
        :model-value="modelValue"
        @update:model-value="emit('update:modelValue', $event)"
        @expand="expanded = $event; emit('expand', $event)"
      >
        <template v-for="(_, name) in $slots" #[name]="slotData">
          <slot :name="name" v-bind="slotData" />
        </template>
      </simple-tree>
    </div>
  </div>
</template>