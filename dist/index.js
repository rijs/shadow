'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = shadow;

var _client = require('utilise/client');

var _client2 = _interopRequireDefault(_client);

/* istanbul ignore next */
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// -------------------------------------------
// API: Mixes Shadow DOM Encapsulation into rendering pipeline
// -------------------------------------------
function shadow(ripple) {
  if (!_client2.default) return;
  log('creating', document.head.createShadowRoot ? 'encapsulation' : 'closing gap');

  var render = ripple.render;

  ripple.render = function (el) {
    el.createShadowRoot ? (!el.shadowRoot && el.createShadowRoot() && reflect(el), el.shadowRoot.__data__ = el.__data__) : (el.shadowRoot = el, el.shadowRoot.host = el);

    return render(el);
  };

  return ripple;
}

function reflect(el) {
  el.shadowRoot.innerHTML = el.innerHTML;
}

var log = require('utilise/log')('[ri/shadow]'),
    err = require('utilise/err')('[ri/shadow]');