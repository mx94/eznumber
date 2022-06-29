module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:vue/recommended', 'prettier'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    baseApiurl: 'readonly',
    baseMainurl: 'readonly',
    baseAssetApiurl: 'readonly',
    responseWrap: 'readonly',
    errorResponse: 'readonly',
    cache: 'readonly',
    log: 'readonly',
    contractApi: 'readonly',
    baseNewApiurl: 'readonly',
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': 0,
    'vue/max-attributes-per-line': [
      1,
      {
        singleline: 5,
        multiline: {
          max: 1,
          allowFirstLine: false,
        },
      },
    ],
    'vue/html-indent': 'off',
    'vue/attributes-order': 'off',
    'vue/html-closing-bracket-newline': 'off',
    'vue/mustache-interpolation-spacing': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'vue/no-v-html': 'off',
    'vue/order-in-components': 'off',
    'vue/html-self-closing': 'off',
    'no-unused-vars': [2, { vars: 'all', args: 'none', ignoreRestSiblings: false }],
    'vue/script-setup-uses-vars': 'off',
    'vue/no-parsing-error': 1,
  },
  plugins: ['vue', 'prettier'],
}
