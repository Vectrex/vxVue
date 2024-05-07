<script setup>
  import { PlusIcon, MinusIcon } from '@heroicons/vue/24/solid'
  import { onMounted, ref } from "vue"
  defineOptions({ inheritAttrs: false })

  const props = defineProps({
    branch: { type: Object, default: {} },
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
      <button @click="expanded = !expanded" class="mr-2" v-if="branch.branches && branch.branches.length">
        <slot name="toggle" :branch="branch" :expanded="expanded">
          <component :is="expanded ? MinusIcon : PlusIcon" class="p-1 text-white rounded-sm size-5 bg-vxvue-700 hover:bg-vxvue" />
        </slot>
      </button>
      <slot name="label-selected" :branch="branch" v-if="branch === modelValue">
          <strong>{{ branch.label }}</strong>
      </slot>
      <button @click="emit('update:modelValue', branch)" v-else>
        <slot name="label" :branch="branch">{{ branch.label }}</slot>
      </button>
    </div>
    <div v-if="branch.branches && branch.branches.length" v-show="expanded" class="ml-6">
      <simple-tree
          v-for="child in branch.branches"
          :key="child.id || child.key || null"
          :branch="child"
          :model-value="modelValue"
          @update:modelValue="emit('update:modelValue', $event)"
          @expand="expanded = $event; emit('expand', $event)"
      >
        <template v-for="(_, name) in $slots" v-slot:[name]="slotData">
          <slot :name="name" v-bind="slotData"/>
        </template>
      </simple-tree>
    </div>
  </div>
</template>