var noSuggestions = '<div>No suggetsions available :\'(</div>';
var onlyReddit = '<div>This extension only works for reddit :\'(</div>';

function getCurrentTabUrl(callback) {
  // Query filter to be passed to chrome.tabs.query - see
  // https://developer.chrome.com/extensions/tabs#method-query
  var queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, function(tabs) {
    // chrome.tabs.query invokes the callback with a list of tabs that match the
    // query. When the popup is opened, there is certainly a window and at least
    // one tab, so we can safely assume that |tabs| is a non-empty array.
    // A window can only have one active tab at a time, so the array consists of
    // exactly one tab.
    var tab = tabs[0];

    // A tab is a plain object that provides information about the tab.
    // See https://developer.chrome.com/extensions/tabs#type-Tab
    var url = tab.url;

    // tab.url is only available if the "activeTab" permission is declared.
    // If you want to see the URL of other tabs (e.g. after removing active:true
    // from |queryInfo|), then the "tabs" permission is required to see their
    // "url" properties.
    console.assert(typeof url == 'string', 'tab.url should be a string');

    callback(url);
  });

  // Most methods of the Chrome extension APIs are asynchronous. This means that
  // you CANNOT do something like this:
  //
  // var url;
  // chrome.tabs.query(queryInfo, function(tabs) {
  //   url = tabs[0].url;
  // });
  // alert(url); // Shows "undefined", because chrome.tabs.query is async.
}

var process = function( file , element , text , reddit , callback ){
  var xhr = new XMLHttpRequest();
  xhr.open('GET', chrome.extension.getURL( file ), true);
  xhr.onreadystatechange = function()
  {
      if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200)
      {
         var suggestions = xhr.responseText.split('\n');
         var result = [];
         var rules = [];

            for( var i = 0 ; i < suggestions.length ; i++ ){
              rules.push( suggestions[i].split(',') );
            }

            rules = rules.filter(function(a){
              return a.length >= 6;
            })

            rules = rules.sort(function( a , b ){
              return parseFloat(a[a.length - 3].replace(/\%/g,'')) - 
                parseFloat( b[b.length - 3].replace(/\%/g,'') );
            });

            console.log( rules );

            var found = false;
            for( var i = 0 ; i < rules.length ; i++ ){
              found = false;

              for( var j = 0 ; j < rules[i].length - 5 ; j++ ){
                if( rules[i][j] == reddit )
                  found = true;
              }

              if( found ){
                result.push( rules[i][rules[i].length - 4 ]);
              }
            }

            if( result.length ){
              element.innerHTML = '<div>' + text + ':</div>';
              var ctrl = {};
              var count = 0;
              for( var i = 0 ; i < result.length ; i++ ){
                if( !ctrl[ result[i] ] && count < 4 ){
                  count++;
                  ctrl[ result[i] ] = true;
                  element.innerHTML += '<div><a href="https://www.reddit.com/r/' + result[i] + '">' + result[i] + '</a></div>';
                }
              }
            }

            if( callback )
              callback();
      }
  };
  xhr.send();
};

window.onload = function(){
  tabName = document.getElementById('tabName');
  suggestions = document.getElementById('suggestions');
  recomendations = document.getElementById('recomendations');

  getCurrentTabUrl(function(tabs){
    if( tabs.match(/\.reddit\.com/) ){
      var reddit = tabs.match(/\/r\/(([^\/])*)/)[1];
      tabName.innerHTML = '<div> Currently in: ' + reddit + '</div>';

      process('rulesG4.csv' , suggestions , 'Other people also like:' , reddit , function(){
        process('rulesG1.csv' , recomendations , 'You can be interested in:' , reddit);
      });

    }else{
      tabName.innerHTML = onlyReddit;
    }
   });
};


/*

*/
/**
 * @param {string} searchTerm - Search term for Google Image search.
 * @param {function(string,number,number)} callback - Called when an image has
 *   been found. The callback gets the URL, width and height of the image.
 * @param {function(string)} errorCallback - Called when the image is not found.
 *   The callback gets a string that describes the failure reason.
 *//*
function getImageUrl(searchTerm, callback, errorCallback) {
  // Google image search - 100 searches per day.
  // https://developers.google.com/image-search/
  var searchUrl = 'https://ajax.googleapis.com/ajax/services/search/images' +
    '?v=1.0&q=' + encodeURIComponent(searchTerm);
  var x = new XMLHttpRequest();
  x.open('GET', searchUrl);
  // The Google image search API responds with JSON, so let Chrome parse it.
  x.responseType = 'json';
  x.onload = function() {
    // Parse and process the response from Google Image Search.
    var response = x.response;
    if (!response || !response.responseData || !response.responseData.results ||
        response.responseData.results.length === 0) {
      errorCallback('No response from Google Image search!');
      return;
    }
    var firstResult = response.responseData.results[0];
    // Take the thumbnail instead of the full image to get an approximately
    // consistent image size.
    var imageUrl = firstResult.tbUrl;
    var width = parseInt(firstResult.tbWidth);
    var height = parseInt(firstResult.tbHeight);
    console.assert(
        typeof imageUrl == 'string' && !isNaN(width) && !isNaN(height),
        'Unexpected respose from the Google Image Search API!');
    callback(imageUrl, width, height);
  };
  x.onerror = function() {
    errorCallback('Network error.');
  };
  x.send();
}

function renderStatus(statusText) {
  document.getElementById('status').textContent = statusText;
}

document.addEventListener('DOMContentLoaded', function() {
  getCurrentTabUrl(function(url) {
    // Put the image URL in Google search.
    renderStatus('Performing Google Image search for ' + url);

    getImageUrl(url, function(imageUrl, width, height) {

      renderStatus('Search term: ' + url + '\n' +
          'Google image search result: ' + imageUrl);
      var imageResult = document.getElementById('image-result');
      // Explicitly set the width/height to minimize the number of reflows. For
      // a single image, this does not matter, but if you're going to embed
      // multiple external images in your page, then the absence of width/height
      // attributes causes the popup to resize multiple times.
      imageResult.width = width;
      imageResult.height = height;
      imageResult.src = imageUrl;
      imageResult.hidden = false;

    }, function(errorMessage) {
      renderStatus('Cannot display image. ' + errorMessage);
    });
  });
});
*/