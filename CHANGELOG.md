## [v1.3.0]
- added two directives:
`v-focus` focuses an element upon mount
`v-floating-label` adds a floating label to a element (preferably input and textarea elements)

## [v1.2.1]
- updated Vite config to keep `style.css` as CSS file name

## [v1.2.0]
- updated to Tailwind CSS 4.x
- message toast component exposes a property to control the transition animation
 
## [v1.1.1]
- date-input component now honors a `disabled` attribute more thoroughly by also disabling the button elements of the component

## [v1.1.0]
- improved palette consistency with various components
- sortable component adds additional properties to allow custom CSS for thead and tbody elements; potentially breaks previous CSS customizations

## [v1.0.6]
- datepicker component allows the selection of multiple dates
- datepicker component adds additional props for better customizability and integration within other components

## [v1.0.5]
- refactor: pagination uses button elements instead of anchor elements; minor CSS updates

## [v1.0.4]
- fix: fast moving pointer won't reduce sizable to 0 width/height

## [v1.0.3]
- added sizable component

## [v1.0.2]
- slider emits `dragStart` and `dragStop` events

## [v1.0.1]
- message toasts can display a progress bar when combined with timeouts

## [v1.0.0]
Plenty of minor updates and bug fixes.

- form switch got a slot for the handle
- styling of form switch updated
- submit button can be disabled with a `disabled` attribute
- password input drops its superfluous slot, toggle button gets disabled when component is disabled
- autocomplete uses spinner component instead of its own SVG
- autocomplete drops unused properties and improves slot bindings
- rearranged slots in message toast
- slots of pagination component improved
- _appear_ animation added for modals and confirms
- simple tree uses `modelValue` for binding a selected branch
- styling of simple tree improved with larger toggles
- simple tree adds slots for toggles, labels and selected labels
- alignment of datepicker changed

## [v0.9.2]
- submit button dropped styling, theme attribute adds color presets with scoped CSS

## [v0.9.1]
- added the spinner component used by the submit button as standalone

## [v0.9.0]
- added a submit button component
 
## [v0.8.3]
- datepicker allows quick selection of years by clicking the year in the header
- colors and minimum width of datepicker fixed

## [v0.8.2] (0.8.1 skipped)
- accordion animation uses inline Tailwind customizing instead of Tailwind configuration

## [v0.8.0]
- Added an accordion component (and the accompanying accordion-panel child component)
- minor bug fixes
- requires Tailwind CSS 3.4+
 
## [v0.7.9] - 2024-01-11 (0.7.8 skipped)
- Fix: Vertical padding of pagination component improved to allow for easier alignment
- A disabled switch component is rendered in a different color 

## [v0.7.7] - 2024-01-01
- Fix: Custom colors did not observe alpha modifiers

## [v0.7.6] - 2023-12-31
- Fix: Slider can now handle negative min and max values

## [v0.7.5] - 2023-12-02
- Confirm parses either a value property of a button (truthy resolves, falsy rejects) or the index of button (first button resolves, second rejects)

## [v0.7.4] - 2023-11-15
- datepicker can now change year and month independently; in addition a `year-change` is emitted
- fix: a second click the toggle button of the datepicker doesn't hide the datepicker

## [v0.7.3] - 2023-11-13
- slider track can be clicked to set value

## [v0.7.2] - 2023-11-10
- slider component accepts a `disabled` attribute

## [v0.7.1] - 2023-11-09
- slider component accepts a `vertical` attribute

## [v0.7.0] - 2023-11-08
- slider component added

## [v0.6.5] - 2023-11-04
- sortable component has wrapper elements removed

## [v0.6.4] - 2023-10-19
- npm build fixes

## [v0.6.3] - 2023-10-19
- npm build fixes
 
## [v0.6.2] - 2023-10-18
- container element of autocomplete component inherits fallthrough attributes

## [v0.6.1] - 2023-10-17
- fix: modal component is not centered on small screen devices

## [v0.6.0] - 2023-10-16
- added modal component
- bugfixes

## [v0.5.1] - 2023-10-12
- examples added

## [v0.5.0] - 2023-10-11
- form file button component added 

## [v0.4.0] - 2023-10-10
- autocomplete component added

## [v0.3.0] - 2023-10-08
- npm build fixes

## [v0.2.0] - 2023-10-08
- added simple tree component
- added datepicker and date input components

## [v0.1.0] - 2023-10-05
Initial build with the following components
- confirm
- form select
- form switch
- message toast
- pagination
- password input
- sortable
- tabs
