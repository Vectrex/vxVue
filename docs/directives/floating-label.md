<script setup>
    import vFloatingLabel from '../../src/directives/floatingLabel.js'
</script>

# v-floating-label

This directive uses either the `placeholder` attribute or the `label` property of directive binding.
The binding value will also observe an `invalid` property of the binding and a `required` attribute. It can only be attached to
`input` element types which allow a `placeholder` (i.e. type is `text`, `search`, `email`, `password` ,`url` or `tel`) attribute or `textarea`s or a component wrapping such an element. In this case no `label` element must be a child element of this component.

## Examples

Input element using the placeholder attribute.

```html
    <input v-floating-label placeholder="Type something..." />
```
::: info Result
<input class="p-1! border! border-black! bg-white!" v-floating-label placeholder="Type something..." />
:::

Input element using the label property of the directive binding and rendering the label as required.

```html
    <input v-floating-label="{ label: 'Your name, please' }" required />
```
::: info Result
<input class="p-1! border! border-black! bg-white!" v-floating-label="{ label: 'Your name, please' }" required />
:::

Styling of the label of a required element is left to you. In this specific case a
```css
@layer utilities {
    .required {
        @apply font-bold after:content-['*'];
    }
}
```
was used.

Textarea using the placeholder attribute.

```html
    <textarea v-floating-label placeholder="Leave a comment" />
```
::: info Result
<textarea class="p-1! border! border-black! bg-white!" v-floating-label placeholder="Leave a comment"></textarea>
:::