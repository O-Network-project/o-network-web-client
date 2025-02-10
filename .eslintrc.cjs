/* eslint-env node */

module.exports = {
    env: { browser: true, es2020: true },
    extends: [
        'standard',
        'plugin:react/recommended',
        'plugin:react/jsx-runtime',
        'plugin:react-hooks/recommended',
    ],
    parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
    settings: { react: { version: '18.2' } },
    plugins: ['react-refresh'],
    rules: {
        'no-unused-vars': ['error', {
            args: 'after-used', // StandardJS set it to none by default
            caughtErrors: 'all', // StandardJS set it to none by default
            ignoreRestSiblings: false, // StandardJS set it to true by default
            vars: 'all'
        }],
        indent: ['warn', 4, { "SwitchCase": 1 }],
        quotes: ['error', 'single', { allowTemplateLiterals: true }],
        'import/named': 'error',
        'import/order': ['error', { 'newlines-between': 'never' }],
        'import/newline-after-import': 'error',
        'import/no-useless-path-segments': ['error', { noUselessIndex: true }],
        'import/no-default-export': 'error',
        'space-before-function-paren': ['error', {
            anonymous: 'always',
            named: 'never',
            asyncArrow: 'always'
        }],
        'arrow-parens': ['error', 'as-needed'],
        'react/no-unescaped-entities': ['error', { forbid: ['>', '}'] }],
        'react/jsx-equals-spacing': ['error', 'never'],
        'react/jsx-tag-spacing': ['error', {
            closingSlash: 'never',
            beforeSelfClosing: 'always',
            afterOpening: 'never',
            beforeClosing: 'never'
        }],
        'jsx-quotes': ['error', 'prefer-double'],
        'react-refresh/only-export-components': [
            'warn',
            { allowConstantExport: true },
        ],
    },
}
