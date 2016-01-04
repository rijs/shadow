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
  ripple.render = render(ripple.render);
  return ripple;
}

var render = function render(next) {
  return function (el) {
    el.createShadowRoot ? !el.shadowRoot && el.createShadowRoot() && (reflect(el), retarget(el)) : (el.shadowRoot = el, el.shadowRoot.host = el);

    return after(next(el));
  };
};

var reflect = function reflect(el) {
  return el.shadowRoot.innerHTML = el.innerHTML;
};

var retarget = function retarget(el) {
  return keys(el).concat(['on', 'once', 'emit', 'classList', 'getAttribute', 'setAttribute']).map(function (d) {
    return el.shadowRoot[d] = is.fn(el[d]) ? el[d].bind(el) : el[d];
  });
};

var after = function after(el) {
  return keys(el).map(function (d) {
    return el.shadowRoot[d] = el[d];
  });
};

var log = require('utilise/log')('[ri/shadow]'),
    err = require('utilise/err')('[ri/shadow]');