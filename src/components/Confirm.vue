<script setup>
  import VxVueTransition from './VxVueTransition.vue'
  import { ref, computed, nextTick } from "vue"

  const props = defineProps({
    buttons: {
      type: [Object, Array],
      default: () => ({ label: 'Ok' }),
      validator: p => (Array.isArray(p) && p.length <= 2 && p.filter(v => v['label'] !== 'undefined' && v['value'] !== 'undefined').length === p.length) || (p.label !== undefined && p.value !== undefined)
    },
    headerClass: {
      type: String,
      default: "text-vxvue-alt-900 bg-vxvue-alt-300"
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

  // if no value is assigned to buttons, the first button resolves
  const handleClick = (button, ndx) => {
    show.value = false
    if (button.value !== undefined) {
      button.value ? resolve() : reject()
    }
    else {
      ndx ? reject() : resolve()
    }
  }
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
  <div v-if="show" class="fixed inset-0 z-[calc(var(--zIndex-confirm)-1)] bg-black/50 backdrop-blur-xs" aria-hidden="true" />
  <vx-vue-transition name="appear">
    <div v-if="show" class="overflow-y-auto fixed inset-0 z-[var(--zIndex-confirm)]">
      <div class="flex justify-center items-center min-h-screen text-center sm:block sm:p-0">
        <div v-if="show">
          <span class="hidden sm:inline-block sm:h-screen sm:align-middle" aria-hidden="true">&#8203;</span>

          <div class="inline-block overflow-hidden text-left align-bottom bg-white rounded-sm shadow-xl transition-all transform sm:my-8 sm:w-full sm:max-w-sm sm:align-middle lg:max-w-lg">
            <h3 v-if="title || $slots.title" class="py-4 pt-4 text-lg font-medium text-center sm:py-6" :class="headerClass">
              <slot name="title" :title="title">
                {{ title }}
              </slot>
            </h3>
            <div class="px-4 pb-4 mt-4 sm:px-6 sm:pb-6 sm:mt-5">
              <div class="flex flex-row items-center">
                <div class="shrink-0">
                  <slot name="icon" />
                </div>
                <p class="grow text-center">
                  <slot :message="message">
                    {{ message }}
                  </slot>
                </p>
              </div>
              <div ref="buttonsContainer" class="flex justify-center mt-5 space-x-2 sm:mt-6">
                <button
                  v-for="(button, ndx) in buttonArray"
                  :key="button.label"
                  :class="[buttonClass, button['class']]"
                  @click.prevent="handleClick(button, ndx)"
                >
                  {{ button.label }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </vx-vue-transition>
</template>
