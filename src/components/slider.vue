<script setup>
  import { computed, ref } from "vue"
  defineOptions({ inheritAttrs: false })

  const props = defineProps({
    min: { type: Number, default: 0 },
    max: { type: Number, default: 100 },
    modelValue: { type: [Number, Array], validator(v) {
      return v instanceof Number || v.length === 2 && v[0] instanceof Number && v[1] instanceof Number
    }}
  })
  const emit = defineEmits(['update:modelValue'])

  const initPos = ref({ x: null, y: null })
  const trackSize = ref( { w: null, h: null })
  const dragging = ref(false)
  const track = ref(null)
  const boundValue = computed(() => Math.max(Math.min(props.modelValue, props.max), props.min) * 100 / (props.max - props.min))
  const updateModel = v => {
    let newValue = parseFloat(v.toFixed(10))
    newValue = Math.min(props.max, (Math.max(props.min, newValue)))
    emit('update:modelValue', newValue)
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
    switch (e.keyCode) {
      case 37:
        updateModel(props.modelValue - 1); break
      case 39:
        updateModel(props.modelValue + 1); break
      case 33:
        updateModel(props.modelValue + (props.max - props.min) / 10); break
      case 34:
        updateModel(props.modelValue - (props.max - props.min) / 10); break
      case 36:
        updateModel(props.min); break
      case 35:
        updateModel(props.max)
    }
  }
</script>

<template>
  <div class="relative w-full h-2 rounded-r-full rounded-l-full bg-slate-300" ref="track">
    <div class="h-full rounded-r-full rounded-l-full bg-vxvue" :style="{ width: boundValue + '%' }" />
    <div
        class="absolute top-0 w-5 h-5 bg-white rounded-full border-2 transition-colors duration-200 -translate-x-2.5 -translate-y-1.5 focus:ring-4 focus:outline-none border-vxvue cursor-grab touch-none hover:bg-vxvue focus:ring-vxvue/50"
        tabindex="0"
        :style="{ left: boundValue + '%' }"
        :aria-valuemin="min"
        :aria-valuemax="max"
        :aria-valuenow="modelValue"
        @mousedown.prevent="dragStart"
        @keydown.prevent="handleKeydown"
        @touchstart.prevent="dragStart"
        @touchmove="drag"
        @touchend="dragStop"
        role="slider"
    />
  </div>
</template>
