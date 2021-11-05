<template>
  <transition name="overlay-fade">
    <div class="fixed inset-0 bg-gray-500 bg-opacity-75" aria-hidden="true" v-if="show"></div>
  </transition>
  <transition name="modal-appear">
    <div class="fixed z-10 inset-0 overflow-y-auto" v-if="show">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div v-if="show">
            <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div class="inline-block align-bottom bg-white rounded text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full">
              <h3 :class="headerClass" v-if="title">
                <slot name="title" :title="title">{{ title }}</slot>
              </h3>
              <div class="mt-4 sm:mt-5 px-4 sm:px-6 pb-4 sm:pb-6">
                <div class="flex flex-row items-center">
                  <div class="flex-shrink-0">
                    <slot name="icon"></slot>
                  </div>
                  <p class="text-center flex-grow">
                    <slot :message="message">{{ message }}</slot>
                  </p>
                </div>
                <div class="mt-5 sm:mt-6">
                  <button ref="button" type="button" :class="buttonClass" @click.prevent="ok" >{{ options.label }}</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  </transition>
</template>

<script>
    export default {
        name: 'alert',

        props: {
            config: {
                type: Object
            },
            headerClass: {
              type: String,
              default: "text-lg text-center font-medium text-white pt-4 sm:py-6 py-4 bg-vxvue-700"
            },
            buttonClass: {
              type: String,
              default: "inline-flex justify-center w-full rounded border border-transparent shadow-sm px-4 py-2 bg-vxvue-700 text-base font-medium text-white hover:bg-vxvue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-vxvue-500 sm:text-sm"
            }
        },

        data () { return {
            title: "",
            message: "",
            show: false,
            resolve: null,
            reject: null,
            options: {
                label: "Ok"
            }
        }},

        watch: {
            config() {
                this.options = Object.assign({}, this.options, this.config);
            }
        },

        created() {
            this.options = Object.assign({}, this.options, this.config);
        },

        methods: {
            open (title, message, options) {
                this.title = title;
                this.message = message;
                this.show = true;
                this.$nextTick(() => this.$refs.button.focus());
                this.options = Object.assign(this.options, options || {});
                return new Promise((resolve, reject) => {
                    this.resolve = resolve;
                    this.reject = reject;
                });
            },
            ok () {
                this.show = false;
                this.resolve(true);
            }
        }
    }
</script>

<style>
.overlay-fade-enter-to,
.overlay-fade-leave-from
{
  @apply opacity-100;
}
.overlay-fade-enter-from,
.overlay-fade-leave-to {
  @apply opacity-0;
}
.overlay-fade-enter-active,
.overlay-fade-leave-active {
  @apply transition-opacity;
}

.modal-appear-enter-from {
  @apply opacity-0 transform-gpu -translate-y-8;
}
.modal-appear-enter-to,
.modal-appear-leave-from
{
  @apply translate-y-0 opacity-100;
}
.modal-appear-leave-to {
  @apply translate-y-8 opacity-0;
}
.modal-appear-enter-active,
.modal-appear-leave-active
{
  @apply transition-all;
}
</style>