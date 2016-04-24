var createHDom = require('./createTestDom');
var createVDom = require('./createVDom');
var isNode = require('detect-node');
var h = require('virtual-dom/h');
var vquery = require('vdom-query')
var browserMonkey = require('..');

function noop(){}

function domTest(testName, testCb, options){
  options = options || {};

  var runTests = options.only ? describe.only : describe;
  var runHtml = it;
  var runVDom = it;

  if (options.hasOwnProperty('vdom') && !options.vdom) {
    runVDom = noop;
  }
  if (isNode || (options.hasOwnProperty('html') && !options.html)) {
    runHtml = noop;
  }

  runTests(testName, function(){
    runHtml('HTML', function(){
      var htmlDom = createHDom();
      browser.set({
        document: document
      });
      return testCb(browserMonkey(), htmlDom, require('jquery'));
    });

    runVDom('VDOM', function(){
      var body = h('body');
      var browser = browserMonkey(body);
      browser.set({
        $: vquery,
        visibleOnly: false,
        document: {}
      });

      var virtualDom = createVDom(body);
      return testCb(browser, virtualDom, vquery);
    });
  });
}

domTest.only = function(testName, testCb, options){
  options = options || {};
  options.only = true;
  domTest(testName, testCb, options);
}

module.exports = domTest;
