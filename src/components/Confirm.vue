<script setup>
  import { computed, nextTick, onBeforeUnmount, ref } from 'vue'

  const props = defineProps({
    buttons: {
      type: [Object, Array],
      default: () => ({ label: 'Ok', value: true }),
      validator: p => (Array.isArray(p) && p.length <= 2 && p.every(v => typeof v.label === 'string' && v.label.trim())) || (typeof p.label === 'string' && p.label.trim())
    },
    headerClass: {
      type: String,
      default: 'text-vxvue-alt-900 bg-vxvue-alt-300'
    },
    buttonClass: {
      type: String,
      default: 'button'
    },
    autofocus: {
      type: Boolean,
      default: true
    }
  })

  const title = ref('')
  const message = ref('')
  const show = ref(false)
  const isClosing = ref(false)
  const dialogElement = ref(null)
  const buttonsContainer = ref(null)
  const focusedElement = ref(null)

  const buttonArray = computed(() =>
      (Array.isArray(props.buttons) ? props.buttons : [props.buttons]).map((button, ndx) => ({
        label: button.label ?? `Button ${ndx + 1}`,
        value: button.value,
        class: button.class ?? ''
      }))
  )

  let resolvePromise = null
  let rejectPromise = null
  let closeTimeout = null

  const restoreFocus = () => focusedElement.value?.focus?.()
  const resetPromiseHandlers = () => resolvePromise = rejectPromise = null
  const clearCloseTimeout = () => {
    window.clearTimeout(closeTimeout)
    closeTimeout = null
  }
  const finishClose = () => {
    clearCloseTimeout()
    dialogElement.value?.close()
  }
  const requestClose = () => {
    if (!dialogElement.value?.open || isClosing.value) return
    isClosing.value = true
    closeTimeout = window.setTimeout(finishClose, 100)
  }
  const cancel = () => {
    rejectPromise?.()
    requestClose()
  }
  const handleClick = (button, ndx) => {
    if (button.value !== undefined) {
      button.value ? resolvePromise?.() : rejectPromise?.()
    }
    else {
      ndx === 0 ? resolvePromise?.() : rejectPromise?.()
    }
    requestClose()
  }
  const handleClose = () => {
    clearCloseTimeout()
    isClosing.value = false
    show.value = false
    resetPromiseHandlers()
    nextTick(restoreFocus)
  }
  const open = async (t, m) => {
    if (show.value || dialogElement.value?.open) return Promise.reject(new Error('Confirm already open'))

    clearCloseTimeout()
    focusedElement.value = document.activeElement
    title.value = t
    message.value = m
    show.value = true
    isClosing.value = false

    await nextTick()
    dialogElement.value?.showModal()
    if (props.autofocus) nextTick(() => buttonsContainer.value?.firstElementChild?.focus?.())

    return new Promise((resolve, reject) => {
      resolvePromise = resolve
      rejectPromise = reject
    })
  }

  onBeforeUnmount(() => {
    clearCloseTimeout()
    resetPromiseHandlers()
  })

  defineExpose({ open })
</script>

<template>
  <dialog
      ref="dialogElement"
      class="m-auto border-none bg-transparent overflow-visible reduce-motion:backdrop:animate-none"
      :class="{
      'dialog--open': show && !isClosing,
      'dialog--closing': isClosing
    }"
      :aria-labelledby="title || $slots.title ? 'confirm-title' : undefined"
      aria-describedby="confirm-message"
      @cancel.prevent="cancel"
      @close="handleClose"
  >
    <div class="confirm-panel transform-gpu bg-white rounded-sm shadow-xl sm:w-full sm:max-w-sm lg:max-w-lg reduce-motion:animate-none">
      <h3
          v-if="title || $slots.title"
          id="confirm-title"
          class="py-4 pt-4 text-lg font-medium text-center rounded-t-sm sm:py-6"
          :class="headerClass"
      >
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
              :key="button.value ?? button.label ?? ndx"
              type="button"
              :class="[buttonClass, button.class]"
              @click.prevent="handleClick(button, ndx)"
          >
            {{ button.label }}
          </button>
        </div>
      </div>
    </div>
  </dialog>
</template>

<style scoped>
@reference '../index.css';

.dialog--open .confirm-panel {
  animation: confirm-panel-in 200ms ease-out forwards;
}

.dialog--closing .confirm-panel {
  animation: confirm-panel-out 180ms ease-in forwards;
}

.dialog--open::backdrop {
  animation: confirm-backdrop-in 200ms ease-out forwards;
}

.dialog--closing::backdrop {
  animation: confirm-backdrop-out 180ms ease-in forwards;
}

@keyframes confirm-panel-in {
  from {
    opacity: 0;
    transform: scale(0.9) translateY(1rem);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

@keyframes confirm-panel-out {
  from {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
  to {
    opacity: 0;
    transform: scale(0.9) translateY(0.5rem);
  }
}

@keyframes confirm-backdrop-in {
  from {
    background-color: rgb(0 0 0 / 0%);
    backdrop-filter: blur(0);
  }
  to {
    background-color: rgb(0 0 0 / 25%);
    backdrop-filter: blur(4px);
  }
}

@keyframes confirm-backdrop-out {
  from {
    background-color: rgb(0 0 0 / 25%);
    backdrop-filter: blur(4px);
  }
  to {
    background-color: rgb(0 0 0 / 0%);
    backdrop-filter: blur(0);
  }
}
</style>