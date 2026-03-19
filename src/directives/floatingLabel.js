const FLOATING_LABEL_REF = Symbol('floatingLabelRef')

function resolveTarget (el) {
    if (el.nodeName === 'INPUT' || el.nodeName === 'TEXTAREA') return el
    return el.querySelector([
        'input:not([type])',
        'input[type="text"]',
        'input[type="search"]',
        'input[type="email"]',
        'input[type="password"]',
        'input[type="url"]',
        'input[type="tel"]',
    ].join(',')) || el.querySelector('textarea')
}
function updateInvalidState(label, invalid) {
    label.classList.toggle('text-error', !!invalid)
    label.classList.toggle('peer-focus:text-error', !!invalid)
    label.classList.toggle('peer-focus:text-blue-600', !invalid)
}
function updateRequiredState(el, label) {
    label.classList.toggle('required', el.hasAttribute('required'))
}
const floatingLabel = {
    mounted: (el, binding) => {
        const target = resolveTarget(el)
        if (!target || el.labels?.length) return

        const id = crypto.randomUUID()
        const elementId = target.getAttribute('id') || (id + '-element')
        const wrapper = document.createElement('div')
        wrapper.classList.add('relative', 'isolate')
        const label = document.createElement('label')
        label.classList.add(
            'absolute',
            'px-2',
            'left-1',
            'top-2',
            'scale-90',
            'text-sm',
            'z-(--zIndex-label)',
            'origin-left',
            'bg-white',
            '-translate-y-4',
            'transform-gpu',
            'duration-200',
            'peer-focus:top-3',
            'peer-focus:scale-90',
            'peer-focus:-translate-y-full',
            'peer-placeholder-shown:scale-100',
            'peer-placeholder-shown:-translate-y-1/2',
            target.nodeName === 'TEXTAREA' ? 'peer-placeholder-shown:top-4' : 'peer-placeholder-shown:top-1/2',
        )

        updateInvalidState(label, binding.value?.invalid)
        updateRequiredState(target, label)

        const originalPlaceholder = target.getAttribute('placeholder') || ''
        label.setAttribute('for', elementId)
        label.textContent = binding.value?.label || originalPlaceholder || ''

        target.dataset.floatingOriginalLabel = originalPlaceholder
        target.classList.add('peer')
        target.setAttribute('placeholder', ' ')
        target.setAttribute('id', elementId)

        target.parentElement.replaceChild(wrapper, target)
        wrapper.appendChild(target)
        wrapper.appendChild(label)
        target[FLOATING_LABEL_REF] = label
    },
    updated: (el, binding) => {
        const target = resolveTarget(el)
        const label = target?.[FLOATING_LABEL_REF]
        if (!label || !target) return
        label.textContent = binding.value?.label || target.dataset.floatingOriginalLabel || ''

        // ensure a semi-empty placeholder is set so that the label is not hidden when the input is empty

        target.setAttribute('placeholder', ' ')

        updateInvalidState(label, binding.value?.invalid)
        updateRequiredState(target, label)
    },
    beforeUnmount: el => {
        const target = resolveTarget(el)
        if (target?.[FLOATING_LABEL_REF]) delete target[FLOATING_LABEL_REF]
    }
}
export default floatingLabel