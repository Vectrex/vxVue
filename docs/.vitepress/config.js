import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "vxVue",
  base: '/vxVue/',
  lang: "en-US",
  description: "vxVue documentation",
  themeConfig: {
    logo: { src: '/logo.svg', alt: 'vxVue Logo' },
    siteTitle: false,
    nav: [
      { text: 'Home', link: '/' },
    ],
    sidebar: [
      { text: "Getting Started", link: '/getting-started' },
      {
        text: 'Components',
        items: [
          { text: 'Accordion', link: '/components/accordion' },
          { text: 'Autocomplete', link: '/components/autocomplete' },
          { text: 'Confirm', link: '/components/confirm' },
          { text: 'DateInput', link: '/components/date-input' },
          { text: 'Datepicker', link: '/components/datepicker' },
          { text: 'FormFileButton', link: '/components/form-file-button' },
          { text: 'FormSelect', link: '/components/form-select' },
          { text: 'FormSwitch', link: '/components/form-switch' },
          { text: 'MessageToast', link: '/components/message-toast' },
          { text: 'Modal', link: '/components/modal' },
          { text: 'Pagination', link: '/components/pagination' },
          { text: 'PasswordInput', link: '/components/password-input' },
          { text: 'SimpleTree', link: '/components/simple-tree' },
          { text: 'Sizable', link: '/components/sizable' },
          { text: 'Slider', link: '/components/slider' },
          { text: 'Sortable', link: '/components/sortable' },
          { text: 'SubmitButton', link: '/components/submit-button' },
          { text: 'Tabs', link: '/components/tabs' },
        ]
      },
      {
        text: 'Directives',
        items: [
          { text: 'v-focus', link: '/directives/focus' },
          { text: 'v-floating-label', link: '/directives/floating-label' },
        ]
      }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/Vectrex/vxVue' },
      { icon: 'npm', link: 'https://npmjs.com/vx-vue' },
    ]
  }
})
