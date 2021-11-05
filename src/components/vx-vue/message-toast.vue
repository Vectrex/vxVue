<template>

  <div aria-live="assertive" class="fixed inset-0 flex items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start">
    <div class="w-full flex flex-col items-center space-y-4">

      <transition name="messagetoast-fade">
        <div v-if="active" class="max-w-sm w-full bg-white shadow-lg rounded-md pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden" :class="$attrs['class']">
          <div class="p-4">
            <div class="flex items-start">
              <div class="flex-shrink-0">
                <slot name="icon"></slot>
              </div>
              <div class="ml-3 w-0 flex-1 pt-0.5">
                <p class="font-bold">
                  <slot name="title">{{ title }}</slot>
                </p>
                <p class="mt-1" v-for="line in lines">
                  <slot>{{ line }}</slot>
                </p>
              </div>
              <div class="ml-4 flex-shrink-0 flex">
                <button @click="$emit('close')" class="bg-black bg-opacity-20 rounded-sm inline-flex text-white hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200">
                  <span class="sr-only">Close</span>
                  <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </transition>

    </div>
  </div>

</template>

<script>
export default {
  inheritAttrs: false,
  name: 'message-toast',
  emits: ['timeout', 'close'],
  props: {
    title: String,
    message: [String, Array],
    timeout: { type: Number, default: 5000 },
    active: { type: Boolean, default: false }
  },
  data() {
    return {
      activeTimeout: null
    }
  },
  computed: {
    lines() {
      return typeof this.message === 'string' ? [this.message] : this.message;
    }
  },
  watch: {
    active() {
      this.setTimeout();
    }
  },

  mounted() {
    this.setTimeout();
  },

  methods: {
    setTimeout() {
      window.clearTimeout(this.activeTimeout);

      // timeout 0 disables fadeout

      if (this.active && this.timeout) {
        this.activeTimeout = window.setTimeout(() => {
          this.$emit('timeout');
        }, this.timeout);
      }
    }
  }
}
</script>

<style>
.messagetoast-fade-enter-from,
.messagetoast-fade-leave-to {
  @apply opacity-0 transform-gpu -translate-y-10;
}
.messagetoast-fade-enter-to,
.messagetoast-fade-leave-from
{
  @apply opacity-100 translate-y-0;
}
.messagetoast-fade-enter-active,
.messagetoast-fade-leave-active {
  @apply transition-all duration-300;
}
</style>