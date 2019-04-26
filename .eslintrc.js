module.exports = {
  'root': true,
  'parser': 'babel-eslint',
  'parserOptions': {
    "sourceType": "module",
    "allowImportExportEverywhere": false,
    "codeFrame": true
  },
  'env': {
      'node': true
  },
  'plugins': ['node'],
  'extends': ['eslint:recommended', 'plugin:node/recommended'],
  'globals': {
      'Atomics': 'readonly',
      'SharedArrayBuffer': 'readonly'
  },
  'rules': {
      'strict': 0,
      'indent': ['error', 2 ],
      'linebreak-style': ['error', 'windows' ],
      'quotes': ['error','single'],
      'semi': ['error','never'],
      'block-spacing': ['error', 'always'],
      'array-bracket-spacing': ['error', 'always'],
      'comma-spacing': ['error', { "before": false, "after": true }],
      'func-call-spacing': ['error','never']
  }
}