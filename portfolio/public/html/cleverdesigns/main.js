 var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-63926636-1']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();

window.onload = function(){
	$(".img-wrapper").click(function(){
		$(this).addClass("full-screen");
		$(".blackscreen").addClass("visible")
		_gaq.push(['_trackEvent', this.childNodes[1].src, 'clicked'])
	});

	$(".blackscreen").click(function(){
		$(this).removeClass("visible");
		$(".full-screen").removeClass("full-screen");
	})
}

function analyze( img ){
	alert('a');
	_gaq.push(['_trackEvent', img.src , 'clicked']);
} 