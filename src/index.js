// -------------------------------------------
// API: Mixes Shadow DOM Encapsulation into rendering pipeline
// -------------------------------------------
export default function shadow(ripple){
  if (!client) return;
  log('creating', document.head.createShadowRoot ? 'encapsulation' : 'closing gap')
  
  var render = ripple.render

  ripple.render = function(el){
    el.createShadowRoot 
      ? (!el.shadowRoot && el.createShadowRoot() && reflect(el))
      : ( el.shadowRoot = el
        , el.shadowRoot.host = el)

    return render(el)
  }

  return ripple
}

function reflect(el) {
  el.shadowRoot.innerHTML = el.innerHTML
}

import client from 'utilise/client'
import log from 'utilise/log'
import err from 'utilise/err'
log = log('[ri/shadow]')
err = err('[ri/shadow]')