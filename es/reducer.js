var __assign =
  (this && this.__assign) ||
  Object.assign ||
  function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s)
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
import { SHOW, HIDE, DESTROY } from './actionTypes';
var initialState = {};
export default (function(state, action) {
  if (state === void 0) {
    state = initialState;
  }
  if (action === void 0) {
    action = {};
  }
  switch (action.type) {
    case SHOW:
      return __assign(
        {},
        state,
        ((_a = {}),
        (_a[action.payload.modal] = {
          show: true,
          props: action.payload.props,
        }),
        _a)
      );
    case HIDE:
      return __assign(
        {},
        state,
        ((_b = {}),
        (_b[action.payload.modal] = __assign({}, state[action.payload.modal], {
          show: false,
        })),
        _b)
      );
    case DESTROY:
      return __assign(
        {},
        state,
        ((_c = {}), (_c[action.payload.modal] = undefined), _c)
      );
    default:
      return state;
  }
  var _a, _b, _c;
});
