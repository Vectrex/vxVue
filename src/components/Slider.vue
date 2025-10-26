<script setup>
import { computed, onMounted, onUpdated, ref, useAttrs } from 'vue'
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
    validator(v) {
      return typeof v === 'number' || v.every(item => typeof item === 'number')
    }})
  const emit = defineEmits(['dragStart', 'dragStop'])
  const attrs = useAttrs()
  const initPos = { x: null, y: null }
  const trackSize = { w: null, h: null }
  let dragging = false
  const track = ref(null)
  const thumbNdx = ref(0)
  const thumbAttrs = ref({
    class:
        (props.vertical ? 'left-0 -translate-x-1.5 translate-y-2.5' : 'top-0 -translate-x-2.5 -translate-y-1.5') +
        ' group touch-none absolute size-5 rounded-full border-2 bg-white transition-colors duration-200 ' +
        (!props.disabled ? ' focus:ring-4 focus:outline-hidden border-vxvue cursor-grab hover:bg-vxvue focus:ring-vxvue/50' : '')
    ,
    tabindex: 0
  })
  const tooltip = ref(null)
  const handle = ref(null)
  const thumbPos = computed(() => {
    const max = props.max, min = props.min
      return model.value instanceof Array ?
          model.value.map(v => (Math.max(Math.min(v, max), min) - min) * 100 / (max - min)) :
          (Math.max(Math.min(model.value, max), min) - min) * 100 / (max - min)
  })
  const selectedTrackStyle = computed(() => {
    if (model.value instanceof Array) {
      const offset = Math.min(...thumbPos.value) + '%'
      const length = Math.max(...thumbPos.value) - Math.min(...thumbPos.value) + '%'
      return props.vertical ? { bottom:  offset, height:  length } : { left: offset, width: length }
    }
    return props.vertical ? { bottom: 0, height: thumbPos.value + '%' } : { width: thumbPos.value + '%' }
  })
  const setTooltipPos = v => {
    if (props.showTooltip !== 'never' && tooltip.value) {
      let min = (handle.value.length ? handle.value[0] : handle.value).getBoundingClientRect()[props.vertical ? 'left' : 'top']
      let size = 0
      if (tooltip.value.length) {
        tooltip.value.forEach(el => size = Math.max(el.getBoundingClientRect()[props.vertical ? 'width' : 'height'], size))
      }
      else {
        size = tooltip.value.getBoundingClientRect()[props.vertical ? 'height' : 'width']
      }
      let style = 'tooltip ' + (props.showTooltip === 'focus' ? 'tooltip-focused ' : '')
      if (props.vertical) {

        // 10px is the approximate size of the tooltip 'arrow'

        style += min < size + 10 ? 'tooltip-right' : 'tooltip-left'
      } else {
        style += min < size + 10 ? 'tooltip-bottom' : 'tooltip-top'
      }
      if (model.value.length) {
        tooltip.value.forEach(el => el.className = style)
      } else {
        tooltip.value.className = style
      }
    }
  }
  const updateModel = v => {
    let newValue = parseFloat(v.toFixed(10))
    newValue = Math.min(props.max, (Math.max(props.min, newValue)))
    if(model.value instanceof Array) {
      model.value[thumbNdx.value] = newValue
    }
    else {
      model.value = newValue
    }
  }
  const setValue = e => {
    const { pageX, pageY } = e.touches ? e.touches[0] : e
    const thumbValue = props.vertical ? (-pageY + initPos.y) / trackSize.h : (pageX - initPos.x) / trackSize.w
    updateModel(Math.floor((props.max - props.min) * thumbValue + props.min))
  }
  const initBounds = () => {
    const { clientLeft, clientTop, scrollLeft, scrollTop } = document.documentElement
    const box = track.value.getBoundingClientRect()
    initPos.x =  box.left + scrollLeft - clientLeft
    initPos.y = box.bottom + scrollTop - clientTop
    trackSize.w = track.value.offsetWidth
    trackSize.h = track.value.offsetHeight
  }
  const drag = e => {
    if(dragging) {
      e.preventDefault()
      setValue(e)
    }
  }
  const dragStart = e => {
    e.preventDefault()
    e.currentTarget.focus()
    initBounds()
    dragging = true
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

      // ensure that no mousemove and therefore modelValue update is triggered after a dragStop event

      setTimeout(() => emit('dragStop'), 0)
    }
  }
  const handleKeydown = e => {
    if(e.keyCode >= 33 && e.keyCode <= 40) {
      e.preventDefault()
    }
    const v = model.value[thumbNdx.value] ?? model.value

    switch (e.keyCode) {
      case 37:
      case 40:
        updateModel(v - 1); break
      case 39:
      case 38:
        updateModel(v + 1); break
      case 33:
        updateModel(v + (props.max - props.min) / 10); break
      case 34:
        updateModel(v - (props.max - props.min) / 10); break
      case 36:
        updateModel(props.min); break
      case 35:
        updateModel(props.max)
    }
  }
  const handleBarClick = e => {
    initBounds()
    setValue(e)
  }

  onUpdated(setTooltipPos)
  onMounted(setTooltipPos)
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
    v-on="!disabled ? {
      click: handleBarClick
    } : {}"
  >
    <div
      v-if="!disabled"
      :class="['absolute bg-vxvue', vertical ? 'w-full rounded-t-full rounded-b-full' : 'h-full rounded-r-full rounded-l-full']"
      :style="selectedTrackStyle"
    />
    <button
      v-if="!model.length"
      :id="attrs['id']"
      :style="vertical ? { bottom: thumbPos + '%' } : { left: thumbPos + '%' }"
      aria-label="slider-thumb"
      v-bind="thumbAttrs"
      v-on="!disabled ? {
        focus: () => thumbNdx = 0,
        keydown: handleKeydown,
        touchstart: e => { thumbNdx = 0; dragStart(e) },
        mousedown: e => { thumbNdx = 0; dragStart(e) },
        touchend: dragStop,
        mouseup: dragStop
      } : {}"
      ref="handle"
    >
      <span v-if="showTooltip !== 'never'" :class="['tooltip', { 'tooltip-focused': showTooltip === 'focus' }, vertical ? 'tooltip-left' : 'tooltip-top']" ref="tooltip"><slot name="tooltip" :value="model">{{ formatTooltip(model) }}</slot></span>
    </button>
    <!-- eslint-disable-next-line vue/require-v-for-key -->
    <button
      v-else
      v-for="(v, ndx) in model"
      :id="!ndx ? attrs['id'] : null"
      :style="vertical ? { bottom: thumbPos[ndx] + '%' } : { left: thumbPos[ndx] + '%' }"
      :aria-label="'slider-thumb-' + (ndx + 1)"
      v-bind="thumbAttrs"
      v-on="!disabled ? {
        focus: () => thumbNdx = ndx,
        keydown: handleKeydown,
        touchstart: e => { thumbNdx = ndx; dragStart(e) },
        mousedown: e => { thumbNdx = ndx; dragStart(e) },
        touchend: dragStop,
        mouseup: dragStop
      } : {}"
      ref="handle"
    >
      <span v-if="showTooltip !== 'never'" :class="['tooltip', { 'tooltip-focused': showTooltip === 'focus' }, vertical ? 'tooltip-left' : 'tooltip-top']" ref="tooltip"><slot name="tooltip" :value="v" :ndx="ndx">{{ formatTooltip(v) }}</slot></span>
    </button>
  </div>
</template>

<style scoped>
  @import '../index.css' reference;
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
    @apply right-7 before:right-[-10px] before:border-l-vxvue
  }
  .tooltip-right {
    @apply left-7 before:left-[-10px] before:border-r-vxvue
  }
  .tooltip-top, .tooltip-bottom {
    @apply -translate-x-1/2 left-1/2 before:left-1/2 before:-translate-x-1/2
  }
  .tooltip-top {
    @apply bottom-7 before:bottom-[-10px] before:border-t-vxvue
  }
  .tooltip-bottom {
    @apply top-7 before:top-[-10px] before:border-b-vxvue
  }
</style>