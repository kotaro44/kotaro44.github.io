var wrap = 16;
var canvas,ctx,contents,size = 50 ,step = 4,adv=0,bitadv=0,invert=false;

(function(){

    var ConvertBase = function (num) {
        return {
            from : function (baseFrom) {
                return {
                    to : function (baseTo) {
                        return parseInt(num, baseFrom).toString(baseTo);
                    }
                };
            }
        };
    };
        
    // binary to decimal
    ConvertBase.bin2dec = function (num) {
        return ConvertBase(num).from(2).to(10);
    };
    
    // binary to hexadecimal
    ConvertBase.bin2hex = function (num) {
        return ConvertBase(num).from(2).to(16);
    };
    
    // decimal to binary
    ConvertBase.dec2bin = function (num) {
        return ConvertBase(num).from(10).to(2);
    };
    
    // decimal to hexadecimal
    ConvertBase.dec2hex = function (num) {
        return ConvertBase(num).from(10).to(16);
    };
    
    // hexadecimal to binary
    ConvertBase.hex2bin = function (num) {
        return ConvertBase(num).from(16).to(2);
    };
    
    // hexadecimal to decimal
    ConvertBase.hex2dec = function (num) {
        return ConvertBase(num).from(16).to(10);
    };
    
    this.ConvertBase = ConvertBase;
    
})(this);

window.onload = function(){
	canvas = $('#img')[0];
	ctx = canvas.getContext('2d');

	$('#file')[0].onchange = function(e) { 
		readFile();
	};

	$('#wrap').val(wrap);
	$('#wrap')[0].onchange = function(){
		wrap = parseInt($('#wrap').val());
		renderFile();
	}

	$('#size').val(size);
	$('#size')[0].onchange = function(){
		size = parseInt($('#size').val());
		renderFile();
	}

	$('#adv').val(adv);
	$('#adv')[0].onchange = function(){
		adv = parseInt($('#adv').val());
		renderFile();
	}

    $('#bitadv').val(bitadv);
    $('#bitadv')[0].onchange = function(){
        bitadv = parseInt($('#bitadv').val());
        renderFile();
    }

    $('#step').val(step);
    $('#step')[0].onchange = function(){
        step = parseInt($('#step').val());
        renderFile();
    }

}

var readFile = function(){
	var f = $('#file')[0].files[0]; 

    if (f) {
      var r = new FileReader();
      r.onload = function(e) { 
	    contents = e.target.result;
	    renderFile();
        /*alert( "Got the file.n" 
              +"name: " + f.name + "n"
              +"type: " + f.type + "n"
              +"size: " + f.size + " bytesn"
              + "starts with: " + contents.substr(1, contents.indexOf("n"))
        );  */
      }
      r.readAsBinaryString(f);
    } else { 
      alert("Failed to load file");
    }
}

var pixel = function ( x , y , r , g , b , s ){
	ctx.fillStyle = "rgba("+r+","+g+","+b+",255)";
    x = x*size;
    y = y*size;

    
	ctx.fillRect( x , y , size , size );
    if( size < 20 )
        return;
    var tsize = (size/4);
    ctx.font = tsize+ "px Arial";

    if( (r+g+b)/3 > 255/2 )
        ctx.fillStyle = "black";
    else
        ctx.fillStyle = "white";

    ctx.fillText( ConvertBase.dec2hex(r) , x+5 , y + size - 2*(size/3) - tsize/2);
    ctx.fillText( ConvertBase.dec2hex(g) , x+5 , y + size - (size/3) - tsize/2);
    ctx.fillText( ConvertBase.dec2hex(b) , x+5 , y + size - tsize/2);
}

var renderFile = function(){
	ctx.fillStyle = "#ffffff";
	ctx.fillRect(0,0,canvas.width,canvas.height);

	var index = 0;
	for( var i = step*adv*wrap + bitadv; i < contents.length-2 ; i+=step ){

        if( !invert ){
    		pixel( index%wrap , Math.floor( index/wrap ) ,  contents.charCodeAt(i) ,
    			contents.charCodeAt(i+1),contents.charCodeAt(i+2) );
        }else{
            pixel( index%wrap , Math.floor( index/wrap ) ,  contents.charCodeAt(i+2) ,
                contents.charCodeAt(i+1),contents.charCodeAt(i) );
        }

        index++;
	}
	
}



