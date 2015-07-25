var expect = require('chai').expect
  , components = require('rijs.components')
  , noop = require('utilise/noop')
  , shadow = require('./')
  , core = require('rijs.core')
  , data = require('rijs.data')
  , fn = require('rijs.fn')
  , container = document.createElement('div')
  , el1, el2
  
describe('Shadow DOM', function(){

  before(function(){
    document.body.appendChild(container)
  })

  after(function(){
    document.body.removeChild(container)
  })
  
  beforeEach(function(){
    container.innerHTML = '<component-1></component-1>'
                        + '<component-2>fallback</component-2>'

    el1 = container.children[0]
    el2 = container.children[1]
  })

  it('should encapsulate with shadow dom or polyfill', function(){  
    var ripple = shadow(components(fn(data(core()))))
      , component = function(){ this.innerHTML = 'foo' }

    ripple('component-1', component)
    ripple('component-2', component)
    ripple.draw()

    expect(el1.shadowRoot.innerHTML).to.be.eql('foo')
    expect(el1).to.be.equal(el1.shadowRoot.host)
  })

  it('should reflect ssr content', function(){  
    var ripple = shadow(components(fn(data(core()))))

    ripple('component-2', noop)
    ripple.draw()

    expect(el2.shadowRoot.innerHTML).to.be.eql('fallback')
  })

})