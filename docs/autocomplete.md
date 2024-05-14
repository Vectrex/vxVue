<script setup>
    import Autocomplete from "../src/components/autocomplete.vue"
    import { ref } from "vue"
    const pickedItem = ref(null)
    const items = ["Afghanistan", "Åland Islands", "Albania", "Algeria", "American Samoa", "Andorra", "Angola", "Anguilla", "Antarctica", "Antigua and Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia, Plurinational State of", "Bonaire, Sint Eustatius and Saba", "Bosnia and Herzegovina", "Botswana", "Bouvet Island", "Brazil", "British Indian Ocean Territory", "Brunei Darussalam", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Central African Republic", "Chad", "Chile", "China", "Christmas Island", "Cocos (Keeling) Islands", "Colombia", "Comoros", "Congo", "Congo, the Democratic Republic of the", "Cook Islands", "Costa Rica", "Côte d'Ivoire", "Croatia", "Cuba", "Curaçao", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Falkland Islands (Malvinas)", "Faroe Islands", "Fiji", "Finland", "France", "French Guiana", "French Polynesia", "French Southern Territories", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guadeloupe", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Heard Island and McDonald Islands", "Holy See (Vatican City State)", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran, Islamic Republic of", "Iraq", "Ireland", "Isle of Man", "Israel", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, Democratic People's Republic of", "Korea, Republic of", "Kuwait", "Kyrgyzstan", "Lao People's Democratic Republic", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macao", "Macedonia, the Former Yugoslav Republic of", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Martinique", "Mauritania", "Mauritius", "Mayotte", "Mexico", "Micronesia, Federated States of", "Moldova, Republic of", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Niue", "Norfolk Island", "Northern Mariana Islands", "Norway", "Oman", "Pakistan", "Palau", "Palestine, State of", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Pitcairn", "Poland", "Portugal", "Puerto Rico", "Qatar", "Réunion", "Romania", "Russian Federation", "Rwanda", "Saint Barthélemy", "Saint Helena, Ascension and Tristan da Cunha", "Saint Kitts and Nevis", "Saint Lucia", "Saint Martin (French part)", "Saint Pierre and Miquelon", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Sint Maarten (Dutch part)", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Georgia and the South Sandwich Islands", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Svalbard and Jan Mayen", "Swaziland", "Sweden", "Switzerland", "Syrian Arab Republic", "Taiwan, Province of China", "Tajikistan", "Tanzania, United Republic of", "Thailand", "Timor-Leste", "Togo", "Tokelau", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks and Caicos Islands", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "United States Minor Outlying Islands", "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela, Bolivarian Republic of", "Viet Nam", "Virgin Islands, British", "Virgin Islands, U.S.", "Wallis and Futuna", "Western Sahara", "Yemen", "Zambia", "Zimbabwe"]
    const findItem = async query => {
        await new Promise(resolve => setTimeout(resolve, 500));
        return items.filter(item => item.toLowerCase().indexOf(query.toLowerCase()) !== -1)
    }
    const pickedObj = ref(null)
    const autocompleteQuery = ref('')
    const itemObjs = [
        { country: "Austria", capital: "Vienna", pop: 8901064 },
        { country: "France", capital: "Paris", pop: 67391582 },
        { country: "Germany", capital: "Berlin", pop: 83166711 },
        { country: "Italy", capital: "Rome", pop: 59554023 },
        { country: "Spain", capital: "Madrid", pop: 47332614 },
        { country: "Portugal", capital: "Lisbon", pop: 10295909 },
        { country: "Belgium", capital: "Brussels", pop: 11524454 },
        { country: "Netherlands", capital: "Amsterdam", pop: 17407585 },
        { country: "Sweden", capital: "Stockholm", pop: 10365705 },
        { country: "Norway", capital: "Oslo", pop: 5465630 },
        { country: "Denmark", capital: "Copenhagen", pop: 5831404 },
        { country: "Finland", capital: "Helsinki", pop: 5542517 },
        { country: "Poland", capital: "Warsaw", pop: 38028278 },
        { country: "Czech Republic", capital: "Prague", pop: 10724555 },
        { country: "Hungary", capital: "Budapest", pop: 9606316 },
        { country: "Greece", capital: "Athens", pop: 10423054 },
        { country: "Bulgaria", capital: "Sofia", pop: 6951482 },
        { country: "Romania", capital: "Bucharest", pop: 19186201 },
        { country: "Switzerland", capital: "Bern", pop: 8632703 },
        { country: "Ireland", capital: "Dublin", pop: 4982904 }
    ]
    const findObj = async query => {
        await new Promise(resolve => setTimeout(resolve, 500));
        return itemObjs.filter(item => item.country.toLowerCase().indexOf(query.toLowerCase()) !== -1)
    }
</script>

# Autocomplete

## Default Component
Apart from the required props only some basic styling is applied. 

::: code-group
```js
const pickedItem = ref(null)
const items = ["Afghanistan", "Åland Islands",... "Zambia", "Zimbabwe"]
const findItem = async query => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return items.filter(item => item.toLowerCase().indexOf(query.toLowerCase()) !== -1)
}
```
```html
<autocomplete
    :search="findItem"
    v-model="pickedItem"
    placeholder="pick a country"
    class="w-full"
    result-item-class="py-2 px-4 cursor-pointer hover:bg-gray-200"
    result-list-class="overflow-auto max-h-96 bg-white shadow-md"
/>
```
::: info Result
<autocomplete
    :search="findItem"
    v-model="pickedItem"
    placeholder="pick a country"
    class="w-full"
    result-item-class="py-2 px-4 cursor-pointer hover:bg-gray-200"
    result-list-class="overflow-auto max-h-96 bg-white shadow-md"
    auto-select
/>
:::

## Component with Complex Items

::: code-group
```js
const pickedObj = ref(null)
const autocompleteQuery = ref('')
const itemObjs = [
    { country: "Austria", capital: "Vienna", pop: 8901064 },
    ...
    { country: "Ireland", capital: "Dublin", pop: 4982904 }
]
const findObj = async query => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return itemObjs.filter(item => item.country.toLowerCase().indexOf(query.toLowerCase()) !== -1)
}
```
```html
<autocomplete
    v-model="autocompleteQuery"
    :search="findObj"
    :get-result-value="result => result.country"
    placeholder="pick a country"
    class="w-full"
    result-list-class="overflow-auto max-h-96 bg-white shadow-md"
    result-item-class="py-2 px-4 cursor-pointer hover:bg-vxvue-50"
    @submit="autocompleteQuery = $event.country; pickedObj = $event"
>
    <template #result="slotProps">
        <div v-bind="slotProps.props">
            <div class="font-bold">{{ slotProps.result.country }}</div>
            <div class="text-sm">{{ slotProps.result.capital }}, pop {{ new Intl.NumberFormat('en-US', { maximumSignificantDigits: 3 }).format(slotProps.result.pop / 1e6) }}m</div>
        </div>
    </template>
</autocomplete>
```
::: info Result
<div>Selected object: <em>{{ pickedObj }}</em></div>
<autocomplete
    v-model="autocompleteQuery"
    :search="findObj"
    :get-result-value="result => result.country"
    placeholder="pick a country"
    class="w-full"
    result-list-class="overflow-auto max-h-96 bg-white shadow-md"
    result-item-class="py-2 px-4 cursor-pointer hover:bg-vxvue-50"
    @submit="autocompleteQuery = $event.country; pickedObj = $event"
>
<template #result="slotProps">
    <div v-bind="slotProps.props">
        <div class="font-bold">{{ slotProps.result.country }}</div>
        <div class="text-sm">{{ slotProps.result.capital }}, pop {{ new Intl.NumberFormat('en-US', { maximumSignificantDigits: 3 }).format(slotProps.result.pop / 1e6) }}m</div>
    </div>
</template>
</autocomplete>
:::

## Properties
| Name               | Type       | Default              | Description |
|--------------------|------------|----------------------|-------------|
| `modelValue`       | `String`   |                      |             |
| `search`           | `Function` |                      |             |
| `baseClass`        | `String`   | 'vxvue-autocomplete' |             |
| `resultListClass`  | `String`   | 'result-list'        |             |
| `resultItemClass`  | `String`   | 'result-list-item'   |             |
| `inputClass`       | `String`   | 'autocomplete-input' |             |
| `getResultValue`   | `Function` | result => result     |             |
| `autoSelect`       | `Boolean`  |                      |             |

## Events
| Name                | Arguments            | Description                                                             |
|---------------------|----------------------|-------------------------------------------------------------------------|
| `update:modelValue` | `inputString` String | emitted when the `change` event of the input element fires              |
| `blur`              |                      | emitted when the input element loses the focus                          |
| `submit`            | `pickedItem` Mixed   | fires when an item from the list is selected (by click or via keyboard) |

## Slots
| Name     | Scoped | Description |
|----------|--------|-------------|
| `result` |        |             |
