<template>
  <div ref="container" class="modal modal-sm" :class="{ active: show }" @keydown.esc.stop="cancel">
    <a href="#close" class="modal-overlay" @click.prevent="cancel"></a>
    <div class="modal-container">
      <div class="modal-header bg-error text-light" v-if="title">
        <div class="modal-title h5">{{ title }}</div>
      </div>
      <div class="modal-body">
        <div class="content">
          {{ message }}
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn mr-2" :class="options.okClass" @click.prevent="ok" ref="okButton">
          {{ options.okLabel }}
        </button>
        <button type="button" class="btn btn-link" @click.prevent="cancel">{{ options.cancelLabel }}</button>
      </div>
    </div>
  </div>
</template>

<script>
/* heavily inspired by https://gist.github.com/eolant/ba0f8a5c9135d1a146e1db575276177d */

export default {
  name: 'confirm',

  props: {
    config: {
      type: Object
    }
  },

  data() {
    return {
      title: "",
      message: "",
      show: false,
      resolve: null,
      reject: null,
      options: {
        okLabel: "Ok",
        cancelLabel: "Cancel",
        okClass: "btn-success"
      }
    }
  },

  watch: {
    config() {
      this.options = Object.assign({}, this.options, this.config);
    }
  },

  created() {
    this.options = Object.assign({}, this.options, this.config);
  },

  methods: {
    open(title, message, options) {
      this.title = title;
      this.message = message;
      this.show = true;
      this.$nextTick(() => this.$refs.okButton.focus());
      this.options = Object.assign(this.options, options || {});
      return new Promise((resolve, reject) => {
        this.resolve = resolve;
        this.reject = reject;
      });
    },
    ok() {
      this.show = false;
      this.resolve(true);
    },
    cancel() {
      this.show = false;
      this.resolve(false);
    }
  }
}
</script>