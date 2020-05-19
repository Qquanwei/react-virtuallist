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

const sassAtRules = [
    'at-root',
    'content',
    'debug',
    'each',
    'else',
    'else if',
    'error',
    'extend',
    'for',
    'function',
    'if',
    'import',
    'include',
    'media',
    'mixin',
    'return',
    'warn',
    'while'
];

module.exports = {
    extends: 'stylelint-config-standard',
    rules: {
        indentation: 4,
        linebreaks: 'unix',
        'no-descending-specificity': null,

        /**
         * CSS Modules
         */
        'selector-pseudo-class-no-unknown': [true, {
            ignorePseudoClasses: [
                'export',
                'import',
                'global',
                'local',
                'external',
            ]
        }],
        'selector-type-no-unknown': [true, {
            ignoreTypes: ['from'],
        }],
        'property-no-unknown': [true, {
            ignoreProperties: ['composes', 'compose-with'],
        }],
        'at-rule-no-unknown': [true, {
            ignoreAtRules: ['value'].concat(sassAtRules),
        }]
    }
};
