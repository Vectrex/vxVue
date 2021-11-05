A few basic Vue components styled with Tailwind CSS.

The official Tailwind CSS forms plugin is used to provide basic styling of the form components using the class strategy which allows the styling of non-form elements consistently.
An easy to configure color theming is applied.

Run
```
npm install
```
and
```
npm run dev
```
and navigate to the reported URL by Vite.
```
http://localhost:3000
```
The sample page gives simple examples of all currently available components.

So far the following components have been implemented:

| element | description |
| --- | --- |
| `formelements/password-input` | a simple input with toggle button which toggles between `type='button'` and `type='text'` |
| `formelements/form-select` | a select element adapted for Vue.js integration
| `formelements/date-input` and `formelements/datepicker` | the input element can be used for guided date inputs and is (optionally) part of the datepicker
| `formelements/form-switch` | a fancy checkbox
| `formelements/form-radio-group` | as the name suggests - a group of related radio elements
| `formelements/form-checkbox-group` | a group of related checkbox elements; allows multiple selected options
| `sortable` | a sortable table; the column attribute specifies the columns and their sorting options
| `autocomplete` | a simple autocomplete component
| `message-toast` | displays a notification which dismisses itself after a configurable timeout
| `alert` | alert component which must be manually dismissed
