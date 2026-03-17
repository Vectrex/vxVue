<script setup>
  import {computed, onBeforeUnmount, ref, useAttrs, watch } from 'vue'
  defineOptions({ inheritAttrs: false })

  const props = defineProps({
    min: { type: Number, default: 0 },
    max: { type: Number, default: 100 },
    vertical: Boolean,
    disabled: Boolean,
    showTooltip: { type: String, default: 'never', validator: v => ['always', 'focus', 'never'].includes(v) },
    formatTooltip: { type: Function, default: v => String(v) }
  })
  const model = defineModel({
    type: [Number, Array],
    default: null,
    validator: v => typeof v === 'number' || v.every(item => typeof item === 'number')
  })
  const emit = defineEmits(['dragStart', 'dragStop'])
  const attrs = useAttrs()
  let dragging = false
  let activePointerId = null
  let activeHandle = null
  const track = ref(null)
  const thumbNdx = ref(0)
  const tooltip = ref(null)
  const handle = ref(null)
  const range = computed(() => props.max - props.min)
  const thumbPos = computed(() => {
    const max = props.max, min = props.min
      return Array.isArray(model.value) ?
          model.value.map(v => (Math.max(Math.min(v, max), min) - min) * 100 / (max - min)) :
          (Math.max(Math.min(model.value, max), min) - min) * 100 / (max - min)
  })
  const selectedTrackStyle = computed(() => {
    if (Array.isArray(model.value)) {
      const min = Math.min(...thumbPos.value)
      const offset = min + '%'
      const length = Math.max(...thumbPos.value) - min + '%'
      return props.vertical ? { bottom:  offset, height:  length } : { left: offset, width: length }
    }
    return props.vertical ? { bottom: 0, height: thumbPos.value + '%' } : { width: thumbPos.value + '%' }
  })
  const setTooltipPos = () => {
    if (props.showTooltip !== 'never' && tooltip.value) {
      const handles = Array.isArray(handle.value) ? handle.value : [handle.value]
      const tooltips = Array.isArray(tooltip.value) ? tooltip.value : [tooltip.value]

      const rect = handles[0].getBoundingClientRect()
      const min = rect[props.vertical ? 'left' : 'top']

      let size = 0
      for (const el of tooltips) {
        const r = el.getBoundingClientRect()
        size = Math.max(size, r[props.vertical ? 'width' : 'height'])
      }

      let style = 'tooltip ' + (props.showTooltip === 'focus' ? 'tooltip-focused ' : '')

      // 10px is the approximate size of the tooltip 'arrow'

      if (props.vertical)
        style += min < size + 10 ? 'tooltip-right' : 'tooltip-left'
      else
        style += min < size + 10 ? 'tooltip-bottom' : 'tooltip-top'

      for (const el of tooltips) el.className = style
    }
  }
  const updateModel = v => {
    let newValue = parseFloat(v.toFixed(10))
    newValue = Math.min(props.max, (Math.max(props.min, newValue)))
    if(Array.isArray(model.value)) {
      const arr = [...model.value]
      arr[thumbNdx.value] = newValue
      model.value = arr
    }
    else {
      model.value = newValue
    }
  }
  const setValue = e => {
    const rect = track.value.getBoundingClientRect()
    const ratio = props.vertical ? (rect.bottom - e.clientY) / rect.height : (e.clientX - rect.left) / rect.width
    updateModel(Math.floor(range.value * ratio + props.min))
  }
  const dragStart = ndx => e => {
    e.preventDefault()
    thumbNdx.value = ndx
    dragging = true
    activePointerId = e.pointerId
    activeHandle = e.currentTarget
    activeHandle.focus()
    activeHandle?.setPointerCapture?.(activePointerId)
    setValue(e)
    emit('dragStart')
  }
  const drag = e => {
    if (!dragging || e.pointerId !== activePointerId) return
    e.preventDefault()
    setValue(e)
  }
  const dragStop = () => {
    if (!dragging) return

    dragging = false
    if (activePointerId !== null && activeHandle?.hasPointerCapture?.(activePointerId)) {
      activeHandle.releasePointerCapture(activePointerId)
    }
    activePointerId = null
    activeHandle = null
    emit('dragStop')
  }
  const handleKeydown = e => {
    if(['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End'].includes(e.key)) {
      e.preventDefault()
    }
    const v = model.value[thumbNdx.value] ?? model.value

    switch (e.key) {
      case 'ArrowLeft':
      case 'ArrowDown':
        updateModel(v - 1); break
      case 'ArrowRight':
      case 'ArrowUp':
        updateModel(v + 1); break
      case 'PageUp':
        updateModel(v + range.value / 10); break
      case 'PageDown':
        updateModel(v - range.value / 10); break
      case 'Home':
        updateModel(props.min); break
      case 'End':
        updateModel(props.max)
    }
  }
  const trackClick = e => setValue(e)
  watch(thumbPos, () => setTooltipPos())
  onBeforeUnmount(dragStop)
</script>

<template>
  <div
    ref="track"
    :class="['relative bg-slate-300', vertical ? 'h-full w-2 rounded-t-full rounded-b-full' : 'w-full h-2 rounded-r-full rounded-l-full']"
    role="slider"
    aria-label="slider-thumb"
    :aria-valuemin="min"
    :aria-valuemax="max"
    :aria-valuenow="model[0] ?? model"
    :aria-valuetext="model"
    v-on="!disabled ? { click: trackClick } : {}"
  >
    <div
      v-if="!disabled"
      :class="['absolute bg-vxvue', vertical ? 'w-full rounded-t-full rounded-b-full' : 'h-full rounded-r-full rounded-l-full']"
      :style="selectedTrackStyle"
    />
    <button
      v-if="!Array.isArray(model)"
      type="button"
      :id="attrs['id']"
      aria-label="slider-thumb"
      :class="['group handle', vertical ? 'vertical' : 'horizontal']"
      :style="vertical ? { bottom: thumbPos + '%' } : { left: thumbPos + '%' }"
      :disabled="disabled"
      :tabindex="0"
      v-on="!disabled ? {
        focus: () => thumbNdx = 0,
        keydown: handleKeydown,
        pointerdown: dragStart(0),
        pointermove: drag,
        pointerup: dragStop,
        pointercancel: dragStop,
      } : {}"
      ref="handle"
    >
      <span
        v-if="showTooltip !== 'never'"
        :class="['tooltip', { 'tooltip-focused': showTooltip === 'focus' }, vertical ? 'tooltip-left' : 'tooltip-top']"
        ref="tooltip"
      >
        <slot name="tooltip" :value="model">{{ formatTooltip(model) }}</slot>
      </span>
    </button>
    <!-- eslint-disable-next-line vue/require-v-for-key -->
    <button
      v-else
      type="button"
      v-for="(v, ndx) in model"
      :id="!ndx ? attrs['id'] : null"
      :aria-label="'slider-thumb-' + (ndx + 1)"
      :class="['group handle', vertical ? 'vertical' : 'horizontal']"
      :style="vertical ? { bottom: thumbPos[ndx] + '%' } : { left: thumbPos[ndx] + '%' }"
      :tabindex="0"
      v-on="!disabled ? {
        focus: () => thumbNdx = ndx,
        keydown: handleKeydown,
        pointerdown: dragStart(ndx),
        pointermove: drag,
        pointerup: dragStop,
        pointercancel: dragStop,
      } : {}"
      ref="handle"
    >
      <span v-if="showTooltip !== 'never'" :class="['tooltip', { 'tooltip-focused': showTooltip === 'focus' }, vertical ? 'tooltip-left' : 'tooltip-top']" ref="tooltip"><slot name="tooltip" :value="v" :ndx="ndx">{{ formatTooltip(v) }}</slot></span>
    </button>
  </div>
</template>

<style scoped>
  @reference '../index.css';

  .handle {
    @apply touch-none absolute size-5 rounded-full border-2 bg-white transition-colors duration-200
  }
  .handle:not(:disabled) {
    @apply border-vxvue cursor-grab hover:bg-vxvue focus:outline-hidden focus:ring-4 focus:ring-vxvue/50
  }
  .handle:disabled {
    @apply border-slate-400
  }
  .handle.vertical {
    @apply left-0 -translate-x-1.5 translate-y-2.5
  }
  .handle.horizontal {
    @apply top-0 -translate-x-2.5 -translate-y-1.5
  }

  .tooltip {
    @apply
      absolute
      block
      whitespace-nowrap
      px-1.5
      py-0.5
      text-vxvue-50
      bg-vxvue
      rounded-sm
      text-center
      text-sm
      font-bold
      before:absolute
      before:size-0
      before:border-[5px]
      before:border-transparent before:content-['']
  }
  .tooltip-focused {
    @apply invisible group-focus:visible
  }
  .tooltip-left, .tooltip-right {
    @apply -translate-y-1/2 top-1/2 before:top-1/2 before:-translate-y-1/2
  }
  .tooltip-left {
    @apply right-7 before:-right-2.5 before:border-l-vxvue
  }
  .tooltip-right {
    @apply left-7 before:-left-2.5 before:border-r-vxvue
  }
  .tooltip-top, .tooltip-bottom {
    @apply -translate-x-1/2 left-1/2 before:left-1/2 before:-translate-x-1/2
  }
  .tooltip-top {
    @apply bottom-7 before:-bottom-2.5 before:border-t-vxvue
  }
  .tooltip-bottom {
    @apply top-7 before:-top-2.5 before:border-b-vxvue
  }
</style>