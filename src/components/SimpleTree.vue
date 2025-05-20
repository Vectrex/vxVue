<script setup>
  import { PlusIcon, MinusIcon } from '@heroicons/vue/24/solid'
  import { onMounted, ref } from 'vue'
  defineOptions({ inheritAttrs: false })

  const props = defineProps({ branch: { type: Object, default: ()  => ({}) } })
  const emit = defineEmits(['expand'])
  const model = defineModel({ type: Object, default: null })
  const expanded = ref(false)
  onMounted(() => {
      if (props.branch === model.value) {
        emit('expand', true)
      }
  })
</script>

<template>
  <div :class="[!branch.branches || !branch.branches.length ? 'terminates' : '', $attrs['class']]">
    <div class="flex items-center pb-1">
      <button v-if="branch.branches && branch.branches.length" class="mr-2" @click="expanded = !expanded">
        <slot name="toggle" :branch="branch" :expanded="expanded">
          <component :is="expanded ? MinusIcon : PlusIcon" class="p-0.5 text-white rounded size-5 bg-vxvue-700 hover:bg-vxvue" />
        </slot>
      </button>
      <slot v-if="branch === model" name="label-selected" :branch="branch">
        <strong>{{ branch.label }}</strong>
      </slot>
      <button v-else @click="model = branch">
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