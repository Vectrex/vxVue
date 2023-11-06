<script setup>
  import { ref } from "vue"

  const props = defineProps({ min: Number, max: Number })

  const v1 = ref(20)
  const initPos = ref({ x: null, y: null })
  const trackSize = ref( { w: null, h: null })
  const dragging = ref(false)
  const track = ref(null)
  const updateModel = v => {
    let newValue = parseFloat(v.toFixed(10))
    newValue = Math.min(props.max, (Math.max(props.min, newValue)))
    v1.value = newValue
  }
  const setValue = e => {
    const { pageX, pageY } = e.touches ? e.touches[0] : e
    const thumbValue = (pageX - initPos.value.x) / trackSize.value.w
    updateModel(Math.floor((props.max - props.min) * thumbValue + props.min))
  }
  const drag = e => {
    if(dragging.value) {
      e.preventDefault()
      setValue(e)
    }
  }
  const dragStart = e => {
    dragging.value = true
    const doc = document.documentElement
    const box = track.value.getBoundingClientRect()
    initPos.value = {
      x: box.left + doc.scrollLeft - doc.clientLeft,
      y: box.top + doc.scrollTop - doc.clientTop
    }
    trackSize.value = {
      w: track.value.offsetWidth,
      h: track.value.offsetHeight
    }
    e.currentTarget.focus()
    document.addEventListener('mousemove', drag)
    document.addEventListener('mouseup', dragStop)
  }
  const dragStop = () => {
    if (dragging.value) {
      dragging.value = false
      document.removeEventListener('mousemove', drag)
      document.removeEventListener('mouseup', dragStop)
    }
  }
</script>

<template>
  <div class="relative w-full h-2 bg-vxvue-500 rounded-l-full rounded-r-full" ref="track">
    <div
        class="rounded-full h-6 w-6 -translate-x-3 -translate-y-2 absolute bg-vxvue-alt-500"
        tabindex="0"
        :style="{ left: v1 + '%' }"
        @mousedown.prevent="dragStart"
        role="slider"
    />
  </div>
  {{ initPos }}
</template>
