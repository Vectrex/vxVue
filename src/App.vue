<script setup>
  import FormInput from './components/vx-vue/formelements/form-input.vue';
  import PasswordInput from './components/vx-vue/formelements/password-input.vue';
  import FormSelect from './components/vx-vue/formelements/form-select.vue';
  import FormSwitch from './components/vx-vue/formelements/form-switch.vue';
  import FormFileButton from './components/vx-vue/formelements/form-file-button.vue';
</script>

<script>
  export default {
    data () {
      return {
        formData: {}
      }
    }
  }
</script>

<template>
  <div class="p-4 items-center">
    <label for="form-input" class="inline-block w-36">form-input</label>
    <form-input placeholder="enter something..." class="w-72" id="form-input" v-model="formData.formInput" />
  </div>
  <div class="p-4 items-center">
    <label for="password-input" class="inline-block w-36">password-input</label>
    <password-input placeholder="6 characters or more" class="w-72" id="password-input" v-model="formData.passwordInput" />
  </div>
  <div class="p-4 items-center">
    <label for="form-select" class="inline-block w-36">form-select</label>
    <form-select class="w-72" id="form-select" v-model="formData.formSelect" :options="['Please', 'Select', 'Me']" />
  </div>
  <div class="p-4 flex items-center">
    <label for="form-switch" class="inline-block w-36">form-switch</label>
    <form-switch id="form-switch" v-model="formData.formSwitch"><span class="pl-2">A simple toggle</span></form-switch>
  </div>
  <div class="p-4 flex items-center">
    <label for="form-file-button" class="inline-block w-36">form-file-button</label>
    <form-file-button id="form-file-button" v-model="formData.formFileButton" multiple="multiple" role="button" class="py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700">Upload</form-file-button>
  </div>
</template>
