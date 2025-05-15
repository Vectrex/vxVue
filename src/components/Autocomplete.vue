<script setup>
  import Spinner from "./Spinner.vue"
  import { onClickOutside } from "@vueuse/core"
  import { computed, onUpdated, ref, useAttrs } from "vue"

  const emit = defineEmits(['update:modelValue', 'blur-sm', 'submit'])
  const props = defineProps({
    modelValue: { type: String, default: "" },
    search: { type: Function, required: true },
    resultListClass: { type: String, default: 'result-list' },
    resultItemClass: { type: String, default: 'result-list-item' },
    getResultValue: { type: Function, default: result => result },
    autoSelect: Boolean
  })
  defineOptions({ inheritAttrs: false })
  const attrs = useAttrs()
  const uniqueId = (() => {
    let counter = 0
    return prefix  => (prefix || "") + ++counter
  })()

  const resultListId = uniqueId((attrs.id || 'autocomplete') + "-")
  const results = ref([])
  const selectedIndex = ref(-1)
  const searchCounter = ref(0)
  const expanded = ref(false)
  const loading = ref(false)
  const position = ref('top-0 translate-y-12')
  const resetPosition = ref(true)
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
  const inputProps = computed(() => ({
      role: 'combobox',
      autocomplete: 'off',
      autocapitalize: 'off',
      autocorrect: 'off',
      spellcheck: 'false',
      'aria-autocomplete': 'list',
      'aria-haspopup': 'listbox',
      'aria-owns': resultListId,
      'aria-expanded': expanded.value ? 'true' : 'false',
      'aria-activedescendant': selectedIndex.value > -1 ? itemProps.value[selectedIndex.value].id : '',
      ...attrs
  }))
  const listProps = computed(() => ({
      id: resultListId,
      class: ['absolute min-w-full transform z-[var(--zIndex-dropdown)]', props.resultListClass, position.value],
      role: 'listbox'
  }))

  const hideResults = () => {
    selectedIndex.value = -1
    results.value = []
    expanded.value = false
    resetPosition.value = true
  }
  const updateResults = v => {
    const search = props.search(v)
    if (search instanceof Promise) {
      const currentSearch = ++searchCounter.value
      loading.value = true

      search.then(res => {
        if (currentSearch === searchCounter.value) {
          results.value = res
          loading.value = false
          if (!results.value.length) {
            hideResults()
          } else {
            selectedIndex.value = props.autoSelect ? 0 : -1
            expanded.value = true
          }
        }
      })
    } else {
      results.value = search
      if (results.value.length === 0) {
        hideResults()
      } else {
        selectedIndex.value = props.autoSelect ? 0 : -1
        expanded.value = true
      }
    }
  }
  const selectResult = () => {
    const selectedResult = results.value[selectedIndex.value]
    if (selectedResult) {
      emit('update:modelValue', props.getResultValue(selectedResult))
    }
    hideResults()
    return selectedResult
  }
  const handleInput  = v => { emit('update:modelValue', v); updateResults(v) }
  const handleFocus = e => updateResults(e.target.value)
  const handleBlur = () => {
    hideResults()
    emit('blur-sm')
  }
  const handleUp = () => {
    const listLen = results.value.length
    selectedIndex.value = (((selectedIndex.value - 1) % listLen) + listLen) % listLen
  }
  const handleDown = e => {
    if(!expanded.value) {
      handleFocus(e)
    }
    const listLen = results.value.length
    selectedIndex.value = (((selectedIndex.value + 1) % listLen) + listLen) % listLen
  }
  const handleEsc = () => {
    hideResults()
    emit('update:modelValue', '')
  }
  const handleEnter = () => emit('submit', selectResult())
  const handleResultClick = e => {
    const result = e.target.closest('[data-result-index]')
    if (result) {
      selectedIndex.value = parseInt(result.dataset.resultIndex, 10)
      emit('submit', selectResult())
    }
  }
  onClickOutside(container, hideResults)
  onUpdated(() => {
    if (resultList.value) {
      const inputPos = input.value.getBoundingClientRect()
      const listPos = resultList.value.getBoundingClientRect()

      if (resetPosition.value && results.value.length) {

        resetPosition.value = false

        // show list above or below

        position.value = (inputPos.bottom + listPos.height > window.innerHeight) && (window.innerHeight - inputPos.bottom < inputPos.top) && (window.pageYOffset + inputPos.top - listPos.height > 0) ? "bottom-0  -translate-y-12" : "top-0 translate-y-12"
      }

      // Make sure selected result isn't scrolled out of view

      const selectedElem = resultList.value.querySelector('[data-result-index="' + selectedIndex.value + '"]')

      if (selectedElem) {
        let selectedPos = selectedElem.getBoundingClientRect()

        if (selectedPos.top < listPos.top) {
          // Element is above viewable area
          resultList.value.scrollTop -= listPos.top - selectedPos.top
        } else if (selectedPos.bottom > listPos.bottom) {
          // Element is below viewable area
          resultList.value.scrollTop += selectedPos.bottom - listPos.bottom
        }
      }
    }
  })
</script>

<template>
  <div ref="container" class="inline-block relative" :class="$attrs['class']">
    <input
      ref="input"
      class="block pr-10 w-full form-input focus:border-vxvue"
      :value="modelValue"
      v-bind="inputProps"
      @input="handleInput($event.target.value)"
      @keydown.enter="handleEnter"
      @keydown.esc="handleEsc"
      @keydown.tab="selectResult"
      @keydown.up.prevent="handleUp"
      @keydown.down.prevent="handleDown"
      @focus="handleFocus"
      @blur="handleBlur"
    >
    <span class="flex absolute inset-y-0 right-0 items-center pr-3 text-vxvue-700">
      <spinner v-if="loading" class="size-5" />
    </span>
    <div
      v-if="results.length"
      ref="resultList"
      v-bind="listProps"
      @click="handleResultClick"
      @mousedown.prevent
    >
      <template v-for="(result, ndx) in results">
        <!-- eslint-disable-next-line vue/require-v-for-key -->
        <div :data-result-index="ndx">
          <slot name="result" :result="result" :props="itemProps[ndx]">
            <div :key="itemProps[ndx].id" v-bind="itemProps[ndx]">
              {{ getResultValue(result) }}
            </div>
          </slot>
        </div>
      </template>
    </div>
  </div>
</template>