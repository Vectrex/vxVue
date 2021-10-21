<script setup>
  import FormInput from './components/vx-vue/formelements/form-input.vue';
  import PasswordInput from './components/vx-vue/formelements/password-input.vue';
  import FormSelect from './components/vx-vue/formelements/form-select.vue';
  import FormSwitch from './components/vx-vue/formelements/form-switch.vue';
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
  <div class="p-4">
    <label for="form-input" class="inline-block w-36">form-input</label>
    <form-input placeholder="enter something..." class="w-72" id="form-input" v-model="formData.formInput" />
  </div>
  <div class="p-4">
    <label for="password-input" class="inline-block w-36">password-input</label>
    <password-input placeholder="6 characters or more" class="w-72" id="password-input" v-model="formData.passwordInput" />
  </div>
  <div class="p-4">
    <label for="form-select" class="inline-block w-36">form-select</label>
    <form-select class="w-72" id="form-select" v-model="formData.formSelect" :options="['Please', 'Select', 'Me']" />
  </div>
  <div class="p-4 flex align-middle">
    <label for="form-switch" class="inline-block w-36">form-switch</label>
    <form-switch id="form-switch" v-model="formData.formSwitch"><span class="pl-2">A simple toggle</span></form-switch>
  </div>
</template>
