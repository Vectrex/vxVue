<script setup>
  const emit = defineEmits(['form-data'])
  const props = defineProps({
    accept: { type: String, default: "*" },
    multiple: { type: Boolean, default: false },
    name: { type: String, default: "file" },
    id: { type: String, default: 'form-file-button-' + Math.ceil(Math.random() * 1000) }
  })

  const model = defineModel({ type: Array, default: () => [] })

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

      const f = Array.from(files)
      model.value = f
      emit('form-data', getFormData(f))
    }
  }
</script>

<template>
  <label :for="id">
    <slot>Upload</slot>
    <input
      :id="id"
      type="file"
      :multiple="multiple"
      :accept="accept"
      class="hidden"
      @change="fileChanged"
    >
  </label>
</template>