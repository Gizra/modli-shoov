'use strict';

var shoovWebdrivercss = require('shoov-webdrivercss');

// This can be executed by passing the environment argument like this:
// PROVIDER_PREFIX=browserstack SELECTED_CAPS=ie11 mocha
// PROVIDER_PREFIX=browserstack SELECTED_CAPS=chrome mocha
var capsConfig = {
  'chrome': {
    'browser' : 'Chrome',
    'browser_version' : '42.0',
    'os' : 'OS X',
    'os_version' : 'Yosemite',
    'resolution' : '1024x768'
  },
  'ie11': {
    'browser' : 'IE',
    'browser_version' : '11.0',
    'os' : 'Windows',
    'os_version' : '7',
    'resolution' : '1024x768'
  }
}

var selectedCaps = process.env.SELECTED_CAPS || undefined;
var caps = selectedCaps ? capsConfig[selectedCaps] : undefined;

var providerPrefix = process.env.PROVIDER_PREFIX ? process.env.PROVIDER_PREFIX + '-' : '';
var testName = selectedCaps ? providerPrefix + selectedCaps : providerPrefix + 'default';

var baseUrl = process.env.BASE_URL ? process.env.BASE_URL : 'https://modli.co';

describe('Visual monitor testing', function() {

  this.timeout(99999999);
  var client = {};

  before(function(done){
    client = shoovWebdrivercss.before(done, caps);
  });

  after(function(done) {
    shoovWebdrivercss.after(done);
  });

  it('should show the home page',function(done) {
    client
      .url(baseUrl)
      .pause(5000)
      .webdrivercss(testName + '.homepage', {
        name: '1',
        exclude:
          [
            // Top slide show.
            '#slideshow-wrapper-home',
            // Banner left.
            '.banner-left p',
            // Banner right.
            '.banner-right',
            // Small banner top.
            '.banner-inner-top',
            // Small banner bottom.
            '.banner-inner-bottom',
            // Slide show instagram.
            '#slideshow-wrapper-instagram .cycle-carousel-wrap .cycle-slide-active:nth-child(n+4) img',
            '#slideshow-wrapper-instagram .cycle-carousel-wrap .cycle-slide:nth-child(n+7):nth-last-child(n+7) img',
            // Slide show category products popular.
            '.cycle-carousel-wrap .slide:nth-child(n+14):nth-last-child(n+22) img',
            '.cycle-carousel-wrap .slide:nth-child(n+14):nth-last-child(n+22) .product-name',
            '.cycle-carousel-wrap .slide:nth-child(n+14):nth-last-child(n+22) .price',
          ],
        remove:
          [
            // Need help panel.
            '#habla_beta_container_do_not_rely_on_div_classes_or_names',
            // Slide control.
            '.slide-nav-inner',
          ],
        screenWidth: selectedCaps == 'chrome' ? [640, 960, 1200] : undefined
      }, shoovWebdrivercss.processResults)
      .call(done);
  });
});
