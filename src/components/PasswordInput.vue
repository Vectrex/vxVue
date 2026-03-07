<script setup>
  import { EyeIcon, EyeSlashIcon } from '@heroicons/vue/24/outline'
  import { useAttrs, ref, computed } from 'vue'

  defineOptions({ inheritAttrs: false })
  const model = defineModel( { type: String, default: '' })

  const show = ref(false)
  const attrs = useAttrs()
  const inputAttrs = computed(() => {
    const { class: _, disabled: __, ...rest } = attrs
    return rest
  })
</script>
<template>
  <div :class="'inline-block relative ' + attrs.class">
    <input
      v-model="model"
      :type="show ? 'text': 'password'"
      v-bind="inputAttrs"
      class="block pr-12 w-full form-input peer"
    >
    <button
      type="button"
      class="flex absolute inset-y-0 right-0 items-center px-3 transition-colors focus-visible:outline-none text-brand-700 peer-disabled:opacity-50 peer-disabled:cursor-not-allowed hover:text-brand focus-visible:bg-vxvue/50"
      :aria-label="(show ? 'Hide' : 'Show') + ' password'"
      :disabled="attrs.disabled !== undefined"
      @click.stop="show = !show"
    >
      <component :is="show ? EyeSlashIcon : EyeIcon" class="size-5" />
    </button>
  </div>
</template>