'use strict';

const reg = /@import\s+\'~/g;
module.exports = {
    files: './src/*.less',
    from: reg,
    to: function(match) {
        return `${match.slice(0, -1)}../node_modules/`;
    }
};