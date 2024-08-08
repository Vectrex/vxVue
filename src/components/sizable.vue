<script setup>
  import { ref } from "vue"

  const emit = defineEmits(['dragStart', 'dragStop'])

  const box = ref(null)

  let dragging = false
  let startPos = {}
  let boxSize = null

  const drag = e => {
    if(dragging) {
      e.preventDefault()
      const { pageX, pageY } = e.touches?.[0] ?? e
      box.value.style.width = (boxSize.width + pageX - startPos.x) + "px"
    }
  }
  const dragStart = e => {
    e.preventDefault()
    e.currentTarget.focus()
    dragging = true
    const { pageX, pageY } = e.touches?.[0] ?? e
    startPos = { x: pageX, y: pageY}
    boxSize = box.value.getBoundingClientRect()

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
  <div class="relative" ref="box">
    <slot />
    <div class="absolute inset-y-0 left-full hidden cursor-ew-resize items-center px-2 sm:flex"
      v-on=" {
        touchstart: dragStart,
        mousedown: dragStart,
        touchend: dragStop,
        mouseup: dragStop
      }"
      ref="handle"
    >
      <slot name="handle">
        <div class="h-8 w-1.5 rounded-full bg-vxvue-400"></div>
      </slot>
    </div>
  </div>
</template>
