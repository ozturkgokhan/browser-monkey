var browser = require('..');
var createTestDom = require('./createTestDom');
var $ = require('jquery');

describe('fuzzy finders', function() {

  var dom;

  beforeEach(function() {
    dom = createTestDom();
  });

  describe('.link(label)', function () {

    it('finds anchors by text', function () {
      dom.eventuallyInsert('<a href="/somewhere">foo</a>');
      return browser.link('foo').shouldExist();
    });

    it('finds anchors by id', function () {
      dom.eventuallyInsert('<a id="foo" href="/somewhere"></a>');
      return browser.link('foo').shouldExist();
    });
    
    it('does not find anchors by id', function () {
      dom.eventuallyInsert('<a id="bar" href="/somewhere"></a>');
      return browser.link('omg').shouldNotExist();
    });

    it('finds anchors by title', function () {
      dom.eventuallyInsert('<a title="bar" href="/somewhere"></a>');
      return browser.link('bar').shouldExist();
    });
    
    it('finds anchors by nested img alt', function () {
      dom.eventuallyInsert('<a href="/somewhere"><img alt="baz" /></a>');
      return browser.link('baz').shouldExist();
    });

    it('finds anchors inside elements', function () {
      dom.eventuallyInsert('<div id="x"><a id="foo" href="/somewhere"></a></div>');
      return browser.find('#x').link('foo').shouldExist();
    });

    it('does not find anchors inside elements', function () {
      dom.eventuallyInsert('<div id="y"></div><a id="foo" href="/somewhere"></a>');
      return browser.find('#y').link('foo').shouldNotExist();
    });

  });

  describe('.button(label)', function () {

    it('finds button elements by id', function () {
      dom.eventuallyInsert('<button id="foo"></button>');
      return browser.button('foo').shouldExist();
    });

    it('does not find button elements by id', function () {
      dom.insert('<button id="something" />');
      return browser.button('another').shouldNotExist();
    });

    it('finds button elements by value substring', function () {
      dom.eventuallyInsert('<button value="foobar"></button>');
      return browser.button('oob').shouldExist();
    });

    it('does not find button elements by value substring', function () {
      dom.insert('<button value="gremlin"></button>');
      return browser.button('elmgrin').shouldNotExist();
    });

    it('finds button elements by title substring', function () {
      dom.eventuallyInsert('<button title="foobar"></button>');
      return browser.button('foo').shouldExist();
    });

    it('finds button elements by nested image input alt substring', function () {
      dom.eventuallyInsert('<button><input type="image" alt="yoyo" /></button>');
      return browser.button('yo').shouldExist();
    });

    it('does not find button elements by nested image input alt', function () {
      dom.insert('<button><input type="image" alt="yoyo" /></button>');
      return browser.button('no').shouldNotExist();
    });

    it('finds input[type=submit] elements', function () {
      dom.eventuallyInsert('<input id="foo" type="submit"></input>');
      return browser.button('foo').shouldExist();
    });

    it('finds input[type=reset] elements', function () {
      dom.eventuallyInsert('<input id="foo" type="reset"></input>');
      return browser.button('foo').shouldExist();
    });

    it('finds input[type=button] elements', function () {
      dom.eventuallyInsert('<input id="foo" type="button"></input>');
      return browser.button('foo').shouldExist();
    });

  });
  
});
