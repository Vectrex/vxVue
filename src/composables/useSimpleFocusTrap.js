import { watch, nextTick, onBeforeUnmount } from 'vue'

export function useSimpleFocusTrap(containerRef, isActive, options = {}) {
    const {
        restoreFocus = true,
        focusFirstElement = true,
        closeOnEscape = false,
        onEscape = null,
    } = options

    let lastFocusedElement = null

    const getFocusableElements = () => focusFirstElement && containerRef.value?.querySelectorAll('a[href],button,textarea,input,select,details,summary,[tabindex]:not([tabindex="-1"])') || []

    const handleKeydown = e => {
        if (!isActive.value) return

        if (closeOnEscape && e.key === 'Escape') {
            onEscape?.()
            return
        }

        if (e.key !== 'Tab') return

        const focusable = getFocusableElements()
        if (!focusable.length) return

        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (e.shiftKey) {
            if (document.activeElement === first) {
                e.preventDefault()
                last.focus()
            }
        } else {
            if (document.activeElement === last) {
                e.preventDefault()
                first.focus()
            }
        }
    }

    const activate = async () => {
        lastFocusedElement = document.activeElement
        await nextTick()
        const focusable = getFocusableElements()
        focusable[0] ? focusable[0].focus() : containerRef.value?.focus()
        document.addEventListener('keydown', handleKeydown)
    }

    const deactivate = () => {
        document.removeEventListener('keydown', handleKeydown)
        if (restoreFocus) { lastFocusedElement?.focus?.() }
        lastFocusedElement = null
    }

    watch(isActive, active => active ? activate() : deactivate(), { immediate: true })

    onBeforeUnmount(() => deactivate())

    return { activate, deactivate }
}