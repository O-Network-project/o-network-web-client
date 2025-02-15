/* eslint-env node */

module.exports = {
    env: { browser: true, es2020: true },
    extends: [
        'standard',
        'plugin:react/recommended',
        'plugin:react/jsx-runtime',
        'plugin:react-hooks/recommended'
    ],
    parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
    settings: { react: { version: '18.2' } },
    plugins: ['only-warn', 'react-refresh'],
    rules: {
        'no-unused-vars': [1, {
            args: 'after-used', // StandardJS set it to none by default
            caughtErrors: 'all', // StandardJS set it to none by default
            ignoreRestSiblings: false, // StandardJS set it to true by default
            vars: 'all'
        }],
        indent: [1, 4, { SwitchCase: 1 }],
        quotes: [1, 'single', { allowTemplateLiterals: true }],
        'import/named': 1,
        'import/order': [1, { 'newlines-between': 'never' }],
        'import/newline-after-import': 1,
        'import/no-useless-path-segments': [1, { noUselessIndex: true }],
        'import/no-default-export': 1,
        'space-before-function-paren': [1, {
            anonymous: 'always',
            named: 'never',
            asyncArrow: 'always'
        }],
        'arrow-parens': [1, 'as-needed'],
        'react/function-component-definition': 1,
        'react/no-unescaped-entities': [1, { forbid: ['>', '}'] }],
        'react/jsx-equals-spacing': [1, 'never'],
        'react/jsx-tag-spacing': [1, {
            closingSlash: 'never',
            beforeSelfClosing: 'always',
            afterOpening: 'never',
            beforeClosing: 'never'
        }],
        'jsx-quotes': [1, 'prefer-double'],
        'react-refresh/only-export-components': [
            1,
            { allowConstantExport: true }
        ]
    }
}
