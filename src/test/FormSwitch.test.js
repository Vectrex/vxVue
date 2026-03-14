import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import FormSwitch from '../components/FormSwitch.vue'

describe('FormSwitch', () => {
    test('renders in the off state by default', () => {
        const wrapper = mount(FormSwitch, { attrs: { 'aria-label': 'Aria Label' }})
        const switchElement = wrapper.get('[role="switch"]')
        const input = wrapper.get('input[type="checkbox"]')

        expect(switchElement.attributes('aria-checked')).toBe('false')
        expect(switchElement.attributes('aria-disabled')).toBe('false')
        expect(input.element.checked).toBe(false)
    })

    test('renders in the on state when modelValue is true', () => {
        const wrapper = mount(FormSwitch, { props: { modelValue: true }, attrs: { 'aria-label': 'Aria Label' }})
        const switchElement = wrapper.get('[role="switch"]')
        const input = wrapper.get('input[type="checkbox"]')

        expect(switchElement.attributes('aria-checked')).toBe('true')
        expect(switchElement.attributes('aria-disabled')).toBe('false')
        expect(input.element.checked).toBe(true)
    })

    test('applies aria-label to the switch element', () => {
        const wrapper = mount(FormSwitch, { attrs: { 'aria-label': 'Aria Label' }})

        expect(wrapper.get('[role="switch"]').attributes('aria-label')).toBe('Aria Label')
    })

    test('forwards regular attributes to the input element', () => {
        const wrapper = mount(FormSwitch, { attrs: {
            name: 'my-switch',
            id: 'my-switch-id',
            disabled: false,
            'aria-label': 'Aria Label',
        }})
        const input = wrapper.get('input[type="checkbox"]')

        expect(input.attributes('name')).toBe('my-switch')
        expect(input.attributes('id')).toBe('my-switch-id')
        expect(input.attributes('aria-label')).toBeUndefined()
    })

    test('emits update:modelValue when the input is toggled', async () => {
        const wrapper = mount(FormSwitch, { props: { modelValue: false }, attrs: { 'aria-label': 'Aria Label' }})
        const input = wrapper.get('input[type="checkbox"]')
        await input.setValue(true)
        const emitted = wrapper.emitted('update:modelValue')

        expect(emitted).toBeTruthy()
        expect(emitted[0]).toEqual([true])
    })

    test('toggles when Enter is pressed', async () => {
        const wrapper = mount(FormSwitch, { props: { modelValue: false }, attrs: { 'aria-label': 'Aria Label' }})
        const switchElement = wrapper.get('[role="switch"]')
        await switchElement.trigger('keydown.enter')
        const emitted = wrapper.emitted('update:modelValue')

        expect(emitted).toBeTruthy()
        expect(emitted[0]).toEqual([true])
    })

    test('toggles when Space is pressed', async () => {
        const wrapper = mount(FormSwitch, { props: { modelValue: false }, attrs: { 'aria-label': 'Aria Label' }})
        const switchElement = wrapper.get('[role="switch"]')
        await switchElement.trigger('keydown.space')
        const emitted = wrapper.emitted('update:modelValue')

        expect(emitted).toBeTruthy()
        expect(emitted[0]).toEqual([true])
    })

    test('does not toggle when disabled', async () => {
        const wrapper = mount(FormSwitch, { props: { modelValue: false }, attrs: { disabled: '', 'aria-label': 'Aria Label' }})
        const switchElement = wrapper.get('[role="switch"]')

        expect(switchElement.attributes('aria-disabled')).toBe('true')
        expect(switchElement.attributes('tabindex')).toBe('-1')

        await switchElement.trigger('keydown.enter')
        await switchElement.trigger('keydown.space')

        expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    })
})