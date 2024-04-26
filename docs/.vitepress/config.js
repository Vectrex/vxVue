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
          { text: 'Form Switch', link: '/form-switch' },
          { text: 'Slider', link: '/slider' },
          { text: 'Submit Button', link: '/submit-button' },
        ]
      }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/Vectrex/vxVue' },
      { icon: 'npm', link: 'https://npmjs.com/vx-vue' },
    ]
  }
})
