<template>
      <div v-bind="containerProps" ref="container">
        <autocomplete-input
          ref="input"
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
        <ul
          v-if="results.length"
          ref="resultList"
          v-bind="resultListProps"
          @click="handleResultClick"
          @mousedown.prevent
        >
          <template v-for="(result, index) in results">
            <slot name="result" :result="result" :props="resultProps[index]">
              <li :key="resultProps[index].id" v-bind="resultProps[index]">
                {{ getResultValue(result) }}
              </li>
            </slot>
          </template>
        </ul>
      </div>
</template>

<script>
  import FormInput from './formelements/form-input';

  let uniqueId = function() {
    let counter = 0;
    return function(prefix) {
      return (prefix || "") + ++counter;
    }
  }();

  export default {
    name: 'Autocomplete',
    inheritAttrs: false,

    components: {
      'autocomplete-input': FormInput,
    },
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
        default: 'form-autocomplete'
      },
      resultListClass: {
        type: String,
        default: 'menu'
      },
      resultClass: {
        type: String,
        default: 'menu-item'
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
        position: 'below',
        resetPosition: true
      }
    },

    computed: {
      containerProps() {
        return {
          class: this.baseClass,
          style: { position: 'relative' },
          'data-expanded': this.expanded,
          'data-loading': this.loading,
          'data-position': this.position
        }
      },
      inputProps() {
        return {
          class: this.inputClass,
          role: 'combobox',
          autocomplete: 'off',
          autocapitalize: 'off',
          autocorrect: 'off',
          spellcheck: 'false',
          'aria-autocomplete': 'list',
          'aria-haspopup': 'listbox',
          'aria-owns': this.resultListId,
          'aria-expanded': this.expanded ? 'true' : 'false',
          'aria-activedescendant': this.selectedIndex > -1 ? this.resultProps[this.selectedIndex].id : '',
          ...this.$attrs
        }
      },
      resultListProps() {
        return {
          id: this.resultListId,
          class: this.resultListClass,
          role: 'listbox'
        }
      },
      resultProps() {
        return this.results.map((result, index) => ({
          id: this.resultClass + "-" + index,
          class: this.resultClass,
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

      let inputPos = this.$refs.input.$el.getBoundingClientRect();
      let listPos = this.$refs.resultList.getBoundingClientRect();

      if (this.resetPosition && this.results.length) {

        this.resetPosition = false;

        // show list above or below

        this.position = (inputPos.bottom + listPos.height > window.innerHeight) && (window.innerHeight - inputPos.bottom < inputPos.top) && (window.pageYOffset + inputPos.top - listPos.height > 0) ? "above" : "below";

      }

      // Make sure selected result isn't scrolled out of view

      let selectedElem = this.$refs.resultList.querySelector('[data-result-index="' + this.selectedIndex + '"]');

      if (!selectedElem) {
        return;
      }

      let selectedPos = selectedElem.getBoundingClientRect();

      if (selectedPos.top < listPos.top) {
        // Element is above viewable area
        this.$refs.resultList.scrollTop -= listPos.top - selectedPos.top;
      }
      else if (selectedPos.bottom > listPos.bottom) {
        // Element is below viewable area
        this.$refs.resultList.scrollTop += selectedPos.bottom - listPos.bottom;
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