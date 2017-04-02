$(document).ready(function(){
	$('div').click(function(){
		$(this).toggleClass("divA");
		/*var left = $('div1')[0].style.left;

		if(left!=0)
			$('div1').animate({left:'0px',right:'0px',top:'0px',bottom:'0px'});
			divOne=true;
		else
			$('div1').animate({left:'10%',right:'50%',top:'10%',bottom:'50%'});

		*/
	});
});