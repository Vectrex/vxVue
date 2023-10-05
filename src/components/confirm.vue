<script setup>
  import { ref, computed, nextTick } from "vue"

  const props = defineProps({
    buttons: {
      type: [Object, Array],
      default: { label: 'Ok' },
      validator: p => (Array.isArray(p) && p.length <= 2 && p.filter(v => v['label'] !== 'undefined' && v['value'] !== 'undefined').length === p.length) || (p.label !== undefined && p.value !== undefined)
    },
    headerClass: {
      type: String,
      default: "text-vxvue-alt-900 bg-vxvue-alt-400"
    },
    buttonClass: {
      type: String,
      default: "button"
    }
  })

  const title = ref('')
  const message = ref('')
  const show = ref(false)
  let resolve = null
  let reject = null
  const buttonArray = computed (() => Array.isArray(props.buttons) ? props.buttons : [props.buttons])
  const buttonsContainer = ref(null)

  const open = (t, m) => {
    title.value = t
    message.value = m
    show.value = true
    nextTick(() => buttonsContainer.value.firstElementChild.focus())
    return new Promise((res, rej) => {
      resolve = res
      reject = rej
    })
  }
  defineExpose({ open })
</script>

<template>
  <div class="fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-sm" aria-hidden="true" v-if="show" />
  <transition name="appear">
    <div class="overflow-y-auto fixed inset-0 z-50" v-if="show">
      <div class="flex justify-center items-end px-4 pt-4 pb-20 min-h-screen text-center sm:block sm:p-0">
        <div v-if="show">
          <span class="hidden sm:inline-block sm:h-screen sm:align-middle" aria-hidden="true">&#8203;</span>

          <div class="inline-block overflow-hidden text-left align-bottom bg-white rounded shadow-xl transition-all transform sm:my-8 sm:w-full sm:max-w-sm sm:align-middle lg:max-w-lg">
            <h3 class="py-4 pt-4 text-lg font-medium text-center sm:py-6" :class="headerClass" v-if="title">
              <slot name="title" :title="title">{{ title }}</slot>
            </h3>
            <div class="px-4 pb-4 mt-4 sm:px-6 sm:pb-6 sm:mt-5">
              <div class="flex flex-row items-center">
                <div class="flex-shrink-0">
                  <slot name="icon"></slot>
                </div>
                <p class="flex-grow text-center">
                  <slot :message="message">{{ message }}</slot>
                </p>
              </div>
              <div class="flex justify-center mt-5 space-x-2 sm:mt-6" ref="buttonsContainer">
                <button
                    v-for="(button, ndx) in buttonArray"
                    :class="[buttonClass, button['class']]"
                    @click.prevent="show = false; ndx === 0 ? resolve() : reject()"
                >{{ button.label }}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
