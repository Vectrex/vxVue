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
          { text: 'Accordion', link: '/accordion' },
          { text: 'Autocomplete', link: '/autocomplete' },
          { text: 'Confirm', link: '/confirm' },
          { text: 'DateInput', link: '/date-input' },
          { text: 'Datepicker', link: '/datepicker' },
          { text: 'FormFileButton', link: '/form-file-button' },
          { text: 'FormSelect', link: '/form-select' },
          { text: 'FormSwitch', link: '/form-switch' },
          { text: 'MessageToast', link: '/message-toast' },
          { text: 'Modal', link: '/modal' },
          { text: 'Pagination', link: '/pagination' },
          { text: 'PasswordInput', link: '/password-input' },
          { text: 'SimpleTree', link: '/simple-tree' },
          { text: 'Sizable', link: '/sizable' },
          { text: 'Slider', link: '/slider' },
          { text: 'Sortable', link: '/sortable' },
          { text: 'SubmitButton', link: '/submit-button' },
          { text: 'Tabs', link: '/tabs' },
        ]
      }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/Vectrex/vxVue' },
      { icon: 'npm', link: 'https://npmjs.com/vx-vue' },
    ]
  }
})
