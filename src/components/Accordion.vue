<script setup>
  import AccordionPanel from './AccordionPanel.vue'
  import { computed, onBeforeUpdate, ref, useSlots } from 'vue'

  const props = defineProps({ activeIndex: { type: [Number, Array], default: null }})
  const emit = defineEmits(['update:activeIndex'])
  const slots = useSlots()
  const panels = ref([])
  const tabs = computed(() => {
    const t = []
    slots.default().forEach(child => {
      if (child.type === AccordionPanel) t.push(child)

      // in case accordion panels are attached via v-for

      else if (typeof child.type === 'symbol' && Array.isArray(child.children)) {
        child.children.forEach(c => { if (c.type === AccordionPanel) t.push(c) })
      }
    })
    return t
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
  const focusNext = ndx => {
    ndx = ++ndx % tabs.value.length
    if (!panels.value[ndx].disabled) {
      setIndex(ndx)
      panels.value[ndx].focus()
      return
    }
    focusNext(ndx)
  }
  const focusPrevious = ndx => {
    ndx = (ndx ? ndx : tabs.value.length) - 1
    if (!panels.value[ndx].disabled) {
      setIndex(ndx)
      panels.value[ndx].focus()
      return
    }
    focusPrevious(ndx)
  }
  onBeforeUpdate(() => panels.value = [])
</script>

<template>
  <component
    :is="tab"
    v-for="(tab, ndx) in tabs"
    ref="panels"
    :show="Array.isArray(activeIndex) ? activeIndex?.includes(ndx) : activeIndex === ndx"
    @select="setIndex(ndx)"
    @keydown="focusNext(ndx)"
    @keyup="focusPrevious(ndx)"
  />
</template>