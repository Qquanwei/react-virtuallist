'use strict';

/**
 * @music/elint-preset-base
 *
 * npm：http://npm.hz.netease.com/package/@music/elint-preset-base
 * gitlab：https://g.hz.netease.com/cloudmusic-frontend/lint/elint-preset-base
 *
 * 此文件自动生成，禁止修改！
 * 此文件自动生成，禁止修改！
 * 此文件自动生成，禁止修改！
 */

module.exports = {
    parser: 'babel-eslint',
    extends: [
        'eslint-config-airbnb-base',
        'eslint-config-airbnb-base/rules/strict',
        'eslint-config-airbnb/rules/react'
    ].map(require.resolve),
    env: {
        'browser': true,
        'node': true,
        'commonjs': true,
        'es6': true,
        'mocha': true,
        'jest': true
    },
    rules: {
        /**
         * eslint
         */
        'comma-dangle': ['error', {
            arrays: 'only-multiline',
            objects: 'only-multiline',
            imports: 'only-multiline',
            exports: 'only-multiline',
            functions: 'only-multiline'
        }],
        indent: ['error', 4, {
            SwitchCase: 1,
            VariableDeclarator: 1,
            outerIIFEBody: 1,
            // MemberExpression: null,
            FunctionDeclaration: {
                parameters: 1,
                body: 1
            },
            FunctionExpression: {
                parameters: 1,
                body: 1
            },
            CallExpression: {
                arguments: 1
            },
            ArrayExpression: 1,
            ObjectExpression: 1,
            ImportDeclaration: 1,
            flatTernaryExpressions: false,
            // list derived from https://github.com/benjamn/ast-types/blob/HEAD/def/jsx.js
            ignoredNodes: ['JSXElement', 'JSXElement > *', 'JSXAttribute', 'JSXIdentifier', 'JSXNamespacedName', 'JSXMemberExpression', 'JSXSpreadAttribute', 'JSXExpressionContainer', 'JSXOpeningElement', 'JSXClosingElement', 'JSXText', 'JSXEmptyExpression', 'JSXSpreadChild'],
            ignoreComments: false
        }],
        'no-bitwise': 'off',
        'no-continue': 'off',
        'no-plusplus': 'off',
        'one-var': 'off',
        'one-var-declaration-per-line': 'off',
        'no-restricted-syntax': [
            'error',
            {
                selector: 'LabeledStatement',
                message: 'Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.',
            },
            {
                selector: 'WithStatement',
                message: '`with` is disallowed in strict mode because it makes code impossible to predict and optimize.',
            },
        ],
        'prefer-destructuring': 'off',
        'no-new': 'off',
        'no-script-url': 'off',

        /**
         * eslint-plugin-react
         */
        'react/jsx-indent': ['error', 4],
        'react/jsx-indent-props': ['error', 4],
        'react/jsx-closing-bracket-location': ['error', 'after-props'],
        'react/jsx-filename-extension': ['error', { extensions: ['.js', '.jsx'] }],
        'react/destructuring-assignment': 'off',
        'react/sort-comp': 'off',
        // https://github.com/yannickcr/eslint-plugin-react/issues/1846
        'react/button-has-type': 'off',
        'react/require-default-props': ['warn', {
            forbidDefaultForRequired: true,
        }],

        /**
         * eslint-plugin-import
         */
        'import/no-unresolved': 'off',
        'import/no-extraneous-dependencies': 'off',
        'import/extensions': 'off'
    }
};
