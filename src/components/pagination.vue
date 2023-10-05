<script setup>
  import { computed, watch, ref } from "vue"
  import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/vue/24/solid"

  const emit = defineEmits(['update:page'])
  const props = defineProps({
   page: { type: Number, default: 1 },
   total: { type: Number, default: 1 },
   perPage: {
     type: Number, default: 20, validator(v) {
       return v >= 1
     }
   },
   showNavButtons: { type: Boolean, default: true },
   prevText: { type: String, default: 'Previous' },
   nextText: { type: String, default: 'Next' },
   showAllPages: { type: Boolean, default: false },
   markerPosition: {
     type: String, default: 'above', validator(v) {
       return ['above', 'below'].indexOf(v) !== -1
     }
   }
  })
  const maxPage = ref(Math.ceil(props.total / props.perPage))
  const currentPage = ref(null)
  const markerPositionClass = computed(() => props.markerPosition === 'above' ? 'border-t-2 pt-4' : 'border-b-2 pb-4')
  const pagesToShow = computed(() => {
    let pages = [1]
    if (props.showAllPages || maxPage.value <= 7) {
      for (let i = 2; i <= maxPage.value; ++i) {
        pages.push(i)
      }
      return pages
    }
    if (currentPage.value >= maxPage.value) {
      pages.push('dots', currentPage.value - 2, currentPage.value - 1)
    }
    else if (currentPage.value - 1 && currentPage.value - 1 > 1) {
      if (currentPage.value > 1) {
        pages.push('dots')
      }
      pages.push(currentPage.value - 1)
    }
    if (currentPage.value > 1) {
      pages.push(currentPage.value)
    }
    if (currentPage.value + 1 < maxPage.value) {
      pages.push(currentPage.value + 1)
      if (currentPage.value <= 1) {
        pages.push(currentPage.value + 2)
      }
      if (currentPage.value + 2 < this.maxPage) {
        pages.push('dots')
      }
    }
    if (currentPage.value < this.maxPage) {
      pages.push(this.maxPage)
    }
    return pages
  })
  const prevPage = () => {
    if(currentPage.value > 1) {
      emit('update:page', currentPage.value - 1)
    }
  }
  const nextPage = () => {
    if(currentPage.value < maxPage.value) {
      emit('update:page', currentPage.value + 1)
    }
  }
  watch(() => props.page, v => currentPage.value = Math.min(Math.max(v, 1), maxPage.value), { immediate: true })
  watch(() => props.perPage, v => {
    maxPage.value = Math.ceil(props.total / props.perPage)
    emit('update:page', 1)
  })
  watch(() => props.total, v => {
    maxPage.value = Math.ceil(props.total / props.perPage)
    if(currentPage.value > maxPage.value) {
      emit('update:page', 1)
    }
  })
</script>

<template>
  <nav class="flex justify-between items-center px-4 sm:px-0">
    <div class="flex flex-1 -mt-px w-0">
      <a
          @click.prevent="prevPage"
          v-if="showNavButtons"
          href="#"
          class="inline-flex items-center pr-1 text-sm font-medium text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300"
          :class="[{'cursor-default pointer-events-none': currentPage <=1 }, markerPositionClass]"
      >
        <chevron-left-icon class="w-5 h-5" />
        {{ prevText }}
      </a>
    </div>
    <div class="hidden md:flex md:-mt-px">
      <component
          v-for="(page, idx) in pagesToShow"
          :is="page !== 'dots' ? 'a' : 'span'"
          @click.prevent="page !== 'dots' ? emit('update:page', page) : null"
          :key="idx"
          :href="page !== 'dots' ? '#' : null"
          class="inline-flex items-center px-4 text-sm font-medium"
          :class="[{
          'border-vxvue-500 text-vxvue-700': page === currentPage,
          'border-transparent text-gray-500': page !== currentPage,
          'hover:text-gray-700 hover:border-gray-300': page !== 'dots'
        }, markerPositionClass]"
      >
        {{ page !== 'dots' ? page : '...' }}
      </component>
    </div>
    <div class="flex flex-1 justify-end -mt-px w-0">
      <a
          @click.prevent="nextPage"
          v-if="showNavButtons"
          href="#"
          class="inline-flex items-center pl-1 text-sm font-medium text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300"
          :class="[markerPositionClass, {'cursor-default pointer-events-none': currentPage >= maxPage }]"
      >
        {{ nextText }}
        <chevron-right-icon class="w-5 h-5" />
      </a>
    </div>
  </nav>
</template>