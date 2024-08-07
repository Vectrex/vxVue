<script setup>

import { ref } from "vue"

const emit = defineEmits(['dragStart', 'dragStop'])

const box = ref(null)

let dragging = false
let xStart = null
let boxWidth = null

const resize = e => {
  box.value.style.width = (boxWidth + e.clientX - xStart) + "px"
}

const drag = e => {
  if(dragging) {
    e.preventDefault()
    resize (e)
  }
}
const dragStart = e => {
  e.preventDefault()
  dragging = true
  xStart = e.clientX
  boxWidth = box.value.clientWidth

  if (e.type === 'mousedown') {
    document.addEventListener('mousemove', drag)
    document.addEventListener('mouseup', dragStop)
  }
  else {
    document.addEventListener('touchmove', drag)
    document.addEventListener('touchend', dragStop)
  }
  emit('dragStart')
}
const dragStop = e => {
  if (dragging) {
    dragging = false
    if (e.type === 'mouseup') {
      document.removeEventListener('mousemove', drag)
      document.removeEventListener('mouseup', dragStop)
    }
    else {
      document.removeEventListener('touchmove', drag)
      document.removeEventListener('touchend', dragStop)
    }
    setTimeout(() => emit('dragStop'), 0)
  }
}
</script>

<template>
  <div class="relative w-1/2" ref="box">
    <div class="h-96 bg-amber-400"></div>
    <div class="absolute inset-y-0 left-full hidden cursor-ew-resize items-center px-2 sm:flex"
      v-on=" {
        touchstart: dragStart,
        mousedown: dragStart,
        touchend: dragStop,
        mouseup: dragStop
      }"
      ref="handle"
    >
      <div class="h-8 w-1.5 rounded-full bg-slate-400"></div>
    </div>
  </div>
</template>
