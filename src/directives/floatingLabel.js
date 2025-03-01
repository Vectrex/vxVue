const floatingLabel = {
    mounted: (el, binding) => {
        const id = Math.random().toString(36).substring(2)
        const div = document.createElement('div')
        div.classList.add('relative')
        const label = document.createElement('label')
        label.classList.add(
            'absolute', 'px-2', 'left-1', 'top-2', 'scale-90', 'text-sm', 'z-10', 'origin-[0]', 'bg-white', '-translate-y-4', 'transform-gpu', 'duration-200',
            'peer-focus:text-blue-600', 'peer-focus:top-2', 'peer-focus:scale-90', 'peer-focus:-translate-y-full',
            'peer-placeholder-shown:scale-100', 'peer-placeholder-shown:-translate-y-1/2',
            el.nodeName === 'TEXTAREA' ? 'peer-placeholder-shown:top-4' : 'peer-placeholder-shown:top-1/2'
        )
        if (binding.value?.invalid) label.classList.add('text-error')
        if (el.getAttribute('required') !== null) label.classList.add('required')

        label.setAttribute('for', el.getAttribute('id') || (id + '-element'))
        label.innerHTML = binding.value?.label || el.getAttribute('placeholder') || (id + '-label')

        el.classList.add('peer')
        el.setAttribute('placeholder', ' ')
        el.setAttribute('id', el.getAttribute('id') || (id + '-element'))

        el.parentElement.replaceChild(div, el)
        div.appendChild(el)
        div.appendChild(label)
    }
}
export default floatingLabel