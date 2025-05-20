<script setup>
  import { computed, ref, useAttrs } from "vue"
  defineOptions({ inheritAttrs: false })

  const props = defineProps({
    min: { type: Number, default: 0 },
    max: { type: Number, default: 100 },
    vertical: Boolean,
    disabled: Boolean
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
  const thumbPos = computed(() => {
    const max = props.max, min = props.min
    if (model.value instanceof Array) {
      return model.value.map(v => (Math.max(Math.min(v, max), min) - min) * 100 / (max - min))
    }
    return (Math.max(Math.min(model.value, max), min) - min) * 100 / (max - min)
  })
  const selectedTrackStyle = computed(() => {
    if (model.value instanceof Array) {
      const offset = Math.min(...thumbPos.value) + '%'
      const length = Math.max(...thumbPos.value) - Math.min(...thumbPos.value) + '%'
      return props.vertical ? { bottom:  offset, height:  length } : { left: offset, width: length }
    }
    return props.vertical ? { bottom: 0, height: thumbPos.value + '%' } : { width: thumbPos.value + '%' }
  })
  const thumbAttrs = ref({
    class:
        (props.vertical ? 'left-0 -translate-x-1.5 translate-y-2.5' : 'top-0 -translate-x-2.5 -translate-y-1.5') +
        ' touch-none absolute size-5 rounded-full border-2 bg-white transition-colors duration-200 ' +
        (!props.disabled ? ' focus:ring-4 focus:outline-hidden border-vxvue cursor-grab hover:bg-vxvue focus:ring-vxvue/50' : '')
    ,
    tabindex: 0
  })
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
</script>

<template>
  <div
    ref="track"
    :class="['relative  bg-slate-300', vertical ? 'h-full w-2 rounded-t-full rounded-b-full' : 'w-full h-2 rounded-r-full rounded-l-full']"
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
    />
    <template v-else>
      <!-- eslint-disable-next-line vue/require-v-for-key -->
      <button
        v-for="(_, ndx) in model"
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
      />
    </template>
  </div>
</template>