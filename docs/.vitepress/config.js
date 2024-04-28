import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "vxVue",
  description: "vxVue documentation",
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' }
    ],

    sidebar: [
      { text: "Getting Started", link: '/getting-started' },
      {
        text: 'Components',
        items: [
          { text: 'Accordion', link: '/accordion' },
          { text: 'FormFileButton', link: '/form-file-button' },
          { text: 'FormSelect', link: '/form-select' },
          { text: 'FormSwitch', link: '/form-switch' },
          { text: 'MessageToast', link: '/message-toast' },
          { text: 'Pagination', link: '/pagination' },
          { text: 'PasswordInput', link: '/password-input' },
          { text: 'Slider', link: '/slider' },
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
