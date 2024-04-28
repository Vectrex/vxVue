<script setup>
    import Pagination from "../src/components/pagination.vue"
    import { computed, ref } from "vue"

    const items = ["Afghanistan", "Åland Islands", "Albania", "Algeria", "American Samoa", "Andorra", "Angola", "Anguilla", "Antarctica", "Antigua and Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia, Plurinational State of", "Bonaire, Sint Eustatius and Saba", "Bosnia and Herzegovina", "Botswana", "Bouvet Island", "Brazil", "British Indian Ocean Territory", "Brunei Darussalam", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Central African Republic", "Chad", "Chile", "China", "Christmas Island", "Cocos (Keeling) Islands", "Colombia", "Comoros", "Congo", "Congo, the Democratic Republic of the", "Cook Islands", "Costa Rica", "Côte d'Ivoire", "Croatia", "Cuba", "Curaçao", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Falkland Islands (Malvinas)", "Faroe Islands", "Fiji", "Finland", "France", "French Guiana", "French Polynesia", "French Southern Territories", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guadeloupe", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Heard Island and McDonald Islands", "Holy See (Vatican City State)", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran, Islamic Republic of", "Iraq", "Ireland", "Isle of Man", "Israel", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, Democratic People's Republic of", "Korea, Republic of", "Kuwait", "Kyrgyzstan", "Lao People's Democratic Republic", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macao", "Macedonia, the Former Yugoslav Republic of", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Martinique", "Mauritania", "Mauritius", "Mayotte", "Mexico", "Micronesia, Federated States of", "Moldova, Republic of", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Niue", "Norfolk Island", "Northern Mariana Islands", "Norway", "Oman", "Pakistan", "Palau", "Palestine, State of", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Pitcairn", "Poland", "Portugal", "Puerto Rico", "Qatar", "Réunion", "Romania", "Russian Federation", "Rwanda", "Saint Barthélemy", "Saint Helena, Ascension and Tristan da Cunha", "Saint Kitts and Nevis", "Saint Lucia", "Saint Martin (French part)", "Saint Pierre and Miquelon", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Sint Maarten (Dutch part)", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Georgia and the South Sandwich Islands", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Svalbard and Jan Mayen", "Swaziland", "Sweden", "Switzerland", "Syrian Arab Republic", "Taiwan, Province of China", "Tajikistan", "Tanzania, United Republic of", "Thailand", "Timor-Leste", "Togo", "Tokelau", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks and Caicos Islands", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "United States Minor Outlying Islands", "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela, Bolivarian Republic of", "Viet Nam", "Virgin Islands, British", "Virgin Islands, U.S.", "Wallis and Futuna", "Western Sahara", "Yemen", "Zambia", "Zimbabwe"]
    const page = ref(1)
    const itemsPerPage = 10
    const paginatedItems = computed(() => items.slice((page.value - 1) * itemsPerPage, page.value * itemsPerPage))

</script>

# Pagination

The component only handles the rendering of the pagination element. The display of the paginated elements (like table rows) (depending on the `page` property) must be dealt with separately. 

## Default Component
::: code-group
```js
const items = ["Afghanistan", "Åland Islands", ... , "Yemen", "Zambia", "Zimbabwe"]
const page = ref(1)
const itemsPerPage = 10
const paginatedItems = computed(() => items.slice((page.value - 1) * itemsPerPage, page.value * itemsPerPage))
```
```html
<pagination
    v-model:page="page"
    :per-page="itemsPerPage"
    :total="items.length"
/>
<ul>
    <li v-for="item in paginatedItems">{{ item }}</li>
</ul>

```
:::
::: info Result
<pagination :total="items.length" v-model:page="page" :per-page="itemsPerPage" />
<ul><li v-for="item in paginatedItems">{{ item }}</li></ul>
:::

# Have Marker Position Below Page Numbers
```html
<pagination
    v-model:page="page"
    :per-page="itemsPerPage"
    :total="items.length"
    marker-position="below"
/>
<ul>
    <li v-for="item in paginatedItems">{{ item }}</li>
</ul>

```
::: info Result
<pagination :total="items.length" v-model:page="page" :per-page="itemsPerPage" marker-position="below" />
<ul><li v-for="item in paginatedItems">{{ item }}</li></ul>
:::

# Hide Navigation Buttons and Display All Pages
```html
<pagination
    v-model:page="page"
    :per-page="itemsPerPage"
    :total="items.length"
    :show-nav-buttons="false"
    :show-all-pages="true"
/>
<ul>
    <li v-for="item in paginatedItems">{{ item }}</li>
</ul>

```
::: info Result
<div class="overflow-x-auto py-2">
<pagination :total="items.length" v-model:page="page" :per-page="itemsPerPage" :show-nav-buttons="false" :show-all-pages="true" />
</div>
<ul><li v-for="item in paginatedItems">{{ item }}</li></ul>
:::

## Properties
| Name             | Type               | Default  | Description                                                                  |
|------------------|--------------------|----------|------------------------------------------------------------------------------|
| `page`           | `Number`           | 1        | determines which page index is selected                                      |
| `total`          | `Number`           | 1        | the number of total items which are paginated                                |
| `perPage`        | `Number`           | 20       | number of items displayed per page                                           |
| `markerPosition` | `above` or `below` | above    | An array of objects determining the appearance and interactivity of each tab |
| `showNavButtons` | `Boolean`          | true     | Determines whether a "previous" and "next" button will be provided           |
| `prevText`       | `String`           | previous | Label of the "previous" button                                               |
| `nextText`       | `String`           | next     | Label of the "next" button                                                   |

## Events
| Name          | Arguments       | Description                                                            |
|---------------|-----------------|------------------------------------------------------------------------|
| `update:page` | `page` - Number | Emitted when a page index or the "previous"/"next" buttons are clicked |
