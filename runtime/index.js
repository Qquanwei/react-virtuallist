"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = exports.FoldableWindowVirtualScroll = void 0;

var _WindowVirtualScroll = _interopRequireDefault(require("./WindowVirtualScroll"));

var _FoldableWindowVirtualScroll = _interopRequireDefault(require("./FoldableWindowVirtualScroll"));

exports.FoldableWindowVirtualScroll = _FoldableWindowVirtualScroll.default;
var _default = _WindowVirtualScroll.default;
exports.default = _default;