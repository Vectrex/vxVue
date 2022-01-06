<template>

  <div class="fixed inset-0 bg-gray-500 bg-opacity-75 z-50 backdrop-blur-sm" aria-hidden="true" v-if="isOpen && transitionName === 'fade'"></div>

  <transition :name="transitionName">
    <div v-if="isOpen" :class="containerPosition">
        <div :class="[$attrs['class'], 'space-y-4']">
          <div>
            <slot name="message">{{ message }}</slot>
          </div>
          <div class="space-y-2">
            <label class="flex items-center" v-for="option in options">
              <input
                type="checkbox"
                :class="['h-4 w-4 form-checkbox', option.disabled ? 'text-gray-500' : 'text-vxvue focus:ring-vxvue']"
                :value="option.key"
                v-model="checked"
                :disabled="option.disabled"
              >
              <span class="ml-4">
                <slot name="option" :option="option">{{ option.label }}</slot>
              </span>
            </label>
          </div>
          <div>
            <button @click="accept" :class="buttonClass">{{ buttonText }}</button>
          </div>
      </div>
    </div>
  </transition>

</template>

<script>
import * as Cookie from '../util/cookie';

export default {
  name: 'cookie-consent',
  emits: ['accept'],
  props: {
    options: {
      type: Array,
      required: true
    },
    buttonText: {
      type: String,
      default: 'Accept settings'
    },
    buttonClass: {
      type: String,
      default: 'inline-flex justify-center w-full rounded border border-transparent shadow-sm px-4 py-2 bg-vxvue-700 text-base font-medium text-white hover:bg-vxvue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-vxvue-500 sm:text-sm'
    },
    message: {
      type: String,
      default: 'This website uses cookies to ensure you get the best experience on our website.'
    },
    position: {
      type: String,
      default: 'bottom',
      validator: value => ['top', 'left', 'right', 'bottom'].indexOf(value) !== -1
    },
    transition: {
      type: String,
      default: 'fade',
      validator: value => ['fade', 'slide'].indexOf(value) !== -1
    },
    storageName: {
      type: String,
      default: 'cookies:consented'
    },
    cookieOptions: {
      type: Object,
      default: () => ({}),
      required: false
    }
  },

  data() {
    return {
      isOpen: false,
      checked: []
    }
  },

  computed: {
    containerPosition () {

      // centering when transition is set to fade

      if (this.transitionName === 'fade') {
        return 'center';
      }
      return this.position;
    },

    transitionName () {
      return this.transition === 'fade' ? 'fade' : ('slide-from-' + this.position);
    },

    flags () {
      let flags = 0;
      this.checked.forEach(val => flags = flags | val);
      return flags;
    }
  },
  watch: {
    options (newValue) {
      let checked = [];
      this.options.forEach(item => { if(item.selected) { checked.push(item.key) }});
      this.checked = checked;
    }
  },
  created() {
    this.options.forEach(item => { if(item.selected) { this.checked.push(item.key) }});
  },
  mounted() {
    const flags = Cookie.get(this.storageName);
    if (flags !== null) {
      this.$emit('accept', parseInt(flags, 10));
    }
    else {
      this.isOpen = true;
    }
  },
  methods: {
    accept() {
      Cookie.set(this.storageName, this.flags, { expires: '1Y', ...this.cookieOptions })
      this.isOpen = false;
      this.$emit('accept', this.flags);
    }
  }
}
</script>

<style>
.fade-enter-to, .fade-leave-from {
  @apply opacity-100
}
.fade-enter-from, .fade-leave-to {
  @apply opacity-0
}
.fade-enter-active,
.fade-leave-active {
  @apply transition-opacity;
}
.center {
  @apply fixed inset-0 z-[100] flex justify-center items-center;
}
.center > div {
  @apply bg-white p-8;
}
</style>