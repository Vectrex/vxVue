<script setup>
  import { computed, useSlots } from "vue"

  const props = defineProps({ activeIndex: [Number, Array] })
  const emit = defineEmits(['update:activeIndex'])
  const slots = useSlots()
  const tabs = computed(() => {
    return slots.default().reduce((tabs, child) => {
        if ((child.type.__name || child.type.name) === 'accordion-panel') {
          tabs.push(child)
        }
        return tabs
    }, [])
  })
  const setIndex = ndx => {
    if(Array.isArray(props.activeIndex)) {
      let currentNdx = [].concat(props.activeIndex)
      let found = currentNdx.findIndex(item => item === ndx)
      if (found === -1) {
        emit('update:activeIndex', [...currentNdx, ndx])
      }
      else {
        currentNdx.splice(found, 1)
        emit('update:activeIndex', currentNdx)
      }
    }
    else {
      emit('update:activeIndex', ndx === props.activeIndex ? -1 : ndx)
    }
  }
</script>

<template>
  <component v-for="(tab, ndx) in tabs" :is="tab" :show="Array.isArray(activeIndex) ? activeIndex?.indexOf(ndx) !== -1 : activeIndex === ndx" @select="setIndex(ndx)" />
</template>