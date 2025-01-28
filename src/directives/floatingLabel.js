const floatingLabel = {
    mounted: (el, binding, vnode) => {
        const id = vnode.ctx.uid
        const div = document.createElement('div')
        div.classList.add('relative')

        const label = document.createElement('label')
        label.classList.add(...(
            'absolute px-2 left-1 top-2 scale-90 text-sm z-10 origin-[0] bg-white -translate-y-4 transform-gpu duration-200 ' +
            'peer-focus:text-blue-600 peer-focus:top-2 peer-focus:scale-90 peer-focus:-translate-y-4 ' +
            'peer-placeholder-shown:top-1/2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2').split(' '),
            binding.value.invalid ? 'text-error': null,
            el.getAttribute('required') ? 'required' : null
        )
        label.setAttribute('for', el.getAttribute('id') || (id + '-element'))
        label.innerHTML = binding.value.label || (id + '-label')

        el.classList.add('peer')
        el.setAttribute('placeholder', ' ')
        el.setAttribute('id', el.getAttribute('id') || (id + '-element'))

        el.parentElement.replaceChild(div, el)
        div.appendChild(el)
        div.appendChild(label)
    }
}
export default floatingLabel