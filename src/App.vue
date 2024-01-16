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
  import Modal from "./components/modal.vue"
  import SimpleTree from "./components/simple-tree.vue"
  import DateInput from "./components/date-input.vue"
  import Datepicker from "./components/datepicker.vue"
  import Slider from "./components/slider.vue"
  import { XMarkIcon, UserIcon, ShieldExclamationIcon } from "@heroicons/vue/24/solid"

  import { computed, ref } from "vue"
  import Accordion from "./components/accordion.vue";
  import AccordionPanel from "./components/accordion-panel.vue";

  const form = ref({
    pw: '',
    switch: false,
    formSelect: null,
    files: [],
    autocomplete: '',
    branch: {},
    dateInput: null,
    datepicker: null,
    slider: 0,
    sliderPair: [10, 30],
    sliderVertical: [10, 15]
  })
  const tabs = ref({
    items: [
      { name: 'Profile', badge: '!', icon: UserIcon },
      { name: 'Tech' },
      { name: 'Intelligence', disabled: true },
      { name: 'Strategy' },
      { name: 'Confidential', disabled: true, badge: '10', icon: ShieldExclamationIcon }
    ],
    activeIndex: 0
  })
  const accordionIndex = ref(-1)
  const sortable = ref({
    rows: [
      { key: 1, name: 'Linda', role: 'Sarah', yob: 1956 },
      { key: 2, name: 'Robert', role: 'T1000', yob: 1958 },
      { key: 3, name: 'Arnold', role: 'T800', yob: 1947 },
      { key: 4, name: 'Edward', role: 'John', yob: 1977 },
      { key: 5, name: 'Michael', role: 'Kyle', yob: 1956 },
      { key: 6, name: 'Joe', role: 'Miles', yob: 1947 },
      { key: 7, name: 'Kristanna', role: 'T-X', yob: 1979 },
      { key: 8, name: 'Gabriel', role: 'REV-9', yob: 1982 },
      { key: 9, name: 'Mackenzie', role: 'Grace', yob: 1987 },
    ],
    cols: [
      { label: 'Name', prop: 'name', sortable: true },
      { label: 'Role', prop: 'role', sortable: true },
      { label: 'Born in', prop: 'yob', sortable: true }
    ]
  })
  const modal = ref({ show: false })
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
  const confirmDialog = ref(null)
  const paginatedItems = computed(() => items.slice((paginationData.value.currentPage - 1) * paginationData.value.entriesPerPage, paginationData.value.currentPage * paginationData.value.entriesPerPage))
  const findItem = async query => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return items.filter(item => item.toLowerCase().indexOf(query.toLowerCase()) !== -1)
  }
  const doConfirm = id => {
    confirmDialog.value.open("General Brewster", "Shall we turn on Skynet?").then(() => {
      toast.value.message = ['Skynet begins to learn at a geometric rate.', 'It becomes self-aware at 2:14 a.m. Eastern time, August 29th.']
      toast.value.active = true
    }).catch(() => {})
  }
  const clearFormData = () => form.value = { pw: '', switch: false, formSelect: null, files: [], autocomplete: '', branch: {}, dateInput: null, datepicker: null, slider: 0, sliderPair: [10, 30], sliderVertical: [10, 15] }
</script>

<template>
  <div class="grid grid-cols-1 gap-4 px-4 pt-28 mx-auto md:pt-32 lg:grid-cols-2 2xl:grid-cols-3">
    <div class="p-4 space-y-2 shadow-md">
      <h2 class="mb-4 text-xl font-bold">Accordion</h2>
      <div>
      <accordion @update:active-index="accordionIndex = $event" :active-index="accordionIndex">
        <accordion-panel>
          <template #header>Header 1</template>
          <template #body>
            <div class="p-4 bg-amber-200">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
                laborum.
              </p>
            </div>
          </template>
        </accordion-panel>
        <accordion-panel>
          <template #header>Header 2</template>
          <template #body>
            <div class="p-4 bg-emerald-200">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
                laborum.
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
                laborum.
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
                laborum.
              </p>
            </div>
          </template>
        </accordion-panel>
        <accordion-panel>
          <template #header>Header 3</template>
          <template #body>
            <div class="p-4 bg-fuchsia-300">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
                laborum.
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
                laborum.
              </p>
            </div>
          </template>
        </accordion-panel>
      </accordion>
      </div>
    </div>
    <div class="p-4 space-y-2 shadow-md">
      <h2 class="mb-4 text-xl font-bold">Form Elements</h2>
      <div class="grid grid-cols-4 gap-4">
        <div class="col-span-3 space-y-2">
          <div>
            <label for="slider-1">Slider with a single numeric value as model</label>
            <div class="flex items-center space-x-2"><slider id="slider-1" :min="-20" :max="20" v-model="form.slider" /><input class="w-12 form-input" v-model.number="form.slider" /></div>
          </div>
          <div>
            <label for="slider-2">Slider with an array of two numeric values as model</label>
            <div class="flex items-center space-x-2"><slider id="slider-2" :min="0" :max="50" v-model="form.sliderPair" /><input class="w-12 form-input" v-model.number="form.sliderPair[0]" /><input class="w-12 form-input" v-model.number="form.sliderPair[1]" /></div>
          </div>
        </div>
        <div class="flex justify-center items-start space-x-2">
          <label class="hidden sm:block" for="slider-v">Vertical Slider</label>
          <slider id="slider-v" :min="0" :max="30" v-model="form.sliderVertical" vertical />
        </div>
      </div>
      <div><label for="password-input">Password Input</label><password-input id="password-input" v-model="form.pw" class="w-full" /></div>
      <div><label for="autocomplete">Autocomplete</label><autocomplete
          :search="findItem"
          v-model="form.autocomplete"
          placeholder="pick a country"
          id="autocomplete"
          class="w-full"
          result-item-class="py-2 px-4 cursor-pointer hover:bg-gray-200"
          result-list-class="overflow-auto max-h-96 bg-white shadow-md"
          auto-select
      /></div>
      <div class="flex items-center space-x-2">
        <label for="form-switch">Form Switch</label>
        <form-switch id="form-switch" aria-label="sample-switch" v-model="form.switch" />
        <span class="flex space-x-2"><form-switch id="form-switch-disabled" aria-label="sample-switch-disabled" disabled model-value="1"><span>a disabled switch</span></form-switch></span>
      </div>
      <div>
        <label for="form-select">Form Select</label>
        <form-select class="w-full" id="form-select" v-model="form.formSelect" :options="['Please', 'Select', 'Me']" disabled-label="(Pick an option)" />
      </div>
      <div>
        <label for="form-file-button">Form File Button</label>
        <form-file-button id="form-file-button" v-model="form.files" multiple="multiple" class="block py-2 px-4 text-center text-white rounded-md border border-transparent shadow-sm bg-vxvue hover:bg-vxvue-600">Pick Files</form-file-button>
      </div>
      <div>
        <label for="date-input">Date Input</label>
        <date-input class="w-full" placeholder="yyyy-mm-dd" id="date-input" v-model="form.dateInput" :show-button="false" />
      </div>
      <div>
        <label for="datepicker">Datepicker</label>
        <datepicker class="w-full" placeholder="mm/dd/yyyy" id="datepicker" v-model="form.datepicker" locale="en-US" output-format="M/D/YYYY" input-format="mm/dd/yyyy"/>
      </div>
    </div>

    <div class="p-4 space-y-2 shadow-md">
      <h2 class="flex justify-between items-center mb-4"><span class="text-xl font-bold">Form Data</span><button class="py-2 px-4 text-white rounded-md border border-transparent shadow-sm bg-vxvue hover:bg-vxvue-600" @click="clearFormData">Clear</button></h2>
      <pre>{{ form }}</pre>
    </div>

    <div class="p-4 shadow-md">
      <h2 class="mb-4 text-xl font-bold">Sortable</h2>
      <div class="overflow-hidden rounded-lg border-b border-gray-200 shadow">
        <div class="overflow-x-auto">
          <sortable
              :rows="sortable.rows"
              :columns="sortable.cols"
          />
        </div>
      </div>
    </div>

    <div class="p-4 shadow-md">
      <h2 class="mb-4 text-xl font-bold">Simple Tree</h2>
      <simple-tree :branch="tree" @branch-selected="form.branch = $event" />
    </div>

    <div class="p-4 shadow-md">
      <h2 class="mb-4 text-xl font-bold">Toast, Modal &amp; Confirm</h2>
      <div class="grid grid-cols-1 gap-1 sm:grid-cols-3">
        <button class="block py-2 px-4 w-full text-white rounded-md border border-transparent shadow-sm bg-vxvue hover:bg-vxvue-600" @click="toast.message = ['There might be a meaningful message.', 'Someday. Who knows?']; toast.active = true">Toast me!</button>
        <button class="block py-2 px-4 w-full text-white rounded-md border border-transparent shadow-sm bg-vxvue hover:bg-vxvue-600" @click="modal.show = true">Show a Modal</button>
        <button class="block py-2 px-4 w-full text-white rounded-md border border-transparent shadow-sm bg-vxvue hover:bg-vxvue-600" @click="doConfirm">Confirm!</button>
      </div>
    </div>

    <div class="p-4 shadow-md lg:row-span-2">

      <h2 class="mb-4 text-xl font-bold">Pagination</h2>

      <div class="border-b border-gray-200">
        <pagination
            v-model:page="paginationData.currentPage"
            :total="items.length"
            :per-page="paginationData.entriesPerPage"
            :show-nav-buttons="false"
            marker-position="below"
        />
      </div>

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
      <h2 class="mb-4 text-xl font-bold">Tabs</h2>
      <tabs :items="tabs.items" v-model:active-index="tabs.activeIndex">
        <template #icon="slotProps">
          <span class="mr-2 -ml-0.5 size-5" v-if="slotProps.tab.icon">
            <component :is="slotProps.tab.icon" class="w-5 h-5" fill="currentColor" />
          </span>
        </template>
      </tabs>
    </div>
  </div>

  <message-toast v-bind="toast" @timeout="toast.active = false" @close="toast.active = false" class="!bg-green-700 text-white">
    <template #title><span class="text-green-200">{{ toast.title }}</span></template>
    <template #icon>
      <span class="text-green-200">
        <svg xmlns="http://www.w3.org/2000/svg" class="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
      </span>
    </template>
  </message-toast>

  <modal :show="modal.show" @clicked-outside="modal.show = false" container-class="mx-4 w-full lg:w-1/2 xl:w-1/4">
    <template #title>
      <div class="flex fixed justify-between items-center px-4 w-full h-16 bg-vxvue-500">
        <span class="text-xl font-bold text-white">A Modal</span>
        <a href="#" @click.prevent="modal.show = false"><x-mark-icon class="size-5 text-white"/></a>
      </div>
    </template>
    <template #default>
      <div class="p-4 text-xl text-center">Something of importance might be said here.</div>
    </template>
  </modal>

  <teleport to="body">
    <confirm
        ref="confirmDialog"
        :buttons="[
          { label: 'Go ahead!', value: true, class: 'py-2 px-4 bg-red-600 hover:bg-red-500 text-white rounded-md' },
          { label: 'Cancel', value: false, class: 'py-2 px-4 text-stone-700 hover:bg-stone-200 rounded-md' }
        ]"
    />
  </teleport>
</template>