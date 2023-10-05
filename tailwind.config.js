const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
    content: [
        './src/**/*.{vue,js,html}'
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                'vxvue': {
                    DEFAULT: 'var(--vxvue-color)',
                    '50': 'var(--vxvue-color-50)',
                    '100': 'var(--vxvue-color-100)',
                    '200': 'var(--vxvue-color-200)',
                    '300': 'var(--vxvue-color-300)',
                    '400': 'var(--vxvue-color-400)',
                    '500': 'var(--vxvue-color-500)',
                    '600': 'var(--vxvue-color-600)',
                    '700': 'var(--vxvue-color-700)',
                    '800': 'var(--vxvue-color-800)',
                    '900': 'var(--vxvue-color-900)',
                },
                'vxvue-alt': {
                    DEFAULT: 'var(--vxvue-highlight)',
                    '50': 'var(--vxvue-highlight-50)',
                    '100': 'var(--vxvue-highlight-100)',
                    '200': 'var(--vxvue-highlight-200)',
                    '300': 'var(--vxvue-highlight-300)',
                    '400': 'var(--vxvue-highlight-400)',
                    '500': 'var(--vxvue-highlight-500)',
                    '600': 'var(--vxvue-highlight-600)',
                    '700': 'var(--vxvue-highlight-700)',
                    '800': 'var(--vxvue-highlight-800)',
                    '900': 'var(--vxvue-highlight-900)',
                },
                success: 'var(--success-color)',
                error:  'var(--error-color)',
                warn:  'var(--warn-color)',
                info:  'var(--info-color)',
            },
            spacing: {
                sidebar: '32rem'
            }
        }
    },
    plugins: [
        require('@tailwindcss/forms')({strategy: 'class'}),
        require('@tailwindcss/typography')
    ],
}
