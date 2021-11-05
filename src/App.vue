<script setup>
  import PasswordInput from './components/vx-vue/formelements/password-input.vue';
  import FormSelect from './components/vx-vue/formelements/form-select.vue';
  import FormSwitch from './components/vx-vue/formelements/form-switch.vue';
  import FormFileButton from './components/vx-vue/formelements/form-file-button.vue';
  import FormRadioGroup from './components/vx-vue/formelements/form-radio-group.vue';
  import FormCheckboxGroup from './components/vx-vue/formelements/form-checkbox-group.vue';
  import DateInput from './components/vx-vue/formelements/date-input.vue';
  import DatePicker from './components/vx-vue/formelements/datepicker.vue';
  import Sortable from './components/vx-vue/sortable.vue';
  import Autocomplete from './components/vx-vue/autocomplete.vue';
  import Alert from './components/vx-vue/alert.vue';
  import MessageToast from './components/vx-vue/message-toast.vue';
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
            { label: 'Role', prop: 'role', sortable: true },
            { label: 'Born in', prop: 'yob', sortable: true }
          ]
        },
        autocomplete: {
          items: ["Afghanistan", "Åland Islands", "Albania", "Algeria", "American Samoa", "Andorra", "Angola", "Anguilla", "Antarctica", "Antigua and Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia, Plurinational State of", "Bonaire, Sint Eustatius and Saba", "Bosnia and Herzegovina", "Botswana", "Bouvet Island", "Brazil", "British Indian Ocean Territory", "Brunei Darussalam", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Central African Republic", "Chad", "Chile", "China", "Christmas Island", "Cocos (Keeling) Islands", "Colombia", "Comoros", "Congo", "Congo, the Democratic Republic of the", "Cook Islands", "Costa Rica", "Côte d'Ivoire", "Croatia", "Cuba", "Curaçao", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Falkland Islands (Malvinas)", "Faroe Islands", "Fiji", "Finland", "France", "French Guiana", "French Polynesia", "French Southern Territories", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guadeloupe", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Heard Island and McDonald Islands", "Holy See (Vatican City State)", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran, Islamic Republic of", "Iraq", "Ireland", "Isle of Man", "Israel", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, Democratic People's Republic of", "Korea, Republic of", "Kuwait", "Kyrgyzstan", "Lao People's Democratic Republic", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macao", "Macedonia, the Former Yugoslav Republic of", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Martinique", "Mauritania", "Mauritius", "Mayotte", "Mexico", "Micronesia, Federated States of", "Moldova, Republic of", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Niue", "Norfolk Island", "Northern Mariana Islands", "Norway", "Oman", "Pakistan", "Palau", "Palestine, State of", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Pitcairn", "Poland", "Portugal", "Puerto Rico", "Qatar", "Réunion", "Romania", "Russian Federation", "Rwanda", "Saint Barthélemy", "Saint Helena, Ascension and Tristan da Cunha", "Saint Kitts and Nevis", "Saint Lucia", "Saint Martin (French part)", "Saint Pierre and Miquelon", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Sint Maarten (Dutch part)", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Georgia and the South Sandwich Islands", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Svalbard and Jan Mayen", "Swaziland", "Sweden", "Switzerland", "Syrian Arab Republic", "Taiwan, Province of China", "Tajikistan", "Tanzania, United Republic of", "Thailand", "Timor-Leste", "Togo", "Tokelau", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks and Caicos Islands", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "United States Minor Outlying Islands", "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela, Bolivarian Republic of", "Viet Nam", "Virgin Islands, British", "Virgin Islands, U.S.", "Wallis and Futuna", "Western Sahara", "Yemen", "Zambia", "Zimbabwe"],
          selected: null
        },
        autocomplete2: {
          selected: null
        },
        toast: {
          message: ["There might be a meaningful message.", "Someday. Who knows?"],
          active: false,
          title: 'You got toasted!'
        }
      }
    },
    methods: {
      findItem (query) {
        return this.autocomplete.items.filter (item => item.toLowerCase().indexOf(query.toLowerCase()) !== -1);
      },
      async findItemDelayed (query) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        return this.autocomplete.items.filter (item => item.toLowerCase().indexOf(query.toLowerCase()) !== -1);
      },
      async alertMe () {
        await this.$refs.alert.open('Skynet...', "...begins to learn at a geometric rate.");
      }
    }
  }
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
    <div class="p-4 shadow-md">

      <h2 class="text-xl font-bold mb-4">Form Elements</h2>

      <div class="my-4 items-center">
        <label for="password-input" class="inline-block w-1/3">password-input</label>
        <password-input placeholder="6 characters or more" class="w-2/3" id="password-input" v-model="formData.passwordInput" />
        <span class="rounded-r-full rounded-l-full bg-yellow-300 text-yellow-900 py-1 px-2 ml-2" v-if="formData.passwordInput">{{ formData.passwordInput }}</span>
      </div>

      <div class="my-4 items-center">
        <label for="form-select" class="inline-block w-1/3">form-select</label>
        <form-select class="w-2/3" id="form-select" v-model="formData.formSelect" :options="['Please', 'Select', 'Me']" />
        <span class="rounded-r-full rounded-l-full bg-yellow-300 text-yellow-900 py-1 px-2 ml-2" v-if="formData.formSelect">{{ formData.formSelect }}</span>
      </div>

      <div class="my-4 items-center">
        <label for="date-input" class="inline-block w-1/3">date-input</label>
        <date-input placeholder="yyyy-mm-dd" class="w-2/3" id="date-input" v-model="formData.dateInput" :show-button="false"/>
        <span class="rounded-r-full rounded-l-full bg-yellow-300 text-yellow-900 py-1 px-2 ml-2" v-if="formData.dateInput">{{ formData.dateInput }}</span>
      </div>

      <div class="my-4 items-center">
        <label for="date-picker" class="inline-block w-1/3">date-picker</label>
        <date-picker
            placeholder="mm/dd/yyyy"
            class="w-2/3 inline-block"
            id="date-picker"
            v-model="formData.datePicker"
            input-format="m/d/y"
            output-format="d mmm y"
        />
        <span class="rounded-r-full rounded-l-full bg-yellow-300 text-yellow-900 py-1 px-2 ml-2" v-if="formData.datePicker">{{ formData.datePicker }}</span>
      </div>

      <div class="my-4 items-center">
        <label for="date-picker-2" class="inline-block w-1/3">date-picker (de)</label>
        <date-picker
            placeholder="dd.mm.yyyy"
            class="w-2/3 inline-block"
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
        <label for="form-file-button" class="inline-block w-1/3">form-file-button</label>
        <form-file-button id="form-file-button" v-model="formData.formFileButton" multiple="multiple" role="button" class="py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-vxvue hover:bg-vxvue-600">Upload</form-file-button>
        <span class="rounded-r-full rounded-l-full bg-yellow-300 text-yellow-900 py-1 px-2 ml-2" v-if="formData.formFileButton" v-for="file in formData.formFileButton">{{ file.name }}</span>
      </div>

      <div class="my-4 flex items-center">
        <label for="form-switch" class="inline-block w-1/3">form-switch</label>
        <form-switch id="form-switch" v-model="formData.formSwitch"><span class="pl-2">A simple toggle</span></form-switch>
        <span class="rounded-r-full rounded-l-full bg-yellow-300 text-yellow-900 py-1 px-2 ml-2" v-if="formData.formSwitch"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
    </svg></span>
      </div>

      <div class="my-4 flex items-center">
        <span class="inline-block w-1/3">form-radio-group</span>
        <form-radio-group v-model="formData.formRadioGroup" :options="['foo', 'bar', 'baz']" class="inline-block mr-4" name="radios">
          <template v-slot="slotData">
            <p class="pl-1 text-sm">{{ slotData.option.label || slotData.option }}</p>
          </template>
        </form-radio-group>
        <span class="rounded-r-full rounded-l-full bg-yellow-300 text-yellow-900 py-1 px-2 ml-2" v-if="formData.formRadioGroup">{{ formData.formRadioGroup }}</span>
      </div>

      <div class="my-4 flex items-center">
        <span class="inline-block w-1/3">form-checkbox-group</span>
        <form-checkbox-group v-model="formData.formCheckboxGroup" :options="['foo', 'bar', 'baz']" class="inline-block mr-4" name="checkboxes">
          <template v-slot="slotData">
            <p class="pl-1 text-sm">{{ slotData.option.label || slotData.option }}</p>
          </template>
        </form-checkbox-group>
        <span class="rounded-r-full rounded-l-full bg-yellow-300 text-yellow-900 py-1 px-2 ml-2" v-if="formData.formCheckboxGroup" v-for="item in formData.formCheckboxGroup">{{ item }}</span>
      </div>
    </div>

    <div class="p-4 shadow-md">

      <h2 class="text-xl font-bold mb-4">Sortable</h2>

      <div class="shadow overflow-hidden border-b border-gray-200 rounded-lg">
        <sortable
            :rows="sortable.rows"
            :columns="sortable.cols"
        ></sortable>
      </div>
    </div>
    <div class="p-4 shadow-md">

      <h2 class="text-xl font-bold mb-4">Autocomplete</h2>
      <p class="my-2">This autocomplete searches a readily available list of items.</p>
      <autocomplete
          :search="findItem"
          v-model="autocomplete.selected"
          placeholder="pick a country"
          @submit=""
          class="w-full"
          result-item-class="py-2 px-4 cursor-pointer hover:bg-gray-200"
          result-list-class="shadow-md bg-white max-h-96 overflow-auto"
      >
      </autocomplete>
      <p class="my-2">This autocomplete searches a promised list of items and will display a spinner.</p>
      <autocomplete
          :search="findItemDelayed"
          v-model="autocomplete2.selected"
          placeholder="pick a country"
          @submit=""
          class="w-full"
          result-item-class="py-2 px-4 cursor-pointer hover:bg-gray-200"
          result-list-class="shadow-md bg-white max-h-96 overflow-auto"
      >
      </autocomplete>
    </div>
    <div class="p-4 shadow-md">

      <h2 class="text-xl font-bold mb-4">Toasts, Alerts &amp; Confirms</h2>
      <div class="flex space-x-1">
        <button class="py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-vxvue hover:bg-vxvue-600" @click="toast.active = true">Toast me!</button>
        <button class="py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-vxvue hover:bg-vxvue-600" @click="alertMe">Alert me!</button>
      </div>
    </div>

  </div>

  <alert ref="alert" :config="{ label: 'Call John!' }">
    <template v-slot:icon>
        <div class="text-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
          </svg>
        </div>
    </template>
    <template v-slot:default="slotProps">
      <strong class="text-gray-700">{{ slotProps.message }}</strong>
    </template>
  </alert>

  <message-toast v-bind="toast" @timeout="toast.active = false" @close="toast.active = false" class="bg-green-700 text-white">
    <template v-slot:title><span class="text-green-200">{{ toast.title }}</span></template>
    <template v-slot:icon>
      <span class="text-green-200">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
      </span>
    </template>
  </message-toast>
</template>
