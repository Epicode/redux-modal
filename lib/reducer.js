"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends =
  Object.assign ||
  function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };

var _actionTypes = require("./actionTypes");

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

var initialState = {};

exports.default = function() {
  var state =
    arguments.length > 0 && arguments[0] !== undefined
      ? arguments[0]
      : initialState;
  var action =
    arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  switch (action.type) {
    case _actionTypes.SHOW:
      return _extends(
        {},
        state,
        _defineProperty({}, action.payload.modal, {
          show: true,
          props: action.payload.props
        })
      );
    case _actionTypes.HIDE:
      return _extends(
        {},
        state,
        _defineProperty(
          {},
          action.payload.modal,
          _extends({}, state[action.payload.modal], {
            show: false
          })
        )
      );
    case _actionTypes.DESTROY:
      return _extends(
        {},
        state,
        _defineProperty({}, action.payload.modal, undefined)
      );
    default:
      return state;
  }
};
