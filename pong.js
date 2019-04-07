const PI = 3.1415926;

var size = 150;
function Pong(ctx) {
  this.ctx = ctx;
  this.ball = {x: 0.5, y: 0.5, a: PI + 1};
  this.p1 = 0.5;
  this.p2 = 0.5;
  this.step = 0.05
  this.ctx.strokeStyle = "white";
  this.ctx.lineWidth = 5;
};

Pong.prototype.update = function() {
  this.ball.x += this.step * Math.cos(this.ball.a);
  this.ball.y += this.step * Math.sin(this.ball.a);

  if (this.ball.y < 0) {
    this.ball.a *= -1;
  }

  if (this.ball.y > 1) {
    this.ball.a *= -1;
  }

  if (this.ball.x < 0.1) {
    this.ball.a -= PI;
    this.ball.a *= -1;
  }

  if (this.ball.x > 0.9) {
    this.ball.a *= -1;
    this.ball.a -= PI;
  }

  if (this.ball.x > 0.5) {
    if (this.p1 > this.ball.y + 0.1) {
      this.p1 -= 0.05;
    } else {
      if (this.p1 < this.ball.y - 0.1) {
        this.p1 += 0.05;
      }
    }
    if (this.p2 != 0.5) {
      if (this.p2 > 0.5)
        this.p2 -= 0.05;
      else
        this.p2 += 0.05;
    }
  } else {
    if (this.p2 > this.ball.y + 0.1) {
      this.p2 -= 0.05;
    } else {
      if (this.p2 < this.ball.y - 0.1) {
        this.p2 += 0.05;
      }
    }
    if (this.p1 != 0.5) {
      if (this.p1 > 0.5)
        this.p1 -= 0.05;
      else
        this.p1 += 0.05;
    }
  }

  this.paint();
}

Pong.prototype.paint = function() {
  this.ctx.clearRect(0, 0, size, size);
  this.ctx.fillStyle = "black";

  this.ctx.fillRect(0, 0, size / 2 - 1, size);
  this.ctx.fillRect(size / 2 + 1, 0, size / 2 - 1, size);

  this.ctx.strokeCircle(size / 2, size / 2, 25);

  this.ctx.fillStyle = "#0f0";
  this.ctx.fillCircle(this.ball.x * size, this.ball.y * size, 12);
  this.ctx.fillStyle = "#f00";
  this.ctx.fillRect(size - 17, size * this.p1 - 10, 6, 20);
  this.ctx.fillRect(11, size * this.p2 - 10, 6, 20);
}

/*
     FILE ARCHIVED ON 21:08:17 Oct 03, 2016 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 19:35:41 Apr 07, 2019.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  LoadShardBlock: 52.317 (3)
  esindex: 0.02
  captures_list: 88.974
  CDXLines.iter: 14.329 (3)
  PetaboxLoader3.datanode: 53.556 (4)
  exclusion.robots: 0.402
  exclusion.robots.policy: 0.378
  RedisCDXSource: 16.739
  PetaboxLoader3.resolve: 45.9
  load_resource: 190.455
*/