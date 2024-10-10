<script setup>
  import { computed, watch, ref } from "vue"
  import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/vue/24/solid"

  const emit = defineEmits(['update:page'])
  const props = defineProps({
   page: { type: Number, default: 1 },
   total: { type: Number, default: 1 },
   perPage: { type: Number, default: 20, validator: v => v >= 1 },
   showNavButtons: { type: Boolean, default: true },
   prevText: { type: String, default: 'Previous' },
   nextText: { type: String, default: 'Next' },
   showAllPages: { type: Boolean, default: false },
   markerPosition: { type: String, default: 'above', validator: v => ['above', 'below'].includes(v) }
  })
  const maxPage = ref(Math.ceil(props.total / props.perPage))
  const currentPage = ref(null)
  const markerPositionClass = computed(() => (props.markerPosition === 'above' ? 'border-t-4 -mt-[4px]' : 'border-b-4 -mb-[4px]') + ' py-4')
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
      if (currentPage.value + 2 < maxPage.value) {
        pages.push('dots')
      }
    }
    if (currentPage.value < maxPage.value) {
      pages.push(maxPage.value)
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
      emit('update:page', maxPage.value)
    }
  })
</script>

<template>
  <nav class="flex justify-between items-center px-4 sm:px-0">
    <div class="flex flex-1 -mt-px w-0">
      <button
          @click="prevPage"
          v-if="showNavButtons"
          :disabled="currentPage <= 1"
          :class="[
              currentPage <= 1 ? 'pointer-events-none text-gray-500' : 'text-vxvue-700',
              'inline-flex items-center pr-1 text-sm border-transparent hover:text-vxvue'
          ]"
      >
        <chevron-left-icon class="size-5" />
        {{ prevText }}
      </button>
    </div>
    <div class="hidden md:flex md:-mt-px">
      <component
          v-for="(page, ndx) in pagesToShow"
          :is="page !== 'dots' ? 'button' : 'span'"
          @click="page !== 'dots' ? emit('update:page', page) : null"
          :key="ndx"
          :class="[
            { 'pointer-events-none': page === 'dots' },
            page === currentPage ? 'border-vxvue text-vxvue font-bold' : 'border-transparent text-gray-500 hover:border-gray-300',
            markerPositionClass,
            'inline-flex items-center px-4 text-sm'
          ]"
      >
        {{ page !== 'dots' ? page : '&hellip;' }}
      </component>
    </div>
    <div class="flex flex-1 justify-end -mt-px w-0">
      <button
          @click="nextPage"
          v-if="showNavButtons"
          :disabled="currentPage >= maxPage"
          :class="[
              currentPage >= maxPage ? 'pointer-events-none text-gray-500' : 'text-vxvue-700',
              'inline-flex items-center pr-1 text-sm border-transparent hover:text-vxvue'
          ]"
      >
        {{ nextText }}
        <chevron-right-icon class="size-5" />
      </button>
    </div>
  </nav>
</template>