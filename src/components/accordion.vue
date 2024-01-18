<script setup>
import { computed, onBeforeUpdate, ref, useSlots } from "vue"

  const props = defineProps({ activeIndex: [Number, Array] })
  const emit = defineEmits(['update:activeIndex'])
  const slots = useSlots()
  const refs = ref([])
  const setRef = comp => refs.value.push(comp)
  const tabs = computed(() => {
    refs.value = []
    return slots.default().reduce((t, child) => {
        if ((child.type.__name || child.type.name) === 'accordion-panel') {
          t.push(child)
        }
        return t
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
  const focusNext = ndx => {
    ndx = ++ndx % tabs.value.length
    if (!refs.value[ndx].disabled) {
      setIndex(ndx)
      refs.value[ndx].focus()
      return
    }
    focusNext(ndx)
  }
  const focusPrevious = ndx => {
    ndx = (ndx ? ndx : tabs.value.length) - 1
    if (!refs.value[ndx].disabled) {
      setIndex(ndx)
      refs.value[ndx].focus()
      return
    }
    focusPrevious(ndx)
  }
  onBeforeUpdate(() => refs.value = [])
</script>

<template>
  <component
      v-for="(tab, ndx) in tabs"
      :key="ndx"
      :is="tab"
      :show="Array.isArray(activeIndex) ? activeIndex?.indexOf(ndx) !== -1 : activeIndex === ndx"
      @select="setIndex(ndx)"
      @keydown="focusNext(ndx)"
      @keyup="focusPrevious(ndx)"
      :ref="setRef"
  />
</template>