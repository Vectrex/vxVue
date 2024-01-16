<script setup>
  import AccordionPanel from "./accordion-panel.vue"
  import {computed, onMounted, onUpdated, ref, useSlots} from "vue"

  const props = defineProps({ activeIndex: Number, multiple: Boolean })
  const emit = defineEmits(['update:activeIndex'])
  const slots = useSlots()
  const tabs = computed(() => {
    return slots.default().reduce((tabs, child) => {
        if (child.type.name === 'accordion-panel') {
          tabs.push(child)
        }
        return tabs
    }, [])
  })
  onMounted(() => {
    let panels = []
    slots.default().forEach(child => {
      if (child.type.name === 'accordion-panel') {
        panels.push(child)
      }
    })
    tabs.value = panels
  })
  onUpdated(() => {
    let panels = []
    slots.default().forEach(child => {
      if (child.type.__name === 'accordion-panel') {
        panels.push(child)
      }
    })
    tabs.value = panels
  })
</script>

<template>
  <component v-for="(tab, ndx) in tabs" :is="tab" :show="activeIndex === ndx" @select="emit('update:activeIndex', ndx)" />
</template>

