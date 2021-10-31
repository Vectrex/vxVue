<script setup>
  import FormInput from './components/vx-vue/formelements/form-input.vue';
  import PasswordInput from './components/vx-vue/formelements/password-input.vue';
  import FormSelect from './components/vx-vue/formelements/form-select.vue';
  import FormSwitch from './components/vx-vue/formelements/form-switch.vue';
  import FormFileButton from './components/vx-vue/formelements/form-file-button.vue';
  import FormRadioGroup from './components/vx-vue/formelements/form-radio-group.vue';
  import FormCheckboxGroup from './components/vx-vue/formelements/form-checkbox-group.vue';
  import DateInput from './components/vx-vue/formelements/date-input.vue';
  import DatePicker from './components/vx-vue/formelements/datepicker.vue';
  import Sortable from './components/vx-vue/sortable.vue';
</script>

<script>
  export default {
    data () {
      return {
        formData: {},
        sortable: {
          rows: [
            { key: 1, name: 'Linda', role: 'Sarah', yob: 1956 },
            { key: 2, name: 'Robert', role: 'T1000', yob: 1958 },
            { key: 3, name: 'Arnold', role: 'T800', yob: 1947 },
            { key: 4, name: 'Edward', role: 'John', yob: 1977 }
          ],
          cols: [
            { label: 'Name', prop: 'name', sortable: true },
            { label: 'Role', prop: 'role', sortable: true  },
            { label: 'Born in', prop: 'yob', sortable: true  }
          ]
        }
      }
    }
  }
</script>

<template>
  <div class="grid grid-cols-2 gap-4">
    <div class="p-4 border-gray-500 border">

      <h2 class="text-xl font-bold mb-4">Form Elements</h2>

      <div class="my-4 items-center">
        <label for="form-input" class="inline-block w-40">form-input</label>
        <form-input placeholder="enter something..." class="w-72" id="form-input" v-model="formData.formInput" />
        <span class="rounded-r-full rounded-l-full bg-yellow-300 text-yellow-900 py-1 px-2 ml-2" v-if="formData.formInput">{{ formData.formInput }}</span>
      </div>

      <div class="my-4 items-center">
        <label for="password-input" class="inline-block w-40">password-input</label>
        <password-input placeholder="6 characters or more" class="w-72" id="password-input" v-model="formData.passwordInput" />
        <span class="rounded-r-full rounded-l-full bg-yellow-300 text-yellow-900 py-1 px-2 ml-2" v-if="formData.passwordInput">{{ formData.passwordInput }}</span>
      </div>

      <div class="my-4 items-center">
        <label for="form-select" class="inline-block w-40">form-select</label>
        <form-select class="w-72" id="form-select" v-model="formData.formSelect" :options="['Please', 'Select', 'Me']" />
        <span class="rounded-r-full rounded-l-full bg-yellow-300 text-yellow-900 py-1 px-2 ml-2" v-if="formData.formSelect">{{ formData.formSelect }}</span>
      </div>

      <div class="my-4 items-center">
        <label for="date-input" class="inline-block w-40">date-input</label>
        <date-input placeholder="yyyy-mm-dd" class="w-72" id="date-input" v-model="formData.dateInput" :show-button="false"/>
        <span class="rounded-r-full rounded-l-full bg-yellow-300 text-yellow-900 py-1 px-2 ml-2" v-if="formData.dateInput">{{ formData.dateInput }}</span>
      </div>

      <div class="my-4 items-center">
        <label for="date-picker" class="inline-block w-40">date-picker</label>
        <date-picker
            placeholder="mm/dd/yyyy"
            class="w-72 inline-block"
            id="date-picker"
            v-model="formData.datePicker"
            input-format="m/d/y"
            output-format="d mmm y"
        />
        <span class="rounded-r-full rounded-l-full bg-yellow-300 text-yellow-900 py-1 px-2 ml-2" v-if="formData.datePicker">{{ formData.datePicker }}</span>
      </div>

      <div class="my-4 items-center">
        <label for="date-picker-2" class="inline-block w-40">date-picker (de)</label>
        <date-picker
            placeholder="dd.mm.yyyy"
            class="w-72 inline-block"
            id="date-picker-2"
            v-model="formData.datePicker2"
            :day-names="'So Mo Di Mi Do Fr Sa'.split(' ')"
            :start-of-week-index="1"
            :month-names="'Jänner,Februar,März,April,Mai,Juni,Juli,August,September,Oktober,November,Dezember'.split(',')"
            input-format="d.m.y"
            output-format="d mmm y"

        />
        <span class="rounded-r-full rounded-l-full bg-yellow-300 text-yellow-900 py-1 px-2 ml-2" v-if="formData.datePicker2">{{ formData.datePicker2 }}</span>
      </div>

      <div class="my-4 flex items-center">
        <label for="form-file-button" class="inline-block w-40">form-file-button</label>
        <form-file-button id="form-file-button" v-model="formData.formFileButton" multiple="multiple" role="button" class="py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-vxvue hover:bg-vxvue-600">Upload</form-file-button>
        <span class="rounded-r-full rounded-l-full bg-yellow-300 text-yellow-900 py-1 px-2 ml-2" v-if="formData.formFileButton" v-for="file in formData.formFileButton">{{ file.name }}</span>
      </div>

      <div class="my-4 flex items-center">
        <label for="form-switch" class="inline-block w-40">form-switch</label>
        <form-switch id="form-switch" v-model="formData.formSwitch"><span class="pl-2">A simple toggle</span></form-switch>
        <span class="rounded-r-full rounded-l-full bg-yellow-300 text-yellow-900 py-1 px-2 ml-2" v-if="formData.formSwitch"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
    </svg></span>
      </div>

      <div class="my-4 flex items-center">
        <span class="inline-block w-40">form-radio-group</span>
        <form-radio-group v-model="formData.formRadioGroup" :options="['foo', 'bar', 'baz']" class="inline-block mr-4" name="radios">
          <template v-slot="slotData">
            <p class="pl-1 text-sm">{{ slotData.option.label || slotData.option }}</p>
          </template>
        </form-radio-group>
        <span class="rounded-r-full rounded-l-full bg-yellow-300 text-yellow-900 py-1 px-2 ml-2" v-if="formData.formRadioGroup">{{ formData.formRadioGroup }}</span>
      </div>

      <div class="my-4 flex items-center">
        <span class="inline-block w-40">form-checkbox-group</span>
        <form-checkbox-group v-model="formData.formCheckboxGroup" :options="['foo', 'bar', 'baz']" class="inline-block mr-4" name="checkboxes">
          <template v-slot="slotData">
            <p class="pl-1 text-sm">{{ slotData.option.label || slotData.option }}</p>
          </template>
        </form-checkbox-group>
        <span class="rounded-r-full rounded-l-full bg-yellow-300 text-yellow-900 py-1 px-2 ml-2" v-if="formData.formCheckboxGroup" v-for="item in formData.formCheckboxGroup">{{ item }}</span>
      </div>
    </div>

    <div class="p-4 border-gray-500 border">

      <h2 class="text-xl font-bold mb-4">Sortable</h2>

      <div class="shadow overflow-hidden border-b border-gray-200 rounded-lg">
        <sortable
            :rows="sortable.rows"
            :columns="sortable.cols"
        ></sortable>
      </div>
    </div>

  </div>
</template>
