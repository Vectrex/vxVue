<template>
  <nav class="px-4 flex items-center justify-between sm:px-0">
    <div class="-mt-px w-0 flex-1 flex">
      <a
        @click.prevent="prevPage"
        v-if="showNavButtons"
        href="#"
        class="border-transparent pr-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
        :class="[{'cursor-default pointer-events-none': currentPage <=1 }, markerPositionClass]"
      >
        <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
        </svg>
        {{ prevText }}
      </a>
    </div>
    <div class="hidden md:-mt-px md:flex">
      <component
        v-for="(page, idx) in pagesToShow"
        :is="page !== 'dots' ? 'a' : 'span'"
        @click.prevent="page !== 'dots' ? pageClick(page) : null"
        :key="idx"
        :href="page !== 'dots' ? '#' : null"
        class="px-4 inline-flex items-center text-sm font-medium"
        :class="[{
          'border-vxvue-500 text-vxvue-700': page === currentPage,
          'border-transparent text-gray-500': page !== currentPage,
          'hover:text-gray-700 hover:border-gray-300': page !== 'dots'
        }, markerPositionClass]"
      >
        {{ page !== 'dots' ? page : '...' }}
      </component>
    </div>
    <div class="-mt-px w-0 flex-1 flex justify-end">
      <a
        @click.prevent="nextPage"
        v-if="showNavButtons"
        href="#"
        class="border-transparent pl-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
        :class="[markerPositionClass, {'cursor-default pointer-events-none': currentPage >= maxPage }]"
      >
        {{ nextText }}
        <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
        </svg>
      </a>
    </div>
  </nav>
</template>
<script>

export default {
  name: 'pagination',
  emits: ['update:page'],
  props: {
    page: { type: Number, default: 1 },
    total: { type: Number, default: 1 },
    perPage: { type: Number, default: 20, validator(v) { return v >= 1 } },
    showNavButtons: { type: Boolean, default: true },
    prevText: { type: String, default: 'Previous' },
    nextText: { type: String, default: 'Next' },
    showAllPages: { type: Boolean, default: false },
    markerPosition: { type: String, default: 'above', validator(v) { return ['above', 'below'].indexOf(v) !== -1 }}
  },
  data () {
    return {
      currentPage: 1,
      maxPage: 0
    };
  },
  created () {
    this.countMaxPage();
    this.currentPage = Math.min(Math.max(this.page, 1), this.maxPage);
  },

  watch: {

    page (val) {
      this.currentPage = Math.min(Math.max(val, 1), this.maxPage);
    },

    perPage () {
      this.countMaxPage();
      this.pageClick(1);
    },

    total () {
      this.countMaxPage();

      // if current page is out of range set current page to first page

      if(this.currentPage > this.maxPage) {
        this.pageClick(1);
      }
    }
  },
  computed: {
    markerPositionClass () {
      return this.markerPosition === 'above' ? 'border-t-2 pt-4' : 'border-b-2 pb-4';
    },
    pagesToShow () {
      let pages = [1];

      if (this.showAllPages === true || this.maxPage <= 7) {
        let i = 2;
        for (; i <= this.maxPage; ++i) {
          pages.push(i);
        }
        return pages;
      }

      if (this.currentPage >= this.maxPage) {
        pages.push('dots');
        pages.push(this.currentPage - 2);
        pages.push(this.currentPage - 1);
      } else if (this.currentPage - 1 && this.currentPage - 1 > 1) {
        if (this.currentPage - 1 > 2) {
          pages.push('dots');
        }

        pages.push(this.currentPage - 1);
      }

      if (this.currentPage > 1) {
        pages.push(this.currentPage);
      }

      if (this.currentPage + 1 < this.maxPage) {
        pages.push(this.currentPage + 1);

        if (this.currentPage <= 1) {
          pages.push(this.currentPage + 2);
        }

        if (this.currentPage + 2 < this.maxPage) {
          pages.push('dots');
        }
      }

      if (this.currentPage < this.maxPage) {
        pages.push(this.maxPage);
      }

      return pages;
    }
  },

  methods: {
    pageClick(page) {
      this.currentPage = page;
      this.$emit('update:page', page);
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.pageClick(this.currentPage - 1);
      }
    },
    nextPage() {
      if (this.currentPage < this.maxPage) {
        this.pageClick(this.currentPage + 1);
      }
    },
    countMaxPage() {
      this.maxPage = Math.ceil(this.total / this.perPage);
    }
  }
};
</script>
