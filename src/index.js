// -------------------------------------------
// API: Mixes Shadow DOM Encapsulation into rendering pipeline
// -------------------------------------------
export default function shadow(ripple){
  if (!client) return;
  log('creating', document.head.createShadowRoot ? 'encapsulation' : 'closing gap')
  
  var render = ripple.render

  ripple.render = function(el){
    el.createShadowRoot 
      ? (!el.shadowRoot && el.createShadowRoot() && reflect(el)
        , retarget(el))
      : ( el.shadowRoot = el
        , el.shadowRoot.host = el)    

    return render(el)
  }

  return ripple
}

function reflect(el) {
  el.shadowRoot.innerHTML = el.innerHTML
}

function retarget(el) {
  keys(el)
    .concat(['on', 'once', 'emit'])
    .map(d => el.shadowRoot[d] = el[d])
}

import client from 'utilise/client'
var log = require('utilise/log')('[ri/shadow]')
  , err = require('utilise/err')('[ri/shadow]')