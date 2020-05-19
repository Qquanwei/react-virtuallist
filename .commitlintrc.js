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

/**
 * 支持的 type 有：
 *
 *   'build', 'ci', 'docs', 'feat', 'fix', 'perf',
 *   'refactor', 'revert', 'style', 'test'
 */

module.exports = {
    extends: ['@commitlint/config-angular'],
    rules: {
        'body-leading-blank': [2, 'always'],
        'footer-leading-blank': [2, 'always'],
        'subject-case': [0],
        'scope-case': [0]
    }
};
