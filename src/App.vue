<script setup>
  import PasswordInput from './components/formelements/password-input.vue';
  import FormSelect from './components/formelements/form-select.vue';
  import FormSwitch from './components/formelements/form-switch.vue';
  import FormFileButton from './components/formelements/form-file-button.vue';
  import DateInput from './components/formelements/date-input.vue';
  import DatePicker from './components/formelements/datepicker.vue';
  import Sortable from './components/sortable.vue';
  import Autocomplete from './components/autocomplete.vue';
  import Alert from './components/alert.vue';
  import MessageToast from './components/message-toast.vue';
  import Pagination from './components/pagination.vue';
  import Tabs from './components/tabs.vue';
  import SimpleTree from "./components/simple-tree.vue";
  import CookieConsent from "./components/cookie-consent.vue";
  import * as Cookie from './util/cookie';
</script>

<script>
  export default {
    data () {
      return {
        formData: {},
        files: [],
        sortable: {
          rows: [
            { key: 1, name: 'Linda', role: 'Sarah', yob: 1956 },
            { key: 2, name: 'Robert', role: 'T1000', yob: 1958 },
            { key: 3, name: 'Arnold', role: 'T800', yob: 1947 },
            { key: 4, name: 'Edward', role: 'John', yob: 1977 },
            { key: 5, name: 'Michael', role: 'Kyle', yob: 1956 },
            { key: 6, name: 'Joe', role: 'Miles', yob: 1947 },
            { key: 7, name: 'Kristanna', role: 'T-X', yob: 1979 },
          ],
          cols: [
            { label: 'Name', prop: 'name', sortable: true },
            { label: 'Role', prop: 'role', sortable: true },
            { label: 'Born in', prop: 'yob', sortable: true }
          ]
        },
        items: ["Afghanistan", "Åland Islands", "Albania", "Algeria", "American Samoa", "Andorra", "Angola", "Anguilla", "Antarctica", "Antigua and Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia, Plurinational State of", "Bonaire, Sint Eustatius and Saba", "Bosnia and Herzegovina", "Botswana", "Bouvet Island", "Brazil", "British Indian Ocean Territory", "Brunei Darussalam", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Central African Republic", "Chad", "Chile", "China", "Christmas Island", "Cocos (Keeling) Islands", "Colombia", "Comoros", "Congo", "Congo, the Democratic Republic of the", "Cook Islands", "Costa Rica", "Côte d'Ivoire", "Croatia", "Cuba", "Curaçao", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Falkland Islands (Malvinas)", "Faroe Islands", "Fiji", "Finland", "France", "French Guiana", "French Polynesia", "French Southern Territories", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guadeloupe", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Heard Island and McDonald Islands", "Holy See (Vatican City State)", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran, Islamic Republic of", "Iraq", "Ireland", "Isle of Man", "Israel", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, Democratic People's Republic of", "Korea, Republic of", "Kuwait", "Kyrgyzstan", "Lao People's Democratic Republic", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macao", "Macedonia, the Former Yugoslav Republic of", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Martinique", "Mauritania", "Mauritius", "Mayotte", "Mexico", "Micronesia, Federated States of", "Moldova, Republic of", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Niue", "Norfolk Island", "Northern Mariana Islands", "Norway", "Oman", "Pakistan", "Palau", "Palestine, State of", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Pitcairn", "Poland", "Portugal", "Puerto Rico", "Qatar", "Réunion", "Romania", "Russian Federation", "Rwanda", "Saint Barthélemy", "Saint Helena, Ascension and Tristan da Cunha", "Saint Kitts and Nevis", "Saint Lucia", "Saint Martin (French part)", "Saint Pierre and Miquelon", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Sint Maarten (Dutch part)", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Georgia and the South Sandwich Islands", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Svalbard and Jan Mayen", "Swaziland", "Sweden", "Switzerland", "Syrian Arab Republic", "Taiwan, Province of China", "Tajikistan", "Tanzania, United Republic of", "Thailand", "Timor-Leste", "Togo", "Tokelau", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks and Caicos Islands", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "United States Minor Outlying Islands", "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela, Bolivarian Republic of", "Viet Nam", "Virgin Islands, British", "Virgin Islands, U.S.", "Wallis and Futuna", "Western Sahara", "Yemen", "Zambia", "Zimbabwe"],
        autocomplete: {
          selected: null
        },
        autocomplete2: {
          selected: null
        },
        pagination: {
          currentPage: 1,
          entriesPerPage: 10,
        },
        toast: {
          message: ["There might be a meaningful message.", "Someday. Who knows?"],
          active: false,
          title: 'You got toasted!'
        },
        alert: {},
        tabs: {
          items: [
            { name: 'Profile', badge: '!', icon: 'profile' },
            { name: 'Tech' },
            { name: 'Intelligence', disabled: true },
            { name: 'Strategy' },
            { name: 'Confidential', disabled: true, badge: '10', icon: 'confidential' }
          ],
          activeIndex: 0
        },
        tree: {
          "id": 1,
          "label": "files",
          "branches": [
            {
              "id": 325,
              "label": "articles",
              "branches": [
                {
                  "id": 332,
                  "label": "projects",
                  "branches": [],
                  "current": false,
                  "path": "files/articles/projects/"
                },
                {
                  "id": 333,
                  "label": "references",
                  "branches": [
                    {
                      "id": 330,
                      "label": "www",
                      "branches": [],
                      "current": false,
                      "path": "files/articles/references/www/"
                    }
                  ],
                  "current": false,
                  "path": "files/articles/references/"
                }
              ],
              "current": false,
              "path": "files/articles/"
            },
            {
              "id": 328,
              "label": "media",
              "branches": [],
              "current": false,
              "path": "files/media/"
            },
            {
              "id": 329,
              "label": "misc",
              "branches": [],
              "current": false,
              "path": "files/misc/"
            }
          ],
          "current": true,
          "path": "files/"
        },
        cookieConsent: {
          options: [
            {
              selected: true,
              disabled: true,
              label: 'required',
              key: 'session'
            },
            {
              label: 'Personalization. Makes your visit even more pleasant.',
              key: 'personalization'
            },
            {
              label: 'Marketing. This will make us some money by selling your data to the highest bidder.',
              key: 'marketing'
            }
          ],
          hasCookie: false
        },
        formDataLog: null,
        logTimeout: null
      }
    },
    computed: {
      paginatedItems() {
        return this.items.slice((this.pagination.currentPage - 1) * this.pagination.entriesPerPage, this.pagination.currentPage * this.pagination.entriesPerPage);
      },
    },
    watch: {
      formData: {
        handler (newValue) {
          this.formDataLog = Object.fromEntries(Object.entries(newValue).filter( ([k, v]) => v !== null && v !== undefined && v !== ''));

          let names = [];
          if (newValue.files && newValue.files.length) {
            newValue.files.forEach(item => names.push(item.name));
          }
          this.formDataLog.files = names.join(', ');

          if (this.logTimeout) {
            window.clearTimeout(this.logTimeout);
          }
          this.logTimeout = window.setTimeout(() => { this.formDataLog = null; this.logTimeout = null }, 3000);
        },
        deep: true
      }
    },
    methods: {
      findItem (query) {
        return this.items.filter (item => item.toLowerCase().indexOf(query.toLowerCase()) !== -1);
      },
      async findItemDelayed (query) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        return this.items.filter (item => item.toLowerCase().indexOf(query.toLowerCase()) !== -1);
      },
      async alertMe () {
        this.alert.buttons = { label: 'Call John!', value: 'ok' };
        await this.$refs.vxAlert.open('Skynet...', "...begins to learn at a geometric rate.");
      },
      async letsConfirm () {
        this.alert.buttons = [{ label: 'Go for it!', value: 'ok', 'class': '!bg-green-600 !hover:bg-green-500 focus:!ring-green-500' }, { label: 'Shut it down! Now!', value: 'cancel' }];
        console.log(await this.$refs.vxAlert.open('General Brewster', "Shall we turn on Skynet now?"));
      },
      branchSelected (item) {
        this.formData.tree = item.path;
      },
      acceptCookie (data) {
        this.cookieConsent.hasCookie = true;
      },
      triggerConsent () {
        Cookie.remove('cookies:consented');
        this.$refs.vxCookieConsent.isOpen = true;
      }
    }
  }
</script>

<template>
  <div class="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4 max-w-screen-2xl mx-auto pt-28 md:pt-32">

    <div class="p-4 shadow-md">

      <h2 class="text-xl font-bold mb-4">Form Elements</h2>

      <div class="my-4 items-center">
        <label for="password-input" class="inline-block w-1/3">password-input</label>
        <password-input placeholder="6 characters or more" class="w-2/3" id="password-input" v-model="formData.passwordInput" />
      </div>

      <div class="my-4 items-center">
        <label for="form-select" class="inline-block w-1/3">form-select</label>
        <form-select class="w-2/3" id="form-select" v-model="formData.formSelect" :options="['Please', 'Select', 'Me']" disabled-label="(Pick an option)" />
      </div>

      <div class="my-4 items-center">
        <label for="date-input" class="inline-block w-1/3">date-input</label>
        <date-input placeholder="yyyy-mm-dd" class="w-2/3" id="date-input" v-model="formData.dateInput" :show-button="false"/>
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
      </div>

      <div class="my-4 flex items-center">
        <label for="form-file-button" class="inline-block w-1/3">form-file-button</label>
        <form-file-button id="form-file-button" v-model="formData.files" multiple="multiple" role="button" class="py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-vxvue hover:bg-vxvue-600">Upload</form-file-button>
      </div>

      <div class="my-4 flex items-center">
        <label for="form-switch" class="inline-block w-1/3">form-switch</label>
        <form-switch id="form-switch" v-model="formData.formSwitch"><span class="pl-2">A simple toggle</span></form-switch>
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
        <button class="py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-vxvue hover:bg-vxvue-600" @click="letsConfirm">Let me decide!</button>
        <button class="py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-amber-700 hover:bg-amber-900" @click="triggerConsent" v-if="cookieConsent.hasCookie">Revoke cookie consent</button>
      </div>
    </div>

    <div class="p-4 shadow-md">
      <h2 class="text-xl font-bold mb-4">Pagination</h2>

      <ul>
        <li v-for="item in paginatedItems">{{ item }}</li>
      </ul>

      <div class="border-t border-gray-200">
        <pagination
            v-model:page="pagination.currentPage"
            :total="items.length"
            :per-page="10"
            prev-text="prev"
            next-text="next"
        />
      </div>
    </div>

    <div class="p-4 shadow-md">
      <h2 class="text-xl font-bold mb-4">Simple Tree</h2>
      <simple-tree :branch="tree" @branch-selected="branchSelected"></simple-tree>
    </div>


    <div class="p-4 shadow-md lg:col-span-2">
      <h2 class="text-xl font-bold mb-4">Tabs</h2>
      <tabs :items="tabs.items" v-model:active-index="tabs.activeIndex">
        <template v-slot:icon="slotProps">
          <span class="-ml-0.5 mr-2 h-5 w-5" v-if="slotProps.tab.icon === 'profile'">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" /></svg>
          </span>
          <span class="-ml-0.5 mr-2 h-5 w-5 -mt-1" v-if="slotProps.tab.icon === 'confidential'">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" /></svg>
          </span>
        </template>
      </tabs>
    </div>
  </div>

  <message-toast v-bind="toast" @timeout="toast.active = false" @close="toast.active = false" class="!bg-green-700 text-white">
    <template v-slot:title><span class="text-green-200">{{ toast.title }}</span></template>
    <template v-slot:icon>
      <span class="text-green-200">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
      </span>
    </template>
  </message-toast>

  <alert ref="vxAlert" :buttons="alert.buttons">
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

  <cookie-consent
      :options="cookieConsent.options"
      :cookie-options="{expires: 1, SameSite: 'Strict'}"
      @accept="acceptCookie"
      class="rounded mx-2 md:max-w-md bg-amber-100"
      ref="vxCookieConsent"
  >
    <template v-slot:message>
      <div class="space-y-4">
        <h2 class="text-xl font-bold">Notice</h2>
        <p>This is an extra simple cookie consent dialog which avoids any <em>dark patterns</em>.</p>
        <p>Your checkbox choices are stored in a cookie which expires after a day.</p>
        <p>Your selected options are ignored.</p>
      </div>
    </template>
    <template v-slot:option="option">
      <template v-if="option.option.label === 'required'">Required. Most likely only a session cookie.</template>
      <template v-else>
        {{ option.option.label }}
      </template>
    </template>
  </cookie-consent>

  <transition name="display-formdata">
    <div class="fixed bottom-0 bg-gray-800 bg-opacity-75 text-white flex py-4 items-center justify-center w-full flex-wrap" v-if="formDataLog">
      <span class="rounded-r-full rounded-l-full bg-yellow-300 text-yellow-900 py-1 px-2 mx-2 mb-1 truncate max-w-xs" v-for="(v, k) in formDataLog"><strong class="pr-2">{{ k }}</strong>
        <template v-if="typeof v === 'boolean' && v">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
        </template>
        <template v-if="typeof v === 'boolean' && !v">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </template>
        <template v-if="typeof v !== 'boolean'">
        {{ v }}
        </template>
      </span>
    </div>
  </transition>

</template>

<style>
  .display-formdata-enter-to,
  .display-formdata-leave-from {
    @apply opacity-100 transform-gpu translate-y-0;
  }
  .display-formdata-enter-from,
  .display-formdata-leave-to {
    @apply opacity-0 translate-y-full;
  }
  .display-formdata-enter-active,
  .display-formdata-leave-active {
    @apply transition-all duration-300;
  }
</style>