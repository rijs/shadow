"use strict";

/* istanbul ignore next */
var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

// -------------------------------------------
// API: Mixes Shadow DOM Encapsulation into rendering pipeline
// -------------------------------------------
module.exports = shadow;

function shadow(ripple) {
  if (!client) {
    return;
  }log("creating", document.head.createShadowRoot ? "encapsulation" : "closing gap");

  var render = ripple.render;

  ripple.render = function (el) {
    el.createShadowRoot ? !el.shadowRoot && el.createShadowRoot() && reflect(el) : (el.shadowRoot = el, el.shadowRoot.host = el);

    return render(el);
  };

  return ripple;
}

function reflect(el) {
  el.shadowRoot.innerHTML = el.innerHTML;
}

var client = _interopRequire(require("utilise/client"));

var log = _interopRequire(require("utilise/log"));

var err = _interopRequire(require("utilise/err"));

log = log("[ri/shadow]");
err = err("[ri/shadow]");