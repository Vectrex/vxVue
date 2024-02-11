const defaultTheme = require('tailwindcss/defaultTheme');

export default {
    content: [
        './src/**/*.{vue,js,html}',
        './index.html'
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                'vxvue': {
                    DEFAULT: 'rgb(var(--vxvue-color))',
                    '50': 'rgb(var(--vxvue-color-50))',
                    '100': 'rgb(var(--vxvue-color-100))',
                    '200': 'rgb(var(--vxvue-color-200))',
                    '300': 'rgb(var(--vxvue-color-300))',
                    '400': 'rgb(var(--vxvue-color-400))',
                    '500': 'rgb(var(--vxvue-color-500))',
                    '600': 'rgb(var(--vxvue-color-600))',
                    '700': 'rgb(var(--vxvue-color-700))',
                    '800': 'rgb(var(--vxvue-color-800))',
                    '900': 'rgb(var(--vxvue-color-900))',
                },
                'vxvue-alt': {
                    DEFAULT: 'rgb(var(--vxvue-highlight))',
                    '50': 'rgb(var(--vxvue-highlight-50))',
                    '100': 'rgb(var(--vxvue-highlight-100))',
                    '200': 'rgb(var(--vxvue-highlight-200))',
                    '300': 'rgb(var(--vxvue-highlight-300))',
                    '400': 'rgb(var(--vxvue-highlight-400))',
                    '500': 'rgb(var(--vxvue-highlight-500))',
                    '600': 'rgb(var(--vxvue-highlight-600))',
                    '700': 'rgb(var(--vxvue-highlight-700))',
                    '800': 'rgb(var(--vxvue-highlight-800))',
                    '900': 'rgb(var(--vxvue-highlight-900))',
                },
                success: {
                    DEFAULT: 'rgb(var(--success-color))',
                    '50': 'rgb(var(--success-color-50))',
                    '100': 'rgb(var(--success-color-100))',
                    '200': 'rgb(var(--success-color-200))',
                    '300': 'rgb(var(--success-color-300))',
                    '400': 'rgb(var(--success-color-400))',
                    '500': 'rgb(var(--success-color-500))',
                    '600': 'rgb(var(--success-color-600))',
                    '700': 'rgb(var(--success-color-700))',
                    '800': 'rgb(var(--success-color-800))',
                    '900': 'rgb(var(--success-color-900))',
                    '950': 'rgb(var(--success-color-950))',
                },
                error: {
                    DEFAULT: 'rgb(var(--error-color))',
                    '50': 'rgb(var(--error-color-50))',
                    '100': 'rgb(var(--error-color-100))',
                    '200': 'rgb(var(--error-color-200))',
                    '300': 'rgb(var(--error-color-300))',
                    '400': 'rgb(var(--error-color-400))',
                    '500': 'rgb(var(--error-color-500))',
                    '600': 'rgb(var(--error-color-600))',
                    '700': 'rgb(var(--error-color-700))',
                    '800': 'rgb(var(--error-color-800))',
                    '900': 'rgb(var(--error-color-900))',
                    '950': 'rgb(var(--error-color-950))',
                },
                warn: {
                    DEFAULT: 'rgb(var(--warn-color))',
                    '50': 'rgb(var(--warn-color-50))',
                    '100': 'rgb(var(--warn-color-100))',
                    '200': 'rgb(var(--warn-color-200))',
                    '300': 'rgb(var(--warn-color-300))',
                    '400': 'rgb(var(--warn-color-400))',
                    '500': 'rgb(var(--warn-color-500))',
                    '600': 'rgb(var(--warn-color-600))',
                    '700': 'rgb(var(--warn-color-700))',
                    '800': 'rgb(var(--warn-color-800))',
                    '900': 'rgb(var(--warn-color-900))',
                    '950': 'rgb(var(--warn-color-950))',
                },
                info: {
                    DEFAULT: 'rgb(var(--info-color))',
                    '50': 'rgb(var(--info-color-50))',
                    '100': 'rgb(var(--info-color-100))',
                    '200': 'rgb(var(--info-color-200))',
                    '300': 'rgb(var(--info-color-300))',
                    '400': 'rgb(var(--info-color-400))',
                    '500': 'rgb(var(--info-color-500))',
                    '600': 'rgb(var(--info-color-600))',
                    '700': 'rgb(var(--info-color-700))',
                    '800': 'rgb(var(--info-color-800))',
                    '900': 'rgb(var(--info-color-900))',
                    '950': 'rgb(var(--info-color-950))',
                },
            }
        }
    },
    plugins: [
        require('@tailwindcss/forms')({strategy: 'class'})
    ],
}
