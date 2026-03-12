<script setup>
  const emit = defineEmits(['form-data'])
  const props = defineProps({
    accept: { type: String, default: '' },
    multiple: { type: Boolean, default: false },
    name: { type: String, default: 'file' }
  })

  const model = defineModel({ type: Array, default: () => [] })

  const createFormData = files => {
    const data = new FormData()
    for (const file of files) {
      data.append(props.name, file, file.name)
    }
    return data
  }
  const handleChange = e  => {
    const files = e.target.files

    if (!files?.length) return

    // convert FileList to Array

    const selectedFiles = Array.from(files)
    model.value = selectedFiles
    emit('form-data', createFormData(selectedFiles))
    e.target.value = ''
  }
</script>

<template>
  <label>
    <slot>Upload</slot>
    <input
      type="file"
      :multiple="multiple"
      :accept="accept"
      class="hidden"
      @change="handleChange"
    >
  </label>
</template>