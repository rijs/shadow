var expect = require('chai').expect
  , noop = require('utilise/noop')
  , components = require('rijs.components').default
  , core = require('rijs.core').default
  , data = require('rijs.data').default
  , fn = require('rijs.fn').default
  , shadow = require('./').default
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
    ripple.render(el1)
    ripple.render(el2)

    expect(el1.shadowRoot.innerHTML).to.be.eql('foo')
    expect(el1).to.be.equal(el1.shadowRoot.host)
  })

  it('should reflect ssr content', function(){  
    var ripple = shadow(components(fn(data(core()))))

    ripple('component-2', noop)
    ripple.render(el1)
    ripple.render(el2)

    expect(el2.shadowRoot.innerHTML).to.be.eql('fallback')
  })

  it('should close gap between host data and shadowRoot data', function(){  
    var ripple = shadow(components(fn(data(core()))))

    ripple('component-2', noop)

    el2.__data__ = { foo: 'bar' }
    
    ripple.render(el1)
    ripple.render(el2)

    expect(el2.shadowRoot.__data__).to.be.eql(el2.__data__)
  })

})