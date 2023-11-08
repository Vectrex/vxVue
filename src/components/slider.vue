<script setup>
  import { computed, ref, useAttrs } from "vue"
  defineOptions({ inheritAttrs: false })

  const props = defineProps({
    min: { type: Number, default: 0 },
    max: { type: Number, default: 100 },
    modelValue: { type: [Number, Array], validator(v) {
      return typeof v === 'number' || v.every(item => typeof item === 'number')
    }}
  })
  const emit = defineEmits(['update:modelValue'])
  const attrs = useAttrs()

  const initPos = ref({ x: null, y: null })
  const trackSize = ref( { w: null, h: null })
  const dragging = ref(false)
  const track = ref(null)
  const thumbNdx = ref(0)
  const thumbPos = computed(() => {
    const max = props.max, min = props.min
    if (props.modelValue instanceof Array) {
      return props.modelValue.map(v => Math.max(Math.min(v, max), min) * 100 / (max - min))
    }
    return Math.max(Math.min(props.modelValue, max), min) * 100 / (max - min)
  })
  const selectedTrackStyle = computed(() => {
    if (props.modelValue instanceof Array) {
      return { left: Math.min(...thumbPos.value) + '%', width: Math.max(...thumbPos.value) - Math.min(...thumbPos.value) + '%' }
    }
    return { width: thumbPos.value + '%' }
  })
  const thumbAttrs = ref({
    class: "absolute top-0 w-5 h-5 bg-white rounded-full border-2 transition-colors duration-200 -translate-x-2.5 -translate-y-1.5 focus:ring-4 focus:outline-none border-vxvue cursor-grab touch-none hover:bg-vxvue focus:ring-vxvue/50",
    tabindex: 0,
    role: 'slider',
    'aria-valuemin': props.min,
    'aria-valuemax': props.max,
  })
  const updateModel = v => {
    let newValue = parseFloat(v.toFixed(10))
    newValue = Math.min(props.max, (Math.max(props.min, newValue)))
    if(props.modelValue instanceof Array) {
      let vals = [...props.modelValue]
      vals[thumbNdx.value] = newValue
      emit('update:modelValue', vals)
    }
    else {
      emit('update:modelValue', newValue)
    }
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
    /* @todo omit when triggered by touch event */
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
  const handleKeydown = e => {
    if(e.keyCode >= 33 && e.keyCode <= 40) {
      e.preventDefault()
    }
    const v = props.modelValue[thumbNdx.value] ?? props.modelValue

    switch (e.keyCode) {
      case 37:
        updateModel(v - 1); break
      case 39:
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
</script>

<template>
  <div class="relative w-full h-2 rounded-r-full rounded-l-full bg-slate-300" ref="track">
    <div class="absolute h-full rounded-r-full rounded-l-full bg-vxvue" :style="selectedTrackStyle" />
    <button
        v-if="!modelValue.length"
        :id="attrs['id']"
        :style="{ left: thumbPos + '%' }"
        :aria-valuenow="modelValue"
        @focus="thumbNdx = 0"
        @keydown="handleKeydown"
        @mousedown.prevent="thumbNdx = 0; dragStart($event)"
        @touchstart.prevent="thumbNdx = 0; dragStart($event)"
        @touchmove="drag"
        @touchend="dragStop"
        v-bind="thumbAttrs"
    />
    <template v-else>
      <button
          v-for="(_, ndx) in modelValue"
          :id="!ndx ? attrs['id'] : null"
          :style="{ left: thumbPos[ndx] + '%' }"
          :aria-valuenow="modelValue[ndx]"
          @focus="thumbNdx = ndx"
          @keydown="handleKeydown"
          @mousedown.prevent="thumbNdx = ndx; dragStart($event)"
          @touchstart.prevent="thumbNdx = ndx; dragStart($event)"
          @touchmove="drag"
          @touchend="dragStop"
          v-bind="thumbAttrs"
      />
    </template>
  </div>
</template>
