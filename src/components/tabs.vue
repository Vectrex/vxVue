<script setup>
  import FormSelect from "./form-select.vue"
  import { computed, ref, watch } from "vue"

  const props = defineProps({
    items: { type: Array, default: [] },
    activeIndex: { type: Number, default: 0 }
  })
  const emit = defineEmits(['update:active-index'])

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
      emit('update:active-index', props.items.indexOf(item))
    }
  }
</script>

<template>
  <div class="sm:hidden">
    <form-select :options="selectOptions" :model-value="activeIndex" @update:model-value="emit('update:activeIndex', $event)" class="w-full" />
  </div>
  <div class="hidden sm:block">
    <div class="border-b border-gray-200">
      <nav class="flex -mb-px space-x-8" aria-label="Tabs">
        <a v-for="item in items"
           :key="item.name"
           href="#"
           @click.prevent="itemOnClick(item)"
           :class="[
              activeTab === item ? 'border-vxvue-500 text-vxvue-600' : 'border-transparent text-gray-900 hover:text-gray-700 hover:border-gray-300',
              item.disabled ? 'cursor-not-allowed text-gray-400 hover:border-transparent' : '',
              'group inline-flex items-center py-4 px-1 border-b-4 font-medium no-underline',
           ]"
           :aria-current="activeTab === item ? 'page' : undefined"
        >
          <!-- icon  -->

          <slot name="icon" :tab="item" />

          <span><slot :tab="item">{{ item.name }}</slot></span>

          <!-- badge -->

          <slot name="badge" :tab="item">
            <span v-if="item.badge"
              :class="[
                activeTab === item ? 'bg-vxvue-50 text-vxvue-700' : 'bg-gray-200 text-gray-900',
                item.disabled ? 'bg-gray-100 text-gray-400' : '',
                'hidden ml-3 py-0.5 px-2.5 rounded-full text-xs font-medium md:inline-block'
              ]"
            >{{ item.badge }}</span>
          </slot>
        </a>
      </nav>
    </div>
  </div>
</template>