'use strict';

window.Services.service('Analytics', [function Analytics() {
  var userEvents = ['click', 'dblclick', 'keyup'];
  var Analytics = {
    report: report,
    reportEvent: reportEvent,
  };

  /** 
   * Init Analytics
   */
  (function _analytics(ia, sa, oa, ga, ra, aa, ma) {var qa = 'q'; var la = 'l';
    ia.GoogleAnalyticsObject=ra;ia[ra]=ia[ra]||function _analytics_init() {
      (ia[ra][qa]=ia[ra].q || []).push(arguments);};ia[ra][la] = 1*new Date();aa=sa.createElement(oa); 
    ma=sa.getElementsByTagName(oa)[0];aa.async=1;aa.src=ga;ma.parentNode.insertBefore(aa, ma);
  })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');
  window.ga('create', 'UA-97867771-1', 'auto');

  /** 
   * Capture all Events
   */
  userEvents.forEach(function forEachEvent(evantName) {
    document.addEventListener(evantName, function onAnalyticalClick(event) {
      var ecventId = event.srcElement.getAttribute('event');
      if (ecventId) {
        reportEvent(evantName, ecventId);
      }
    }, true);
  });

  function report(pagename) {
    window.ga('send', 'pageview', pagename );
  };

  function reportEvent(action, target) {
    //window.ga('send', {
    console.log({
      hitType: 'event',
      eventCategory: window.location.href,
      eventAction: action,
      eventLabel: target,
    });
  };

  return Analytics;
}]);
