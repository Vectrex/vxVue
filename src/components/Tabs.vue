<script setup>
  import FormSelect from "./FormSelect.vue"
  import { computed, ref, watch } from "vue"

  const props = defineProps({
    items: { type: Array, default: () => [] },
    activeIndex: { type: Number, default: 0 }
  })
  const emit = defineEmits(['update:activeIndex'])

  const activeTab = ref(props.items[props.activeIndex] || {})
  const selectOptions = computed(() => {
    let options = []
    props.items.forEach((item, ndx) => { if(!item.disabled) {options.push( { label: item.name, key: ndx })}})
    return options
  })
  watch(() => props.activeIndex, newVal => {
    activeTab.value = props.items[newVal] || {}
  })
  const itemOnClick = item => {
    if (!item.disabled) {
      activeTab.value = item
      emit('update:activeIndex', props.items.indexOf(item))
    }
  }
</script>

<template>
  <div class="sm:hidden">
    <form-select :options="selectOptions" :model-value="activeIndex" class="w-full" @update:model-value="emit('update:activeIndex', $event)" />
  </div>
  <div class="hidden sm:block">
    <div class="border-b border-gray-200">
      <nav class="flex -mb-px space-x-8" aria-label="Tabs">
        <a
          v-for="item in items"
          :key="item.name"
          href="#"
          :class="[
            'group inline-flex items-center py-4 px-1 border-b-4 font-medium no-underline! border-transparent',
            {
              'border-vxvue text-vxvue' : activeTab === item ,
              'cursor-not-allowed text-gray-400': item.disabled,
              'text-gray-900 hover:text-vxvue-600 hover:border-vxvue-600': activeTab !== item && !item.disabled
            },
          ]"
          :aria-current="activeTab === item ? 'page' : undefined"
          @click.prevent="itemOnClick(item)"
        >
          <!-- icon  -->

          <slot name="icon" :tab="item" />

          <span><slot :tab="item">{{ item.name }}</slot></span>

          <!-- badge -->

          <slot name="badge" :tab="item">
            <span
              v-if="item.badge"
              :class="[
                'hidden ml-3 py-0.5 px-2.5 rounded-full text-xs font-medium md:inline-block text-current',
                {
                  'bg-gray-100': item.disabled,
                  'bg-vxvue-50': activeTab === item,
                  'bg-gray-200': activeTab !== item && !item.disabled
                }
              ]"
            >{{ item.badge }}</span>
          </slot>
        </a>
      </nav>
    </div>
  </div>
</template>