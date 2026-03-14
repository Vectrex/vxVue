<script setup>
  import { onBeforeUnmount, ref } from 'vue'

  const props = defineProps({
    vertical: Boolean,
    min: { type: Number, default: 0 },
    max: { type: Number, default: Infinity },
  })
  const emit = defineEmits(['dragStart', 'dragStop', 'resize'])

  const box = ref(null)
  const handle = ref(null)

  let dragging = false
  let activePointerId = null
  let startPointer = 0
  let startSize = 0
  let maxSize = Infinity

  const dragStart = e => {
    e.preventDefault()
    activePointerId = e.pointerId
    dragging = true
    startPointer = e[props.vertical ? 'clientY' : 'clientX']
    startSize = box.value.getBoundingClientRect()[props.vertical ? 'height' : 'width']

    const boxRect = box.value.getBoundingClientRect()
    const parentRect = box.value.parentElement.getBoundingClientRect()
    const handleRect = handle.value.getBoundingClientRect()

    // update constraints

    if (props.vertical) {
      maxSize = parentRect.bottom - boxRect.top - handleRect.height
    }
    else {
      maxSize = parentRect.right - boxRect.left - handleRect.width
    }

    handle.value?.setPointerCapture?.(activePointerId)
    emit('dragStart')
  }
  const drag = e => {
    if (!dragging) return

    e.preventDefault()
    const currentPointer = e[props.vertical ? 'clientY' : 'clientX']
    const newSize = startSize + currentPointer - startPointer
    box.value.style[props.vertical ? 'height' : 'width'] = Math.min(props.max, Math.max(props.min, Math.min(maxSize, newSize))) + 'px'
    emit('resize', newSize)
  }
  const dragStop = () => {
    if (!dragging) return
    dragging = false
    handle.value?.releasePointerCapture?.(activePointerId)
    activePointerId = null
    emit('dragStop')
  }

  onBeforeUnmount(dragStop)
</script>

<template>
  <div ref="box" class="relative">
    <slot />
    <div
      ref="handle"
      :class="['absolute flex touch-none outline-none', props.vertical ? 'inset-x-0 top-full justify-center py-1 cursor-ns-resize' : 'inset-y-0 left-full items-center px-1 cursor-ew-resize']"
      :aria-orientation="props.vertical ? 'vertical' : 'horizontal'"
      role="separator"
      @pointerdown="dragStart"
      @pointermove="drag"
      @pointerup="dragStop"
      @pointercancel="dragStop"
    >
      <slot name="handle">
        <div :class="['rounded-full bg-vxvue', props.vertical ? 'h-1.5 w-8' : 'h-8 w-1.5']" />
      </slot>
    </div>
  </div>
</template>
