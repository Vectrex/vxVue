<script setup>
  import PasswordInput from "./components/password-input.vue"
  import FormSelect from "./components/form-select.vue"
  import Autocomplete from "./components/autocomplete.vue"
  import FormSwitch  from "./components/form-switch.vue"
  import Tabs from "./components/tabs.vue"
  import Sortable from "./components/sortable.vue"
  import FormFileButton from "./components/form-file-button.vue"

  import { ref } from "vue"

  const form = ref({ pw: '', switch: false, formSelect: null, files: [] })
  const autocomplete = ref({ selected: null })
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


  const items = ["Afghanistan", "Åland Islands", "Albania", "Algeria", "American Samoa", "Andorra", "Angola", "Anguilla", "Antarctica", "Antigua and Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia, Plurinational State of", "Bonaire, Sint Eustatius and Saba", "Bosnia and Herzegovina", "Botswana", "Bouvet Island", "Brazil", "British Indian Ocean Territory", "Brunei Darussalam", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Central African Republic", "Chad", "Chile", "China", "Christmas Island", "Cocos (Keeling) Islands", "Colombia", "Comoros", "Congo", "Congo, the Democratic Republic of the", "Cook Islands", "Costa Rica", "Côte d'Ivoire", "Croatia", "Cuba", "Curaçao", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Falkland Islands (Malvinas)", "Faroe Islands", "Fiji", "Finland", "France", "French Guiana", "French Polynesia", "French Southern Territories", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guadeloupe", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Heard Island and McDonald Islands", "Holy See (Vatican City State)", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran, Islamic Republic of", "Iraq", "Ireland", "Isle of Man", "Israel", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, Democratic People's Republic of", "Korea, Republic of", "Kuwait", "Kyrgyzstan", "Lao People's Democratic Republic", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macao", "Macedonia, the Former Yugoslav Republic of", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Martinique", "Mauritania", "Mauritius", "Mayotte", "Mexico", "Micronesia, Federated States of", "Moldova, Republic of", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Niue", "Norfolk Island", "Northern Mariana Islands", "Norway", "Oman", "Pakistan", "Palau", "Palestine, State of", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Pitcairn", "Poland", "Portugal", "Puerto Rico", "Qatar", "Réunion", "Romania", "Russian Federation", "Rwanda", "Saint Barthélemy", "Saint Helena, Ascension and Tristan da Cunha", "Saint Kitts and Nevis", "Saint Lucia", "Saint Martin (French part)", "Saint Pierre and Miquelon", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Sint Maarten (Dutch part)", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Georgia and the South Sandwich Islands", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Svalbard and Jan Mayen", "Swaziland", "Sweden", "Switzerland", "Syrian Arab Republic", "Taiwan, Province of China", "Tajikistan", "Tanzania, United Republic of", "Thailand", "Timor-Leste", "Togo", "Tokelau", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks and Caicos Islands", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "United States Minor Outlying Islands", "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela, Bolivarian Republic of", "Viet Nam", "Virgin Islands, British", "Virgin Islands, U.S.", "Wallis and Futuna", "Western Sahara", "Yemen", "Zambia", "Zimbabwe"]
  const findItem = async query => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return items.filter(item => item.toLowerCase().indexOf(query.toLowerCase()) !== -1)
  }
</script>

<template>
  <div class="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4 max-w-screen-2xl mx-auto pt-28 md:pt-32">
    <div class="p-4 shadow-md space-y-2">
      <div><password-input v-model="form.pw" class="w-full" /></div>
      <div><autocomplete
          :search="findItem"
          v-model="autocomplete.selected"
          placeholder="pick a country"
          @submit=""
          class="w-full"
          result-item-class="py-2 px-4 cursor-pointer hover:bg-gray-200"
          result-list-class="shadow-md bg-white max-h-96 overflow-auto"
      /></div>
      <div><form-switch v-model="form.switch" /></div>
      <div><form-select class="w-full" id="form-select" v-model="form.formSelect" :options="['Please', 'Select', 'Me']" disabled-label="(Pick an option)" /></div>
      <div><form-file-button id="form-file-button" v-model="form.files" multiple="multiple" role="button" class="py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-vxvue hover:bg-vxvue-600 block text-center">Pick Files</form-file-button></div>
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
</template>