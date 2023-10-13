<script setup>
  import PasswordInput from "./components/password-input.vue"
  import FormSelect from "./components/form-select.vue"
  import Autocomplete from "./components/autocomplete.vue"
  import FormSwitch  from "./components/form-switch.vue"
  import Tabs from "./components/tabs.vue"
  import Sortable from "./components/sortable.vue"
  import FormFileButton from "./components/form-file-button.vue"
  import MessageToast from "./components/message-toast.vue"
  import Confirm from "./components/confirm.vue"
  import Pagination from "./components/pagination.vue"

  import {computed, ref} from "vue"
  import SimpleTree from "./components/simple-tree.vue";

  const form = ref({ pw: '', switch: false, formSelect: null, files: [], autocomplete: '', branch: {} })
  const tabs = ref({
    items: [
      { name: 'Profile', badge: '!', icon: 'profile' },
      { name: 'Tech' },
      { name: 'Intelligence', disabled: true },
      { name: 'Strategy' },
      { name: 'Confidential', disabled: true, badge: '10', icon: 'confidential' }
    ],
    activeIndex: 0
  })
  const sortable = ref({
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
  })
  const paginationData = ref({ currentPage: 1, entriesPerPage: 10 })
  const tree = ref({
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
  })
  const toast = ref({ message: '', active: false, title: 'You got toasted!' })
  const items = ["Afghanistan", "Åland Islands", "Albania", "Algeria", "American Samoa", "Andorra", "Angola", "Anguilla", "Antarctica", "Antigua and Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia, Plurinational State of", "Bonaire, Sint Eustatius and Saba", "Bosnia and Herzegovina", "Botswana", "Bouvet Island", "Brazil", "British Indian Ocean Territory", "Brunei Darussalam", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Central African Republic", "Chad", "Chile", "China", "Christmas Island", "Cocos (Keeling) Islands", "Colombia", "Comoros", "Congo", "Congo, the Democratic Republic of the", "Cook Islands", "Costa Rica", "Côte d'Ivoire", "Croatia", "Cuba", "Curaçao", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Falkland Islands (Malvinas)", "Faroe Islands", "Fiji", "Finland", "France", "French Guiana", "French Polynesia", "French Southern Territories", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guadeloupe", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Heard Island and McDonald Islands", "Holy See (Vatican City State)", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran, Islamic Republic of", "Iraq", "Ireland", "Isle of Man", "Israel", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, Democratic People's Republic of", "Korea, Republic of", "Kuwait", "Kyrgyzstan", "Lao People's Democratic Republic", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macao", "Macedonia, the Former Yugoslav Republic of", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Martinique", "Mauritania", "Mauritius", "Mayotte", "Mexico", "Micronesia, Federated States of", "Moldova, Republic of", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Niue", "Norfolk Island", "Northern Mariana Islands", "Norway", "Oman", "Pakistan", "Palau", "Palestine, State of", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Pitcairn", "Poland", "Portugal", "Puerto Rico", "Qatar", "Réunion", "Romania", "Russian Federation", "Rwanda", "Saint Barthélemy", "Saint Helena, Ascension and Tristan da Cunha", "Saint Kitts and Nevis", "Saint Lucia", "Saint Martin (French part)", "Saint Pierre and Miquelon", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Sint Maarten (Dutch part)", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Georgia and the South Sandwich Islands", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Svalbard and Jan Mayen", "Swaziland", "Sweden", "Switzerland", "Syrian Arab Republic", "Taiwan, Province of China", "Tajikistan", "Tanzania, United Republic of", "Thailand", "Timor-Leste", "Togo", "Tokelau", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks and Caicos Islands", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "United States Minor Outlying Islands", "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela, Bolivarian Republic of", "Viet Nam", "Virgin Islands, British", "Virgin Islands, U.S.", "Wallis and Futuna", "Western Sahara", "Yemen", "Zambia", "Zimbabwe"]
  const confirm = ref(null)
  const paginatedItems = computed(() => items.slice((paginationData.value.currentPage - 1) * paginationData.value.entriesPerPage, paginationData.value.currentPage * paginationData.value.entriesPerPage))
  const findItem = async query => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return items.filter(item => item.toLowerCase().indexOf(query.toLowerCase()) !== -1)
  }
  const doConfirm = id => {
    confirm.value.open("General Brewster", "Shall we turn on Skynet?").then(() => {
      toast.value.message = ['Skynet begins to learn at a geometric rate.', 'It becomes self-aware at 2:14 a.m. Eastern time, August 29th.']
      toast.value.active = true
    }).catch(() => {})
  }
</script>

<template>
  <div class="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4 px-4 mx-auto pt-28 md:pt-32">
    <div class="p-4 shadow-md space-y-2">
      <h2 class="text-xl font-bold mb-4">Form Elements</h2>
      <div><label for="password-input">Password Input</label><password-input id="password-input" v-model="form.pw" class="w-full" /></div>
      <div><autocomplete
          :search="findItem"
          v-model="form.autocomplete"
          placeholder="pick a country"
          @submit=""
          class="w-full"
          result-item-class="py-2 px-4 cursor-pointer hover:bg-gray-200"
          result-list-class="shadow-md bg-white max-h-96 overflow-auto"
      /></div>
      <div class="flex space-x-2 items-center"><label for="form-switch">Form Switch</label><form-switch id="form-switch" v-model="form.switch" /></div>
      <div><label for="form-select">Form Select</label><form-select class="w-full" id="form-select" v-model="form.formSelect" :options="['Please', 'Select', 'Me']" disabled-label="(Pick an option)" /></div>
      <div><label for="form-file-button">Form File Button</label><form-file-button id="form-file-button" v-model="form.files" multiple="multiple" role="button" class="py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-vxvue hover:bg-vxvue-600 block text-center">Pick Files</form-file-button></div>
    </div>

    <div class="p-4 shadow-md space-y-2">
      <h2 class="text-xl font-bold mb-4">Form Data</h2>
      <pre>{{ form }}</pre>
    </div>

    <div class="p-4 shadow-md">
      <h2 class="text-xl font-bold mb-4">Sortable</h2>
      <div class="shadow overflow-hidden border-b border-gray-200 rounded-lg">
        <sortable
            :rows="sortable.rows"
            :columns="sortable.cols"
        />
      </div>
    </div>

    <div class="p-4 shadow-md">
      <h2 class="text-xl font-bold mb-4">Simple Tree</h2>
      <simple-tree :branch="tree" @branch-selected="form.branch = $event" />
    </div>
    <div class="p-4 shadow-md">
      <h2 class="text-xl font-bold mb-4">Toast &amp; Confirm</h2>
      <div class="space-x-1">
        <button class="py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-vxvue hover:bg-vxvue-600" @click="toast.message = ['There might be a meaningful message.', 'Someday. Who knows?']; toast.active = true">Toast me!</button>
        <button class="py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-vxvue hover:bg-vxvue-600" @click="doConfirm">Confirm!</button>
      </div>
    </div>

    <div class="p-4 shadow-md lg:row-span-2">
      <h2 class="text-xl font-bold mb-4">Pagination</h2>
      <ul>
        <li v-for="item in paginatedItems">{{ item }}</li>
      </ul>

      <div class="border-t border-gray-200">
        <pagination
            v-model:page="paginationData.currentPage"
            :total="items.length"
            :per-page="paginationData.entriesPerPage"
            prev-text="prev"
            next-text="next"
        />
      </div>

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

  <teleport to="body">
    <confirm
        ref="confirm"
        :buttons="[
          { label: 'Go ahead!', value: true, class: 'py-2 px-4 bg-red-600 hover:bg-red-500 text-white rounded-md' },
          { label: 'Cancel', value: false, class: 'py-2 px-4 text-stone-700 hover:bg-stone-200 rounded-md' }
        ]"
    />
  </teleport>
</template>