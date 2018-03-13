Array.prototype.repeat = function(n){
  var r = [];
  for( var i = 0 ; i < n ; i++ )
    r = r.concat( [  JSON.parse(JSON.stringify(this[0])) ] );
  return r;
};

function htmlize(cells){
  var r = "\n";
  for( var i = 0 ; i < cells.length ; i++ )
  {
    for( var j = 0 ; j < cells[0].length ; j++ )
      r += cells[i][j]?"X":"_";
    r+="\n";
  }
  return r;
}

function objectize(cells){
  if( cells.length == 0 )
    return [[{val: 0}]];
  return cells.map(function(x,i){
    return x.map(function(y,j){
      return {val: y};
    })
  });
}

function deobjectize(cells){
  return cells.map(function(x,i){
    return x.map(function(y,j){
      return y.val;
    })
  });
}

function ln(x,y,cells){
  var r = 0;
  for( var i = 0 ; i < 9 ; i++ )
    r+=((Math.floor(i/3)!=1||i%3!=1)&&cells[x-i%3+1]&&cells[x-i%3+1][y-Math.floor(i/3)+1])?1:0;
  return r;
}

function extend(a){
    var x = [];
    while( x.length!=a[0].length+2)
      x.push(0); 
    return [x].concat(a.map(function(x,i){
        return [0].concat(x.concat([0]));
    }).concat([x]));
}

function reduce(a){
  if( !a.length || !a[0].length ) return a;
    var r = a.filter(function(x,i){return (!i||i==a.length-1)?parseInt(x.join('')):true;});
    for( var c=a[0].length-1;c>=0;c--)if( !parseInt(a.map(function(x){return x[c]}).join(''))&&(!c||c==a[0].length-1))
      r = r.map(function(x,i){return x.filter(function(y,j){return j!=c;});})
  return (a.length!=r.length||a[0].length!=r[0].length)?arguments.callee(r):r;
}

function getGeneration(cells, generations ){
  //cells = extend(cells);
  var result = cells.map(function(x){return x.map(function(y){return y;});});
  if( !generations ) return cells;
  for( var i = 0 ; i < cells.length; i++ )
    for( var j = 0; j < cells[0].length; j++ )
      result[i][j] = (!cells[i][j]&&(ln(i,j,cells)==3))?1:(cells[i][j]&&(ln(i,j,cells)==2||ln(i,j,cells)==3)?1:0);
  return getGeneration(result,--generations);
}