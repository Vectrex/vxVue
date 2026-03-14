<script setup>
  import FormSelect from './FormSelect.vue'
  import { computed } from 'vue'

  const props = defineProps({
    items: { type: Array, default: () => [] },
    activeIndex: { type: Number, default: 0 }
  })
  const emit = defineEmits(['update:activeIndex'])

  const activeTab = computed(() => props.items[props.activeIndex] || null)
  const selectOptions = computed(() =>
    props.items
      .map((item, ndx) => ({ ...item, ndx }))
      .filter(item => !item.disabled)
      .map(item => ({ label: item.name, key: item.ndx }))
    )
  const itemOnClick = ((item, ndx) => {
    if (item.disabled) return
    emit('update:activeIndex', ndx)
  })
</script>

<template>
  <div class="sm:hidden">
    <form-select :options="selectOptions" :model-value="activeIndex" class="w-full" @update:model-value="emit('update:activeIndex', $event)" />
  </div>
  <div class="hidden sm:block">
    <div class="border-b border-gray-200">
      <nav class="flex -mb-px space-x-8" aria-label="Tabs">
        <button
          v-for="(item, ndx) in items"
          :key="item.name + '-' + ndx"
          type="button"
          :class="['group inline-flex items-center py-4 px-1 border-b-4 font-medium border-transparent focus:outline-none focus-visible:ring-4 focus-visible:ring-vxvue/50',
            {
              'border-vxvue text-vxvue' : activeTab === item,
              'cursor-not-allowed text-gray-400': item.disabled,
              'text-gray-900 hover:text-vxvue-600 hover:border-vxvue-600': activeTab !== item && !item.disabled
            },
          ]"
          :aria-current="activeTab === item ? 'page' : undefined"
          :aria-disabled="item.disabled || undefined"
          :disabled="item.disabled"
          @click="itemOnClick(item, ndx)"
        >
          <!-- icon  -->

          <slot name="icon" :tab="item" />

          <span><slot :tab="item">{{ item.name }}</slot></span>

          <!-- badge -->

          <slot name="badge" :tab="item">
            <span
              v-if="item.badge"
              :class="['hidden ml-3 py-0.5 px-2.5 rounded-full text-xs font-medium md:inline-block text-current',
                {
                  'bg-gray-100': item.disabled,
                  'bg-vxvue-50': activeIndex === ndx,
                  'bg-gray-200': activeTab !== item && !item.disabled
                }
              ]"
            >{{ item.badge }}</span>
          </slot>
        </button>
      </nav>
    </div>
  </div>
</template>