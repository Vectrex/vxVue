<template>
  <nav class="px-4 flex items-center justify-between sm:px-0">
    <div class="-mt-px w-0 flex-1 flex">
      <a
        @click.prevent="prevPage"
        v-if="showNavButtons"
        href="#"
        class="border-t-2 border-transparent pt-4 pr-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
        :class="{'cursor-default pointer-events-none': currentPage <=1 }"
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
        class="border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium"
        :class="{
          'border-vxvue-500 text-vxvue-700': page === currentPage,
          'border-transparent text-gray-500': page !== currentPage,
          'hover:text-gray-700 hover:border-gray-300': page !== 'dots'
        }"
      >
        {{ page !== 'dots' ? page : '...' }}
      </component>
    </div>
    <div class="-mt-px w-0 flex-1 flex justify-end">
      <a
        @click.prevent="nextPage"
        v-if="showNavButtons"
        href="#"
        class="border-t-2 border-transparent pt-4 pl-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
        :class="{'cursor-default pointer-events-none': currentPage >= maxPage }"
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
  emits: ['update:page', 'update:total'],
  props: {
    items: Array,
    total: { type: Number, default: 1 },
    page: { type: Number, default: 1 },
    perPage: { type: Number, default: 20 },
    showNavButtons: { type: Boolean, default: true },
    prevText: { type: String, default: 'Previous' },
    nextText: { type: String, default: 'Next' },
    showAllPages: { type: Boolean, default: false },
    onPageChange: Function
  },
  data () {
    return {
      currentPage: 1,
      maxPage: 0,
      showPerPage: 20,
    };
  },
  created () {
    this.currentPage = this.page;
    this.totalResults = this.total;
    this.showPerPage = this.perPage;

    if (typeof this.items !== 'undefined') {
      this.dataItems = this.items;
      this.totalResults = this.items.length;
    }

    this.countMaxPage();

    if (typeof this.onPageChange === 'function') {
      this.onPageChange.apply(null, [this.currentPage, this.dataResults, this.maxPage]);
    }
  },
  methods: {
    pageClick(page) {
      this.currentPage = page;
      this.$emit('update:page', page);

      if (typeof this.onPageChange === 'function') {
        this.onPageChange.apply(null, [page, this.dataResults, this.maxPage]);
      }
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
      this.maxPage = Math.ceil(this.totalResults / this.showPerPage);
    }
  },
  watch: {
    page(val) {
      if (val < 1) {
        val = 1;
      } else if (val > this.maxPage) {
        val = this.maxPage;
      }
      
      this.currentPage = val;

      if (typeof this.onPageChange === 'function') {
        this.onPageChange.apply(null, [this.currentPage, this.dataResults, this.maxPage]);
      }
    },
    total(val) {
      if (val < 0) {
        val = 0;
      }

      this.totalResults = val;

      this.countMaxPage();
      // if total number of items has changed, go to page 1
      this.pageClick(1);
    },
    perPage(val) {
      if (val < 1) {
        val = 20;
      }
      this.showPerPage = val;
      
      this.countMaxPage();
      this.pageClick(1);
    },
    items(val) {
      this.dataItems = val;

      this.totalResults = this.dataItems.length;
      this.$emit('update:total', this.totalResults);

      this.countMaxPage();
      this.pageClick(1);
    }
  },
  computed: {
    dataResults() {
      if (typeof this.dataItems !== 'undefined' && this.dataItems.length > 0) {
        let start = (this.currentPage - 1) * this.showPerPage;
        let end = this.currentPage * this.showPerPage;

        return this.dataItems.slice(start, end);
      }

      return null;
    },
    pagesToShow() {
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
  }
};
</script>
