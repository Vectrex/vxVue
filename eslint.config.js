import pluginVue from 'eslint-plugin-vue'

export default [
  ...pluginVue.configs['flat/recommended'],
  {
    ignores: ['docs/'],
    rules: {
      "vue/multi-word-component-names": "off",
      "vue/max-attributes-per-line": ["warn", {
        "singleline": {
          "max": 4
        },
        "multiline": {
          "max": 1
        }
      }]
    }
  }
];