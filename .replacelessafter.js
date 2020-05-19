'use strict';

const reg = /@import\s+\'\.\.\/node_modules\//g;
module.exports = {
    files: './src/*.less',
    from: reg,
    to: function(match) {
        return `${match.slice(0, -16)}~`;
    }
};