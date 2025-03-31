<script setup>
  import { XMarkIcon, UserIcon, ShieldExclamationIcon } from "@heroicons/vue/24/solid"
  import Accordion from "./components/Accordion.vue"
  import AccordionPanel from "./components/AccordionPanel.vue"
  import SubmitButton from "./components/SubmitButton.vue"
  import Sizable from "./components/Sizable.vue"
  import PasswordInput from "./components/PasswordInput.vue"
  import FormSelect from "./components/FormSelect.vue"
  import Autocomplete from "./components/Autocomplete.vue"
  import FormSwitch  from "./components/FormSwitch.vue"
  import Tabs from "./components/Tabs.vue"
  import Sortable from "./components/Sortable.vue"
  import FormFileButton from "./components/FormFileButton.vue"
  import MessageToast from "./components/MessageToast.vue"
  import Confirm from "./components/Confirm.vue"
  import Pagination from "./components/Pagination.vue"
  import Modal from "./components/Modal.vue"
  import SimpleTree from "./components/SimpleTree.vue"
  import DateInput from "./components/DateInput.vue"
  import Datepicker from "./components/Datepicker.vue"
  import Slider from "./components/Slider.vue"
  import vFloatingLabel from "./directives/floatingLabel"
  import { computed, ref } from "vue"

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
    sliderVertical: [10, 15],
    input: ''
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
  const accordionIndex = ref({ multiple: [1], single: 0 })
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
  const submitBusy = ref(false)
  const items = ["Afghanistan", "Åland Islands", "Albania", "Algeria", "American Samoa", "Andorra", "Angola", "Anguilla", "Antarctica", "Antigua and Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia, Plurinational State of", "Bonaire, Sint Eustatius and Saba", "Bosnia and Herzegovina", "Botswana", "Bouvet Island", "Brazil", "British Indian Ocean Territory", "Brunei Darussalam", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Central African Republic", "Chad", "Chile", "China", "Christmas Island", "Cocos (Keeling) Islands", "Colombia", "Comoros", "Congo", "Congo, the Democratic Republic of the", "Cook Islands", "Costa Rica", "Côte d'Ivoire", "Croatia", "Cuba", "Curaçao", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Falkland Islands (Malvinas)", "Faroe Islands", "Fiji", "Finland", "France", "French Guiana", "French Polynesia", "French Southern Territories", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guadeloupe", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Heard Island and McDonald Islands", "Holy See (Vatican City State)", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran, Islamic Republic of", "Iraq", "Ireland", "Isle of Man", "Israel", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, Democratic People's Republic of", "Korea, Republic of", "Kuwait", "Kyrgyzstan", "Lao People's Democratic Republic", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macao", "Macedonia, the Former Yugoslav Republic of", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Martinique", "Mauritania", "Mauritius", "Mayotte", "Mexico", "Micronesia, Federated States of", "Moldova, Republic of", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Niue", "Norfolk Island", "Northern Mariana Islands", "Norway", "Oman", "Pakistan", "Palau", "Palestine, State of", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Pitcairn", "Poland", "Portugal", "Puerto Rico", "Qatar", "Réunion", "Romania", "Russian Federation", "Rwanda", "Saint Barthélemy", "Saint Helena, Ascension and Tristan da Cunha", "Saint Kitts and Nevis", "Saint Lucia", "Saint Martin (French part)", "Saint Pierre and Miquelon", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Sint Maarten (Dutch part)", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Georgia and the South Sandwich Islands", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Svalbard and Jan Mayen", "Swaziland", "Sweden", "Switzerland", "Syrian Arab Republic", "Taiwan, Province of China", "Tajikistan", "Tanzania, United Republic of", "Thailand", "Timor-Leste", "Togo", "Tokelau", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks and Caicos Islands", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "United States Minor Outlying Islands", "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela, Bolivarian Republic of", "Viet Nam", "Virgin Islands, British", "Virgin Islands, U.S.", "Wallis and Futuna", "Western Sahara", "Yemen", "Zambia", "Zimbabwe"]
  const confirmDialog = ref(null)
  const paginatedItems = computed(() => items.slice((paginationData.value.currentPage - 1) * paginationData.value.entriesPerPage, paginationData.value.currentPage * paginationData.value.entriesPerPage))
  const findItem = async query => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return items.filter(item => item.toLowerCase().includes(query.toLowerCase()))
  }
  const doConfirm = () => {
    confirmDialog.value.open("General Brewster", "Shall we turn on Skynet?").then(() => {
      toast.value.message = ['Skynet begins to learn at a geometric rate.', 'It becomes self-aware at 2:14 a.m. Eastern time, August 29th.']
      toast.value.active = true
    }).catch(() => {})
  }
  const doSubmit = () => { submitBusy.value = true; setTimeout(() => submitBusy.value = false, 3000) }
  const clearFormData = () => form.value = { pw: '', switch: false, formSelect: null, files: [], autocomplete: '', branch: {}, dateInput: null, datepicker: null, slider: 0, sliderPair: [10, 30], sliderVertical: [10, 15] }
</script>

<template>
  <div class="grid grid-cols-1 gap-4 px-4 pt-28 mx-auto md:pt-32 lg:grid-cols-2 2xl:grid-cols-3">
    <div class="p-4 space-y-2 shadow-md">
      <h2 class="mb-4 text-xl font-bold">
        Accordion (activeIndex is an array)
      </h2>
      <div class="space-y-1">
        <accordion v-model:active-index="accordionIndex.multiple">
          <accordion-panel>
            <template #header>
              <strong>Header 1</strong>
            </template>
            <div class="p-4 border-b-2 border-slate-300">
              <p>Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth.</p>
            </div>
          </accordion-panel>
          <accordion-panel>
            <template #header>
              <strong>Header 2</strong>
            </template>
            <div class="p-4 border-b-2 border-slate-300">
              <p>Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of Lorem Ipsum decided to leave for the far World of Grammar. The Big Oxmox advised her not to do so, because there were thousands of bad Commas, wild Question Marks and devious Semikoli, but the Little Blind Text didn’t listen. She packed her seven versalia, put her initial into the belt and made herself on the way. When she reached the first hills of the Italic Mountains, she had a last view back on the skyline of her hometown Bookmarksgrove, the headline of Alphabet Village and the subline of her own road, the Line Lane.</p>
              <p>Pityful a rethoric question ran over her cheek, then she continued her way. On her way she met a copy. The copy warned the Little Blind Text, that where it came from it would have been rewritten a thousand times and everything that was left from its origin would be the word "and" and the Little Blind Text should turn around and return to its own, safe country. But nothing the copy said could convince her and so it didn’t take long until a few insidious Copy Writers ambushed her, made her drunk with Longe and Parole and dragged her into their agency, where they abused her for their projects again and again. And if she hasn’t been rewritten, then they are still using her.</p>
            </div>
          </accordion-panel>
          <accordion-panel :disabled="true">
            <template #header>
              Header 3
            </template>
            <div class="p-4 border-b-2 border-slate-300">
              <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
            </div>
          </accordion-panel>
          <accordion-panel>
            <template #header>
              <strong>Header 4</strong>
            </template>
            <div class="p-4 border-b-2 border-slate-300">
              <p>The European languages are members of the same family. Their separate existence is a myth. For science, music, sport, etc, Europe uses the same vocabulary. The languages only differ in their grammar, their pronunciation and their most common words. Everyone realizes why a new common language would be desirable: one could refuse to pay expensive translators. To achieve this, it would be necessary to have uniform grammar, pronunciation and more common words. If several languages coalesce, the grammar of the resulting language is more simple and regular than that of the individual languages. The new common language will be more simple and regular than the existing European languages.</p>
            </div>
          </accordion-panel>
        </accordion>
      </div>
      <h2 class="mb-4 text-xl font-bold">
        Accordion (activeIndex is a number)
      </h2>
      <div class="space-y-1">
        <accordion v-model:active-index="accordionIndex.single">
          <accordion-panel>
            <template #header>
              <strong>Header 1</strong>
            </template>
            <div class="p-4 border-b-2 border-slate-300">
              <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.</p>
            </div>
          </accordion-panel>
          <accordion-panel>
            <template #header>
              <strong>Header 2</strong>
            </template>
            <div class="p-4 border-b-2 border-slate-300">
              <p>A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth. Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of Lorem Ipsum decided to leave for the far World of Grammar. The Big Oxmox advised her not to do so, because there were thousands of bad Commas, wild Question Marks and devious Semikoli, but the Little Blind Text didn’t listen.</p>
            </div>
          </accordion-panel>
          <accordion-panel>
            <template #header>
              <strong>Header 3</strong>
            </template>
            <div class="p-4 border-b-2 border-slate-300">
              <p>She packed her seven versalia, put her initial into the belt and made herself on the way.</p>
            </div>
          </accordion-panel>
          <accordion-panel>
            <template #header>
              <strong>Header 4</strong>
            </template>
            <div class="p-4 border-b-2 border-slate-300">
              <p>When she reached the first hills of the Italic Mountains, she had a last view back on the skyline of her hometown Bookmarksgrove, the headline of Alphabet Village and the subline of her own road, the Line Lane. Pityful a rethoric question ran over her cheek, then she continued her way. On her way she met a copy. The copy warned the Little Blind Text, that where it came from it would have been rewritten a thousand times and everything that was left from its origin would be the word "and" and the Little Blind Text should turn around and return to its own, safe country. But nothing the copy said could convince her and so it didn’t take long until a few insidious Copy Writers ambushed her, made her drunk with Longe and Parole and dragged her into their agency, where they abused her for their projects again and again. And if she hasn’t been rewritten, then they are still using her. Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
            </div>
          </accordion-panel>
        </accordion>
      </div>
    </div>
    <div class="p-4 space-y-2 shadow-md">
      <h2 class="mb-4 text-xl font-bold">
        Form Elements
      </h2>
      <div>
        <input v-model="form.input" v-floating-label="{ label: 'A floating label' }" class="w-full">
      </div>
      <div>
        <datepicker v-model="form.datepicker" placeholder="A floating label with a datepicker" v-floating-label />
      </div>
      <div>
        <input v-model="form.input" v-floating-label="{ invalid: true }" placeholder="The placeholder becomes a label, plus this indicates invalid" class="w-full">
      </div>
      <div>
        <textarea v-model="form.input" v-floating-label placeholder="Works with textareas, too" class="w-full" />
      </div>
      <div class="grid grid-cols-4 gap-4">
        <div class="col-span-3 space-y-2">
          <div>
            <label for="slider-1">Slider with a single numeric value as model</label>
            <div class="flex items-center space-x-2">
              <slider id="slider-1" v-model="form.slider" :min="-20" :max="20" /><input v-model.number="form.slider" class="w-12 form-input">
            </div>
          </div>
          <div>
            <label for="slider-2">Slider with an array of two numeric values as model</label>
            <div class="flex items-center space-x-2">
              <slider id="slider-2" v-model="form.sliderPair" :min="0" :max="50" /><input v-model.number="form.sliderPair[0]" class="w-12 form-input"><input v-model.number="form.sliderPair[1]" class="w-12 form-input">
            </div>
          </div>
        </div>
        <div class="flex justify-center items-start space-x-2">
          <label class="hidden sm:block" for="slider-v">Vertical Slider</label>
          <slider
            id="slider-v"
            v-model="form.sliderVertical"
            :min="0"
            :max="30"
            vertical
          />
        </div>
      </div>
      <password-input v-model="form.pw" v-floating-label placeholder="Enter a password" class="w-full" />
      <div>
        <label for="autocomplete">Autocomplete</label><autocomplete
          id="autocomplete"
          v-model="form.autocomplete"
          :search="findItem"
          placeholder="pick a country"
          class="w-full"
          result-item-class="py-2 px-4 cursor-pointer hover:bg-gray-200"
          result-list-class="overflow-auto max-h-96 bg-white shadow-md"
          auto-select
        />
      </div>
      <div class="flex items-center space-x-2">
        <label for="form-switch">Form Switch</label>
        <form-switch id="form-switch" v-model="form.switch" aria-label="sample-switch" />
        <span class="flex space-x-2"><form-switch id="form-switch-disabled" aria-label="sample-switch-disabled" disabled :model-value="true"><span>a disabled switch</span></form-switch></span>
      </div>
      <div>
        <label for="form-select">Form Select</label>
        <form-select
          id="form-select"
          v-model="form.formSelect"
          class="w-full"
          :options="['Please', 'Select', 'Me']"
          disabled-label="(Pick an option)"
        />
      </div>
      <div>
        <label for="form-file-button">Form File Button</label>
        <form-file-button id="form-file-button" v-model="form.files" multiple="multiple" class="block py-2 px-4 text-center text-white rounded-md border border-transparent shadow-xs bg-vxvue hover:bg-vxvue-600">
          Pick Files
        </form-file-button>
      </div>
      <div>
        <label for="date-input">Date Input</label>
        <date-input
          id="date-input"
          v-model="form.dateInput"
          class="w-full"
          placeholder="yyyy-mm-dd"
          :show-button="false"
        />
      </div>
      <div>
        <label for="datepicker">Datepicker</label>
        <datepicker
          id="datepicker"
          v-model="form.datepicker"
          class="w-full"
          placeholder="mm/dd/yyyy"
          locale="en-US"
          output-format="M/D/YYYY"
          input-format="mm/dd/yyyy"
        />
      </div>
      <div class="flex justify-between space-x-2">
        <submit-button class="py-2 px-4 font-medium text-white rounded-sm focus:ring-2 focus:ring-offset-2 focus:outline-hidden bg-vxvue hover:bg-vxvue-700 focus:ring-vxvue" :busy="submitBusy" @submit="doSubmit">
          A default submit button
        </submit-button>
        <submit-button class="py-2 px-4 font-medium rounded-sm focus:ring-2 focus:ring-offset-2 focus:outline-hidden" :busy="submitBusy" theme="success" @submit="doSubmit">
          Submit button 'success'
        </submit-button>
        <submit-button class="py-2 px-4 font-medium rounded-sm focus:ring-2 focus:ring-offset-2 focus:outline-hidden" :busy="submitBusy" theme="error" @submit="doSubmit">
          Submit button 'error'
        </submit-button>
      </div>
    </div>

    <div class="p-4 space-y-2 shadow-md">
      <h2 class="flex justify-between items-center mb-4">
        <span class="text-xl font-bold">Form Data</span><button class="py-2 px-4 text-white rounded-md border border-transparent shadow-xs bg-vxvue hover:bg-vxvue-600" @click="clearFormData">
          Clear
        </button>
      </h2>
      <pre>{{ form }}</pre>
    </div>

    <div class="p-4 shadow-md">
      <h2 class="mb-4 text-xl font-bold">
        Sortable
      </h2>
      <div class="overflow-hidden rounded-lg border-b border-gray-200 shadow-sm">
        <div class="overflow-x-auto">
          <Sortable
            :rows="sortable.rows"
            :columns="sortable.cols"
          />
        </div>
      </div>
    </div>

    <div class="p-4 shadow-md">
      <h2 class="mb-4 text-xl font-bold">
        Simple Tree
      </h2>
      <simple-tree :branch="tree" @branch-selected="form.branch = $event" />
    </div>

    <div class="p-4 shadow-md">
      <h2 class="mb-4 text-xl font-bold">
        Toast, Modal &amp; Confirm
      </h2>
      <div class="grid grid-cols-1 gap-1 sm:grid-cols-3">
        <button class="block py-2 px-4 w-full text-white rounded-md border border-transparent shadow-xs bg-vxvue hover:bg-vxvue-600" @click="toast.message = ['There might be a meaningful message.', 'Someday. Who knows?']; toast.active = true">
          Toast me!
        </button>
        <button class="block py-2 px-4 w-full text-white rounded-md border border-transparent shadow-xs bg-vxvue hover:bg-vxvue-600" @click="modal.show = true">
          Show a Modal
        </button>
        <button class="block py-2 px-4 w-full text-white rounded-md border border-transparent shadow-xs bg-vxvue hover:bg-vxvue-600" @click="doConfirm">
          Confirm!
        </button>
      </div>
    </div>

    <div class="p-4 shadow-md lg:row-span-2">
      <h2 class="mb-4 text-xl font-bold">
        Pagination
      </h2>

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
        <!-- eslint-disable-next-line vue/require-v-for-key -->
        <li v-for="item in paginatedItems">
          {{ item }}
        </li>
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
      <h2 class="mb-4 text-xl font-bold">
        Tabs
      </h2>
      <Tabs v-model:active-index="tabs.activeIndex" :items="tabs.items">
        <template #icon="slotProps">
          <span v-if="slotProps.tab.icon" class="mr-2 -ml-0.5 size-5">
            <component :is="slotProps.tab.icon" class="w-5 h-5" fill="currentColor" />
          </span>
        </template>
      </Tabs>
    </div>

    <div class="p-4 shadow-md">
      <h2 class="mb-4 text-xl font-bold">
        Sizable vertical
      </h2>
      <div class="flex flex-col w-full h-[500px]">
        <sizable :vertical="true" class="shrink-0 mb-3.5 h-1/2">
          <div class="h-full bg-emerald-500" />
        </sizable>
        <div class="w-full h-full bg-amber-500 flex-shrink-1" />
      </div>
    </div>

    <div class="p-4 shadow-md">
      <h2 class="mb-4 text-xl font-bold">
        Sizable horizontal
      </h2>
      <sizable class="w-1/2 h-[500px] bg-[url('https://alpenfoto.com/files/splash/.cache/_DSC5020.webp@resize_1000_0.webp')] bg-cover" />
    </div>
  </div>

  <message-toast v-bind="toast" class="bg-success-700! text-white" @timeout="toast.active = false" @close="toast.active = false">
    <template #title>
      <span class="text-sucess-200">{{ toast.title }}</span>
    </template>
    <template #icon>
      <span class="text-success-200">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="size-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
      </span>
    </template>
  </message-toast>

  <Modal :show="modal.show" container-class="mx-4 w-full lg:w-1/2 xl:w-1/4" @clicked-outside="modal.show = false">
    <template #title>
      <div class="flex fixed justify-between items-center px-4 w-full h-16 bg-vxvue-500">
        <span class="text-xl font-bold text-white">A Modal</span>
        <a href="#" @click.prevent="modal.show = false"><x-mark-icon class="text-white size-5" /></a>
      </div>
    </template>
    <template #default>
      <div class="p-4 text-xl text-center">
        Something of importance might be said here.
      </div>
    </template>
  </Modal>

  <teleport to="body">
    <confirm
      ref="confirmDialog"
      :buttons="[
        { label: 'Go ahead!', value: true, class: 'py-2 px-4 bg-error-600 hover:bg-error-500 text-white rounded-md' },
        { label: 'Cancel', value: false, class: 'py-2 px-4 text-stone-700 hover:bg-stone-200 rounded-md' }
      ]"
    />
  </teleport>
</template>