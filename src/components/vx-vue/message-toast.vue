<template>
  <div id="messageBox" :class="[{ 'display': active }, classname, 'toast']">
    <button class="btn btn-clear float-right" @click="$emit('cancel')"></button>
    <div v-for="line in lines">{{ line }}</div>
  </div>
</template>

<script>
export default {
  name: 'message-toast',
  emits: ['timeout', 'cancel'],
  props: {
    message: [String, Array],
    classname: String,
    timeout: {type: Number, default: 5000},
    active: {type: Boolean, default: false}
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