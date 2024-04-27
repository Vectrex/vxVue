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
          { text: 'FormSelect', link: '/form-select' },
          { text: 'FormSwitch', link: '/form-switch' },
          { text: 'PasswordInput', link: '/password-input' },
          { text: 'Slider', link: '/slider' },
          { text: 'SubmitButton', link: '/submit-button' },
        ]
      }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/Vectrex/vxVue' },
      { icon: 'npm', link: 'https://npmjs.com/vx-vue' },
    ]
  }
})
