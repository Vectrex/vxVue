<template>
    <label :for="id">
      <slot>Upload</slot>
      <input
          type="file"
          :id="id"
          :multiple="multiple"
          :accept="accept"
          @change="fileChanged"
          class="d-none"
      />
    </label>
</template>

<script>
export default {
  name: 'form-file-button',
  props: {
    modelValue: { type: Array },
    accept: { type: String, default: "*" },
    multiple: { type: Boolean, default: false },
    name: { type: String, default: "file" },
    id: { type: String, default: 'file_upload' }
  },

  emits: ['update:modelValue', 'form-data'],

  methods: {
    getFormData(files) {
      const data = new FormData();
      const name = this.name + (this.multiple ? "[]" : "");
      for (let file of files) {
        data.append(name, file, file.name);
      }
      return data;
    },
    fileChanged (event) {
      let files = event.target.files || event.dataTransfer.files;
      if (files) {

        // convert FileList to Array

        files = [...files];
        this.$emit('update:modelValue', files);
        this.$emit('form-data', this.getFormData(files));
      }
    }
  }
};
</script>
