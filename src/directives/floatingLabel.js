const floatingLabel = {
    mounted: (el, binding) => {
        if (!['INPUT', 'TEXTAREA'].includes(el.nodeName)) {
            let child = el.querySelector('input:not([type]),input[type="text"],input[type="search"],input[type="email"],input[type="password"],input[type="url"],input[type="tel"]')
            if (!child) child = el.querySelector('textarea')
            el = child
        }
        if (!el) throw new Error ('VFloatingLabel directive: No valid INPUT or TEXTAREA element found.')
        if (el.querySelector('label')) throw new Error ('VFloatingLabel directive: LABEL element found.')

        const id = Math.random().toString(36).substring(2)
        const div = document.createElement('div')
        div.classList.add('relative')
        const label = document.createElement('label')
        label.classList.add(
            ...'absolute px-2 left-1 top-2 scale-90 text-sm z-10 origin-[0] bg-white -translate-y-4 transform-gpu duration-200'.split(' '),
            ...'peer-focus:top-2 peer-focus:scale-90 peer-focus:-translate-y-full'.split(' '),
            ...'peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2'.split(' '),
            el.nodeName === 'TEXTAREA' ? 'peer-placeholder-shown:top-4' : 'peer-placeholder-shown:top-1/2'
        )
        binding.value?.invalid ? label.classList.add('text-error', 'peer-focus:text-error') : label.classList.add('peer-focus:text-blue-600')
        if (el.getAttribute('required') !== null) label.classList.add('required')

        label.setAttribute('for', el.getAttribute('id') || (id + '-element'))
        label.innerHTML = binding.value?.label || el.getAttribute('placeholder') || (id + '-label')

        el.classList.add('peer')
        el.setAttribute('placeholder', ' ')
        el.setAttribute('id', el.getAttribute('id') || (id + '-element'))

        el.parentElement.replaceChild(div, el)
        div.appendChild(el)
        div.appendChild(label)
    },
    updated: (el, binding) => {
        const label = el.parentNode.querySelector('label')
        const placeholder = el.getAttribute('placeholder').trim()
        label.innerHTML = binding.value?.label || placeholder || label.innerHTML
        if (placeholder) el.setAttribute('placeholder', ' ')
        if (binding.value?.invalid) {
            label.classList.add('text-error', 'peer-focus:text-error')
            label.classList.remove('peer-focus:text-blue-600')
        }
        else {
            label.classList.remove('text-error', 'peer-focus:text-error')
            label.classList.add('peer-focus:text-blue-600')
        }
        label.classList[el.getAttribute('required') !== null ? 'add' : 'remove']('required')
    },
    beforeUnmount: el => el.parentNode.parentNode.removeChild(el.parentNode)
}
export default floatingLabel