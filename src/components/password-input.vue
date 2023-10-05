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
        class="block pr-10 w-full form-input peer"
    >
    <button @click.stop="show = !show" class="flex absolute inset-y-0 right-0 items-center pr-3 text-brand-700 hover:text-brand">
      <eye-slash-icon class="w-5 h-5" v-if="show" />
      <eye-icon class="w-5 h-5" v-else />
    </button>
    <slot />
  </div>
</template>