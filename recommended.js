module.exports = {
    extends: ['eslint:recommended', 'plugin:prettier/recommended'],
    parser: 'babel-eslint',
    plugins: ['prettier', 'simple-import-sort'],
    parserOptions: {
        ecmaVersion: 2020,
    },
    env: {
        browser: true,
        node: true,
        es6: true,
        jquery: true,
        jest: true,
    },
    rules: {
        '@ma-eslint/translate': 2,
        'simple-import-sort/sort': [
            'error',
            {
                groups: [
                    // Side effect imports
                    ['^\\u0000'],
                    // Node.js builtins.
                    [`^(${require('module').builtinModules.join('|')})(/|$)`],
                    // Packages. `react` related packages come first.
                    ['^react$', '^@?\\w'],
                    // Internal imports. This package doesn't manage absolute imports for now
                    [
                        '^(app|components|containers|enums|constants|helpers|services|types|setupTests)(/.*|$)',
                    ],
                    // Parent imports. Put `..` last.
                    ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
                    // Other relative imports. Put same-folder imports and `.` last.
                    ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
                    // Style imports.
                    ['^.+\\.s?css$'],
                ],
            },
        ],
        'prettier/prettier': [
            'error',
            {
                printWidth: 100,
                singleQuote: true,
                trailingComma: 'all',
                tabWidth: 2,
                endOfLine: 'auto',
            },
        ],
        'padding-line-between-statements': [
            'error',
            { blankLine: 'always', prev: '*', next: 'multiline-block-like' },
            { blankLine: 'always', prev: 'multiline-block-like', next: '*' },
            { blankLine: 'always', prev: '*', next: ['const', 'let', 'export'] },
            { blankLine: 'always', prev: ['const', 'let', 'export'], next: '*' },
            {
                blankLine: 'any',
                prev: ['const', 'let', 'export'],
                next: ['const', 'let', 'export'],
            },
            { blankLine: 'always', prev: '*', next: 'return' },
        ],
    },
};
