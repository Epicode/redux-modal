var __extends =
  (this && this.__extends) ||
  (function() {
    var extendStatics =
      Object.setPrototypeOf ||
      ({ __proto__: [] } instanceof Array &&
        function(d, b) {
          d.__proto__ = b;
        }) ||
      function(d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
      };
    return function(d, b) {
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype =
        b === null
          ? Object.create(b)
          : ((__.prototype = b.prototype), new __());
    };
  })();
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
var __rest =
  (this && this.__rest) ||
  function(s, e) {
    var t = {};
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === 'function')
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++)
        if (e.indexOf(p[i]) < 0) t[p[i]] = s[p[i]];
    return t;
  };
import * as React from 'react';
import * as PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { hide, destroy } from './actions';
import { getDisplayName, isPromise, isUndefined } from './utils';
var hoistStatics = require('hoist-non-react-statics');
var INITIAL_MODAL_STATE = {};
export default function connectModal(_a) {
  var name = _a.name,
    _b = _a.getModalState,
    getModalState =
      _b === void 0
        ? function(state) {
            return state.modal;
          }
        : _b,
    resolve = _a.resolve,
    _c = _a.destroyOnHide,
    destroyOnHide = _c === void 0 ? true : _c,
    destroyTimeout = _a.destroyTimeout;
  return function(WrappedComponent) {
    var ConnectModal = /** @class */ (function(_super) {
      __extends(ConnectModal, _super);
      function ConnectModal(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.handleHide = function() {
          _this.props.hide(name);
        };
        _this.handleDestroy = function() {
          _this.props.destroy(name);
        };
        var show = props.modal.show;
        _this.state = { show: show };
        return _this;
      }
      ConnectModal.prototype.componentWillReceiveProps = function(nextProps) {
        var _this = this;
        var modal = nextProps.modal;
        var store = this.context.store;
        if (isUndefined(modal.show)) {
          return this.unmount();
        }
        if (!modal.show) {
          if (destroyOnHide) {
            if (destroyTimeout) {
              this.hide();
              setTimeout(function() {
                return _this.props.destroy(name);
              }, destroyTimeout);
              return;
            }
          } else {
            return this.hide();
          }
        }
        if (!resolve) {
          this.show();
        }
        if (resolve) {
          var resolveResult = resolve({ store: store, props: modal.props });
          if (!isPromise(resolveResult)) {
            return this.show();
          }
          resolveResult.then(function() {
            _this.show();
          });
        }
      };
      ConnectModal.prototype.componentWillUnmount = function() {
        this.props.destroy(name);
      };
      ConnectModal.prototype.show = function() {
        this.setState({ show: true });
      };
      ConnectModal.prototype.hide = function() {
        this.setState({ show: false });
      };
      ConnectModal.prototype.unmount = function() {
        this.setState({ show: undefined });
      };
      ConnectModal.prototype.render = function() {
        var show = this.state.show;
        var _a = this.props,
          modal = _a.modal,
          hide = _a.hide,
          destroy = _a.destroy,
          ownProps = __rest(_a, ['modal', 'hide', 'destroy']);
        if (isUndefined(show)) {
          return null;
        }
        return React.createElement(
          WrappedComponent,
          __assign({}, ownProps, modal.props, {
            show: show,
            handleHide: this.handleHide,
            handleDestroy: this.handleDestroy,
          })
        );
      };
      ConnectModal.displayName =
        'ConnectModal(' + getDisplayName(WrappedComponent) + ')';
      ConnectModal.propTypes = {
        modal: PropTypes.object.isRequired,
      };
      ConnectModal.contextTypes = {
        store: PropTypes.object.isRequired,
      };
      return ConnectModal;
    })(React.Component);
    return connect(
      function(state) {
        return {
          modal: getModalState(state)[name] || INITIAL_MODAL_STATE,
        };
      },
      function(dispatch) {
        return __assign(
          {},
          bindActionCreators({ hide: hide, destroy: destroy }, dispatch)
        );
      }
    )(hoistStatics(ConnectModal, WrappedComponent));
  };
}
