// http://webreflection.blogspot.com/2009/01/ellipse-and-circle-for-canvas-2d.html
(function(){
  // Andrea Giammarchi - Mit Style License
  var extend = {
    // Circle methods
    circle:function(aX, aY, aDiameter){
      this.ellipse(aX, aY, aDiameter, aDiameter);
    },
    fillCircle:function(aX, aY, aDiameter){
      this.beginPath();
      this.circle(aX, aY, aDiameter);
      this.fill();
    },
    strokeCircle:function(aX, aY, aDiameter){
      this.beginPath();
      this.circle(aX, aY, aDiameter);
      this.stroke();
    },
    // Ellipse methods
    ellipse:function(aX, aY, aWidth, aHeight){
      aX -= aWidth / 2;
      aY -= aHeight / 2;
      var hB = (aWidth / 2) * .5522848,
      vB = (aHeight / 2) * .5522848,
      eX = aX + aWidth,
      eY = aY + aHeight,
      mX = aX + aWidth / 2,
      mY = aY + aHeight / 2;
      this.moveTo(aX, mY);
      this.bezierCurveTo(aX, mY - vB, mX - hB, aY, mX, aY);
      this.bezierCurveTo(mX + hB, aY, eX, mY - vB, eX, mY);
      this.bezierCurveTo(eX, mY + vB, mX + hB, eY, mX, eY);
      this.bezierCurveTo(mX - hB, eY, aX, mY + vB, aX, mY);
      this.closePath();
    },
    fillEllipse:function(aX, aY, aWidth, aHeight){
      this.beginPath();
      this.ellipse(aX, aY, aWidth, aHeight);
      this.fill();
    },
    strokeEllipse:function(aX, aY, aWidth, aHeight){
      this.beginPath();
      this.ellipse(aX, aY, aWidth, aHeight);
      this.stroke();
    }
  };

  for(var key in extend)
    CanvasRenderingContext2D.prototype[key] = extend[key];
})();


/*
     FILE ARCHIVED ON 21:08:16 Oct 03, 2016 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 19:35:40 Apr 07, 2019.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  LoadShardBlock: 171.836 (3)
  esindex: 0.014
  captures_list: 198.117
  CDXLines.iter: 17.045 (3)
  PetaboxLoader3.datanode: 110.203 (4)
  exclusion.robots: 0.252
  exclusion.robots.policy: 0.235
  RedisCDXSource: 2.747
  PetaboxLoader3.resolve: 100.863 (2)
  load_resource: 73.17
*/