<script setup>
import { onClickOutside } from "@vueuse/core"
import { computed, onUpdated, ref, useAttrs } from "vue"

const emit = defineEmits(['update:modelValue', 'blur', 'submit'])
const props = defineProps({
  modelValue: { type: String, default: "" },
  search: { type: Function, required: true },
  baseClass: { type: String, default: 'vxvue-autocomplete' },
  resultListClass: { type: String, default: 'result-list' },
  resultItemClass: { type: String, default: 'result-list-item' },
  inputClass: { type: String, default: 'autocomplete-input' },
  autoSelect: { type: Boolean, default: false },
  getResultValue: { type: Function, default: result => result }
})
const attrs = useAttrs()
const uniqueId = (() => {
  let counter = 0
  return (prefix)  => (prefix || "") + ++counter
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
  results.value.map((result, ndx) => ({
    id: (attrs.id || 'autocomplete') + '-item-' + ndx,
    class: ['autocomplete-item', props.resultItemClass, { 'bg-vxvue-700 text-white': selectedIndex.value === ndx }],
    'data-result-index': ndx,
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
    class: ['autocomplete-list absolute min-w-full transform z-10', props.resultListClass, position.value],
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
const handleBlur = () => { hideResults(); emit('blur') }
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
const handleEsc = () => { hideResults(); emit('update:modelValue', '') }
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
  <div class="relative inline-block" :class="$attrs['class']" ref="container">
    <input
        ref="input"
        class="form-input w-full block focus:border-vxvue pr-10"
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
    />
    <span class="absolute right-0 pr-3 flex items-center inset-y-0 text-vxvue-700">
      <svg class="animate-spin w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" v-if="loading">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    </span>
    <ul
        v-if="results.length"
        ref="resultList"
        v-bind="listProps"
        @click="handleResultClick"
        @mousedown.prevent
    >
      <template v-for="(result, index) in results">
        <slot name="result" :result="result" :props="itemProps[index]">
          <li :key="itemProps[index].id" v-bind="itemProps[index]">
            {{ getResultValue(result) }}
          </li>
        </slot>
      </template>
    </ul>
  </div>
</template>