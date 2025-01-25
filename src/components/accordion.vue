<script setup>
import { computed, onBeforeUpdate, ref, useSlots } from "vue"

  const props = defineProps({ activeIndex: { type: [Number, Array], default: null }})
  const emit = defineEmits(['update:activeIndex'])
  const slots = useSlots()
  const refs = ref([])
  const setRef = comp => refs.value.push(comp)
  const tabs = computed(() => {
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
    :is="tab"
    v-for="(tab, ndx) in tabs"
    :key="ndx"
    :ref="setRef"
    :show="Array.isArray(activeIndex) ? activeIndex?.includes(ndx) : activeIndex === ndx"
    @select="setIndex(ndx)"
    @keydown="focusNext(ndx)"
    @keyup="focusPrevious(ndx)"
  />
</template>