<script setup>
  import FormInput from './components/vx-vue/formelements/form-input.vue';
  import PasswordInput from './components/vx-vue/formelements/password-input.vue';
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
    <form-input placeholder="enter something..." class="w-60" id="form-input" v-model="formData.formInput" />
  </div>
  <div class="p-4">
    <label for="password-input" class="inline-block w-36">password-input</label>
    <password-input class="w-60" id="password-input" v-model="formData.pwdInput" />
  </div>
</template>
