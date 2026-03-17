<script setup>
  import Spinner from './Spinner.vue'
  import VxVueTransition from './VxVueTransition.vue'
  import { onClickOutside, useEventListener } from '@vueuse/core'
  import { computed, ref, useAttrs, watch } from 'vue'

  defineOptions({ inheritAttrs: false })
  const emit = defineEmits(['blur-sm', 'submit'])
  const props = defineProps({
    search: { type: Function, required: true },
    resultListClass: { type: String, default: 'result-list' },
    resultItemClass: { type: String, default: 'result-list-item' },
    getResultValue: { type: Function, default: result => result },
    autoSelect: Boolean
  })
  const model = defineModel({ type: String, default: '' })
  const attrs = useAttrs()
  const resultListId = crypto.randomUUID()
  const results = ref([])
  const selectedIndex = ref(-1)
  const searchCounter = ref(0)
  const expanded = ref(false)
  const loading = ref(false)
  const position = ref('top-0 translate-y-12')
  const resultList = ref(null)
  const input = ref(null)
  const container = ref(null)
  const itemProps = computed(() =>
    results.value.map((_, ndx) => ({
      id: (attrs.id || 'autocomplete') + '-item-' + ndx,
      class: [props.resultItemClass, { 'bg-vxvue-700 text-white': selectedIndex.value === ndx }],
      role: 'option',
      ...(selectedIndex.value === ndx ? { 'aria-selected': 'true' } : {})
    }))
  )
  const inputProps = computed(() => {
      const { class: _, style: __, ...inputAttrs } = attrs
      return {
        role: 'combobox',
            autocomplete: 'off',
          autocapitalize: 'off',
          autocorrect: 'off',
          spellcheck: 'false',
          'aria-autocomplete': 'list',
          'aria-haspopup': 'listbox',
          'aria-controls': resultListId,
          'aria-expanded': expanded.value ? 'true' : 'false',
          'aria-activedescendant': selectedIndex.value > -1 ? itemProps.value[selectedIndex.value].id : '',
          ...inputAttrs
      }
  })
  const listProps = computed(() => ({
      id: resultListId,
      class: ['absolute min-w-full transform z-[var(--zIndex-dropdown)]', props.resultListClass, position.value],
      role: 'listbox'
  }))

  const hideResults = () => {
    selectedIndex.value = -1
    results.value = []
    expanded.value = false
  }
  const updateResults = async v => {

    const currentSearch = ++searchCounter.value
    loading.value = true

    try {
      const r = await Promise.resolve(props.search(v))
      if (currentSearch !== searchCounter.value) return

      results.value = Array.isArray(r) ? r : []
      if (results.value.length === 0) {
        hideResults()
      } else {
        selectedIndex.value = props.autoSelect ? 0 : -1
        expanded.value = true
      }
    } catch {
      if (currentSearch !== searchCounter.value) return
      hideResults()
    }
    finally {
      if (currentSearch === searchCounter.value) {
        loading.value = false
      }
    }
  }
  const selectResult = () => {
    const selectedResult = results.value[selectedIndex.value]
    if (selectedResult) {
      model.value = props.getResultValue(selectedResult)
    }
    hideResults()
    return selectedResult
  }
  const handleInput  = v => {
    model.value = v
    updateResults(v)
  }
  const handleFocus = e => updateResults(e.target.value)
  const handleBlur = () => {
    hideResults()
    emit('blur-sm')
  }
  const handleUp = () => {
    const listLen = results.value.length
    selectedIndex.value = listLen ? (((selectedIndex.value - 1) % listLen) + listLen) % listLen : null
  }
  const handleDown = e => {
    if(!expanded.value) handleFocus(e)

    const listLen = results.value.length
    selectedIndex.value = listLen ? (((selectedIndex.value + 1) % listLen) + listLen) % listLen : null
  }
  const handleEnter = () => emit('submit', selectResult())
  const handleResultClick = e => {
    const result = e.target.closest('[data-result-index]')
    if (result) {
      selectedIndex.value = parseInt(result.dataset.resultIndex, 10)
      emit('submit', selectResult())
    }
  }
  const setListPosition = () => {
    if (!resultList.value || !input.value || !results.value.length) return

    // show list above or below

    const inputPos = input.value.getBoundingClientRect()
    const listPos = resultList.value.getBoundingClientRect()
    position.value =
        (inputPos.bottom + listPos.height > window.innerHeight) &&
        (window.innerHeight - inputPos.bottom < inputPos.top) &&
        (window.pageYOffset + inputPos.top - listPos.height > 0) ?
            "bottom-0  -translate-y-12" :
            "top-0 translate-y-12"
  }
  const ensureSelectedItemVisible = () => {
    if (!resultList.value || selectedIndex.value < 0) return

    const selectedElem = resultList.value.querySelector('[data-result-index="' + selectedIndex.value + '"]')
    if (!selectedElem) return

    const selectedPos = selectedElem.getBoundingClientRect()
    const listPos = resultList.value.getBoundingClientRect()

    if (selectedPos.top < listPos.top) {
      // Element is above viewable area
      resultList.value.scrollTop -= listPos.top - selectedPos.top
    } else if (selectedPos.bottom > listPos.bottom) {
      // Element is below viewable area
      resultList.value.scrollTop += selectedPos.bottom - listPos.bottom
    }
  }

  watch([() => results.value.length, expanded], ([newLen, newExpanded]) => {
    if (!newLen || !newExpanded) return
    setListPosition()
    ensureSelectedItemVisible()
  }, { flush: 'post' })

  watch(selectedIndex, ndx => {
    if (ndx < 0 || !expanded.value) return
    ensureSelectedItemVisible()
  }, { flush: 'post' })

  useEventListener(window,'resize', () => {
    if(!expanded.value || !results.value.length) return
    setListPosition()
    ensureSelectedItemVisible()
  })

  onClickOutside(container, hideResults)
</script>

<template>
  <div ref="container" class="inline-block relative" :class="$attrs.class" :style="$attrs.style">
    <input
      ref="input"
      class="block pr-10 w-full form-input focus:border-vxvue"
      :value="model"
      v-bind="inputProps"
      @input="handleInput($event.target.value)"
      @keydown.enter.prevent="handleEnter"
      @keydown.esc="hideResults"
      @keydown.tab="selectResult"
      @keydown.up.prevent="handleUp"
      @keydown.down.prevent="handleDown"
      @focus="handleFocus"
      @blur="handleBlur"
    >
    <span class="flex absolute inset-y-0 right-0 items-center pr-3 text-vxvue-700">
      <spinner v-if="loading" class="size-5" />
    </span>
    <vx-vue-transition name="fade">
      <div
        v-if="results.length"
        ref="resultList"
        v-bind="listProps"
        @click="handleResultClick"
        @mousedown.prevent
      >
        <div v-for="(result, ndx) in results" :data-result-index="ndx" :key="result.id">
          <slot name="result" :result="result" :props="itemProps[ndx]">
            <div v-bind="itemProps[ndx]">
              {{ getResultValue(result) }}
            </div>
          </slot>
        </div>
      </div>
    </vx-vue-transition>
  </div>
</template>