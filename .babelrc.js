const { NODE_ENV, BABEL_ENV } = process.env;
const cjs = NODE_ENV === 'test' || BABEL_ENV === 'commonjs';
const hasBabelRuntime = NODE_ENV === 'runtime';

const plugins = [];
if (cjs) {
    plugins.push(['@babel/transform-modules-commonjs', { loose: true }]);
}
if (hasBabelRuntime) {
    plugins.push("@babel/plugin-transform-runtime");
}
module.exports = {
    plugins,
    "presets": [
        [
            "@babel/preset-env",
            {
                "modules": false,
                "loose": true
            }
        ],
        "@babel/preset-react",
        "./.babel_mypreset"
    ]
}