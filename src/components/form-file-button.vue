<script setup>
  const emit = defineEmits(['update:modelValue', 'form-data'])
  const props = defineProps({
    modelValue: { type: Array },
    accept: { type: String, default: "*" },
    multiple: { type: Boolean, default: false },
    name: { type: String, default: "file" },
    id: { type: String, default: 'form-file-button-' + Math.ceil(Math.random() * 1000) }
  })

  const getFormData = files => {
    const data = new FormData()
    for (let file of files) {
      data.append(props.name, file, file.name)
    }
    return data
  }
  const fileChanged = e  => {
    const files = e.target.files || e.dataTransfer.files
    if (files) {

      // convert FileList to Array
      const f = [...files]
      emit('update:modelValue', f)
      emit('form-data', getFormData(f))
    }
  }
</script>

<template>
    <label :for="id">
      <slot>Upload</slot>
      <input
          type="file"
          :id="id"
          :multiple="multiple"
          :accept="accept"
          @change="fileChanged"
          class="hidden"
      />
    </label>
</template>