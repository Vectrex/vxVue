<template>
    <div ref="container" class="modal modal-sm" :class="{ active: show }">
        <div class="modal-overlay"></div>
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
                <button type="button" class="btn" :class="options.buttonClass" @click.prevent="ok" ref="button">{{ options.label }}</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'alert',

        props: {
            config: {
                type: Object
            }
        },

        data () { return {
            title: "",
            message: "",
            show: false,
            resolve: null,
            reject: null,
            options: {
                label: "Ok",
                buttonClass: "btn-success"
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