import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "vxVue",
  description: "vxVue documentation",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' }
    ],

    sidebar: [
      {
        text: 'Components',
        items: [
          { text: 'Form Switch', link: '/form-switch' },
          { text: 'Slider', link: '/slider' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Vectrex/vxVue' }
    ]
  }
})
