<script setup>
  import { ref } from "vue"

  const props = defineProps({ vertical: Boolean })
  const emit = defineEmits(['dragStart', 'dragStop'])

  const box = ref(null)
  const handle = ref(null)

  let dragging = false
  let startPos = {}
  let boxSize = null
  let containerSize = null
  let handleSize = null

  const drag = e => {
    if(dragging) {
      e.preventDefault()
      const { pageX, pageY } = e.touches?.[0] ?? e

      // limit dimensions to container

      if (!props.vertical) {
        box.value.style.width = Math.min(containerSize.width - handleSize.width - (boxSize.x - containerSize.x), boxSize.width + pageX - startPos.x) + "px"
      }
      else {
        box.value.style.height = Math.min (containerSize.height - handleSize.height - (boxSize.y - containerSize.y), boxSize.height + pageY - startPos.y) + "px"
      }
    }
  }
  const dragStart = e => {
    e.preventDefault()
    e.currentTarget.focus()
    dragging = true
    const { pageX, pageY } = e.touches?.[0] ?? e
    startPos = { x: pageX, y: pageY }
    handleSize = handle.value.getBoundingClientRect()
    boxSize = box.value.getBoundingClientRect()
    containerSize = box.value.parentElement.getBoundingClientRect()

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
    <div
      :class="['absolute flex', props.vertical ? 'inset-x-0 top-full justify-center py-2 cursor-ns-resize' : 'inset-y-0 left-full items-center px-2 cursor-ew-resize']"
      v-on=" {
        touchstart: dragStart,
        mousedown: dragStart,
        touchend: dragStop,
        mouseup: dragStop
      }"
      ref="handle"
    >
      <slot name="handle">
        <div :class="['rounded-full bg-vxvue-400', props.vertical ? 'h-1.5 w-8' : 'h-8 w-1.5']"></div>
      </slot>
    </div>
  </div>
</template>
