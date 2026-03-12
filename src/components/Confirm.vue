<script setup>
  import VxVueTransition from './VxVueTransition.vue'
  import { ref, computed, nextTick } from 'vue'

  const props = defineProps({
    buttons: {
      type: [Object, Array],
      default: () => ({ label: 'Ok', value: true }),
      validator: p => (Array.isArray(p) && p.length <= 2 && p.every(v => typeof v.label === 'string' && v.label.trim())) || (typeof p.label === 'string' && p.label.trim())
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
  const buttonArray = computed (() => (Array.isArray(props.buttons) ? props.buttons : [props.buttons]).map((b, ndx) => ({ label: b.label ?? 'Button ' + (ndx + 1), value: b.value, class: b.class ?? '' })))
  const buttonsContainer = ref(null)
  const focusedElement = ref(null)

  const cancel = () => {
    show.value = false
    reject()
    nextTick(() => focusedElement.value?.focus?.())
  }

  const handleClick = (button, ndx) => {
    show.value = false

    // either a truthy value or the first button resolves

    if (button.value !== undefined) {
      button.value ? resolve() : reject()
    }
    else {
      ndx ? reject() : resolve()
    }
    nextTick(() => focusedElement?.focus?.())
  }

  const open = (t, m) => {
    if (show.value) return Promise.reject(new Error('Confirm already open'))
    focusedElement.value = document.activeElement
    title.value = t
    message.value = m
    show.value = true
    nextTick(() => buttonsContainer.value?.firstElementChild?.focus?.())
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
    <div v-if="show" class="overflow-y-auto fixed inset-0 z-(--zIndex-confirm)">
      <div class="flex justify-center items-center min-h-screen text-center sm:block sm:p-0">
        <div
          role="alertdialog"
          :aria-labelledby="title || $slots.title ? 'confirm-title' : undefined"
          aria-modal="true"
          aria-describedby="confirm-message"
          @keydown.esc="cancel"
        >
          <span class="hidden sm:inline-block sm:h-screen sm:align-middle" aria-hidden="true">&#8203;</span>

          <div class="inline-block text-left align-bottom bg-white rounded-sm shadow-xl transition-all transform sm:my-8 sm:w-full sm:max-w-sm sm:align-middle lg:max-w-lg">
            <h3 id="confirm-title" v-if="title || $slots.title" class="py-4 pt-4 text-lg font-medium text-center rounded-t-sm sm:py-6" :class="headerClass">
              <slot name="title" :title="title">
                {{ title }}
              </slot>
            </h3>
            <div class="px-4 pb-4 mt-4 sm:px-6 sm:pb-6 sm:mt-5">
              <div class="flex flex-row items-center">
                <div class="shrink-0">
                  <slot name="icon" />
                </div>
                <p id="confirm-message" class="text-center grow">
                  <slot :message="message">
                    {{ message }}
                  </slot>
                </p>
              </div>
              <div ref="buttonsContainer" class="flex justify-center mt-5 space-x-2 sm:mt-6">
                <button
                  v-for="(button, ndx) in buttonArray"
                  type="button"
                  :key="button.value ?? button.label ?? ndx"
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
