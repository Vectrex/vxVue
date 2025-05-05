import pluginVue from 'eslint-plugin-vue'
import stylistic from '@stylistic/eslint-plugin'

export default [
  ...pluginVue.configs['flat/recommended'],
  ...stylistic.configs.recommended,
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