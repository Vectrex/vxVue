<script setup>
  import { EyeIcon, EyeSlashIcon } from '@heroicons/vue/24/outline'
  import { useAttrs, ref, computed } from 'vue'

  defineOptions({ inheritAttrs: false })

  const props = defineProps({ modelValue: { type: String, default: '' }})
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
      v-bind="inputAttrs"
      class="block pr-12 w-full form-input peer"
      @input="emit('update:modelValue', $event.target.value)"
    >
    <button
      class="flex absolute inset-y-0 right-0 items-center px-3 text-brand-700 hover:text-brand"
      aria-label="show-password-toggle"
      :disabled="useAttrs()['disabled'] ?? false"
      @click.stop="show = !show"
    >
      <eye-slash-icon v-if="show" class="size-5" />
      <eye-icon v-else class="size-5" />
    </button>
  </div>
</template>