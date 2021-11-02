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
      @keydown.tab="handleTab"
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

<script>
  let uniqueId = (() => {
    let counter = 0;
    return (prefix)  => (prefix || "") + ++counter;
  })();

  export default {
    name: 'autocomplete',
    inheritAttrs: false,

    emits: ['update:modelValue', 'blur', 'submit'],
    props: {
      modelValue: {
        type: String,
        default: ""
      },
      search: {
        type: Function,
        required: true
      },
      baseClass: {
        type: String,
        default: 'vxvue-autocomplete'
      },
      resultListClass: {
        type: String,
        default: 'result-list'
      },
      resultItemClass: {
        type: String,
        default: 'result-list-item'
      },
      inputClass: {
        type: String,
        default: 'autocomplete-input'
      },
      autoSelect: {
        type: Boolean,
        default: false
      },
      getResultValue: {
        type: Function,
        default: result => result
      }
    },

    data() {
      return {
        resultListId: uniqueId(this.resultListClass + "-"),
        results: [],
        selectedIndex: -1,
        searchCounter: 0,
        expanded: false,
        loading: false,
        position: 'top-0',
        resetPosition: true
      }
    },

    computed: {
      inputProps() {
        return {
          role: 'combobox',
          autocomplete: 'off',
          autocapitalize: 'off',
          autocorrect: 'off',
          spellcheck: 'false',
          'aria-autocomplete': 'list',
          'aria-haspopup': 'listbox',
          'aria-owns': this.resultListId,
          'aria-expanded': this.expanded ? 'true' : 'false',
          'aria-activedescendant': this.selectedIndex > -1 ? this.itemProps[this.selectedIndex].id : '',
          ...this.$attrs
        }
      },
      listProps() {
        return {
          id: this.resultListId,
          class: ['autocomplete-list', this.resultListClass, this.position],
          role: 'listbox'
        }
      },
      itemProps() {
        return this.results.map((result, index) => ({
          id: this.$attrs.id || 'item-' + index,
          class: ['autocomplete-item', this.resultItemClass],
          'data-result-index': index,
          role: 'option',
          ...(this.selectedIndex === index ? { 'aria-selected': 'true' } : {})
        }))
      },
    },

    mounted() {
      document.body.addEventListener('click', this.handleDocumentClick);
    },

    beforeUnmount() {
      document.body.removeEventListener('click', this.handleDocumentClick);
    },

    updated() {
      if (!this.$refs.resultList) {
        return;
      }

      let inputPos = this.$refs.input.getBoundingClientRect();
      let listPos = this.$refs.resultList.getBoundingClientRect();

      if (this.resetPosition && this.results.length) {

        this.resetPosition = false;

        // show list above or below

        this.position = (inputPos.bottom + listPos.height > window.innerHeight) && (window.innerHeight - inputPos.bottom < inputPos.top) && (window.pageYOffset + inputPos.top - listPos.height > 0) ? "bottom-0" : "top-0";
      }

      // Make sure selected result isn't scrolled out of view

      let selectedElem = this.$refs.resultList.querySelector('[data-result-index="' + this.selectedIndex + '"]');

      if (selectedElem) {
        let selectedPos = selectedElem.getBoundingClientRect();

        if (selectedPos.top < listPos.top) {
          // Element is above viewable area
          this.$refs.resultList.scrollTop -= listPos.top - selectedPos.top;
        } else if (selectedPos.bottom > listPos.bottom) {
          // Element is below viewable area
          this.$refs.resultList.scrollTop += selectedPos.bottom - listPos.bottom;
        }
      }
    },

    methods: {
      handleInput (value) {
        this.$emit('update:modelValue', value);
        this.updateResults(value);
      },

      handleFocus (event) {
        this.updateResults(event.target.value);
      },

      handleBlur () {
        this.hideResults();
        this.$emit ('blur');
      },

      handleUp () {
        const listLen = this.results.length;
        this.selectedIndex = (((this.selectedIndex - 1) % listLen) + listLen) % listLen;
      },

      handleDown (event) {
        if(!this.expanded) {
          this.handleFocus(event);
        }
        const listLen = this.results.length;
        this.selectedIndex = (((this.selectedIndex + 1) % listLen) + listLen) % listLen;
      },

      handleEsc () {
        this.hideResults();
        this.$emit('update:modelValue', '');
      },

      handleEnter () {
        this.$emit('submit', this.selectResult());
      },

      handleTab () {
        this.selectResult();
      },

      hideResults () {
        this.selectedIndex = -1;
        this.results = [];
        this.expanded = false;
        this.resetPosition = true;
      },

      selectResult () {
        const selectedResult = this.results[this.selectedIndex];
        if (selectedResult) {
          this.$emit('update:modelValue', this.getResultValue(selectedResult));
        }
        this.hideResults();
        return selectedResult;
      },

      handleResultClick (event) {
        const result = event.target.closest('[data-result-index]');
        if (result) {
          this.selectedIndex = parseInt(result.dataset.resultIndex, 10);
          this.$emit('submit', this.selectResult());
        }
      },

      handleDocumentClick (event) {
        if (this.$refs.container.contains(event.target)) {
          return;
        }
        this.hideResults();
      },

      updateResults (value) {

        const search = this.search(value);

        if (search instanceof Promise) {

          const currentSearch = ++this.searchCounter;
          this.loading = true;

          search.then(results => {
            if (currentSearch !== this.searchCounter) {
              return;
            }
            this.results = results;
            this.loading = false;

            if (!this.results.length) {
              this.hideResults();
            } else {
              this.selectedIndex = this.autoSelect ? 0 : -1;
              this.expanded = true;
            }
          });

        } else {

          this.results = search;

          if (this.results.length === 0) {
            this.hideResults();
          } else {
            this.selectedIndex = this.autoSelect ? 0 : -1;
            this.expanded = true;
          }
        }
      }
    }
  }
</script>