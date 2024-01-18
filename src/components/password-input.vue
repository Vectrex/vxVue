<script setup>
  import { EyeIcon, EyeSlashIcon } from '@heroicons/vue/24/outline'
  import { useAttrs, ref, computed } from 'vue'

  defineOptions({ inheritAttrs: false })

  const props = defineProps(['modelValue'])
  const emit = defineEmits(['update:modelValue'])
  const show = ref(false)
  const inputAttrs = computed(() => {
    let dest = Object.assign({}, useAttrs())
    delete dest['class']
    return dest
  })
</script>
<template>
  <div :class="'inline-block relative ' + useAttrs()['class']">
    <input
        :value="modelValue"
        :type="show ? 'text': 'password'"
        @input="emit('update:modelValue', $event.target.value)"
        v-bind="inputAttrs"
        class="block pr-12 w-full form-input peer"
    >
    <button
      class="flex absolute inset-y-0 right-0 items-center px-3 text-brand-700 hover:text-brand"
      aria-label="show-password-toggle"
      @click.stop="show = !show"
    >
      <eye-slash-icon class="size-5" v-if="show" />
      <eye-icon class="size-5" v-else />
    </button>
    <slot />
  </div>
</template>