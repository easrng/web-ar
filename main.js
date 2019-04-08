const PI4 = 0.785398;

//Main object
var processor = {
  // Init
  doLoad: function() {
    // Some init
    this.displayBackground = true;
    this.video = document.getElementById("video");
    this.mirrorVideo = document.getElementById("mirrorVideo");
    this.mirrorVideoCtx = this.mirrorVideo.getContext("2d");
    var self = this;
    
    // Init the pong pattern
    var pongCtx = document.getElementById("pong").getContext("2d");
    this.pong = new Pong(pongCtx);
    setInterval(function () {self.pong.update()}, 50);
    processor.updatePattern(document.getElementById("pong"), true)

    // ... some stuffs
    this.oldShape1 = null;
    this.oldShape2 = null;

    // Set the events listeners for the main video (update button)
    this.video.addEventListener("pause", function() { self.updateButtons(false); }, false);
    this.pageLoaded = true;
    this.startPlayer();

    var video = document.querySelector("#video");

    if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(function (stream) {
        video.srcObject = stream;
      })
        .catch(function (err) {
        console.log("Something went wrong!");
      });
    }
  },
  videoIsPlaying: function() {
      this.updateButtons(true);
      this.timerCallback();
  },
  videoIsReady: function() {
    this.videoLoaded = true;
    this.startPlayer();
  },
  startPlayer: function() {
    if (!this.videoLoaded || !this.pageLoaded) return;
    document.getElementById("wait").style.display = "none";
    document.getElementById("player").style.display = "block";
    this.width = this.video.videoWidth;
    this.height = this.video.videoHeight;
    this.mirrorVideo.width = this.width;
    this.mirrorVideo.height =  this.height;
    this.mirrorVideoCtx.fillStyle = "white";
    this.mirrorVideoCtx.strokeStyle = "black";
  },

  // Handle the click on patterns
  updatePattern: function(elt, bg) {
    this.pattern = null;
    var old = document.querySelector("*[pattern='true']");
    if (old) {
      old.removeAttribute("pattern");
    }
    elt.setAttribute("pattern", "true");
    this.pattern = elt;
    this.displayBackground = bg;
  },
  // Videos control
  playVideo: function() {
    this.video.play();
    this.videoIsPlaying();
  },
  stopVideo: function() {
    this.video.pause();
    clearTimeout(this.timeout);
  },
  // Main loop
  timerCallback: function() {
    if (this.video.paused || this.video.ended) {
      return;
    }
    this.computeFrame();
    var self = this;
    this.timeout = setTimeout(function () {
        self.timerCallback();
      }, 50);
  },

  // Update the SVG button
  updateButtons: function(play) {
    document.getElementById("playButton").setAttribute("play", play);
    document.getElementById("stopButton").setAttribute("play", play);
  },
  // Compute William's movements
  dist: function(x1, y1, x2, y2) {
    return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
  },
  computeFrame: function() {
    this.mirrorVideoCtx.clearRect(0, 0, this.width, this.height);
    try {
      this.mirrorVideoCtx.drawImage(this.video, 0, 0, this.width, this.height);
    } catch(e) {
      return;
    }
    var frame = this.mirrorVideoCtx.getImageData(0, 0, this.width, this.height);

    var cx = null;
    var cy = null;

    var x, y;

    var weight = 0;

    var shape1 = null;
    var shape2 = null;
    var currentPoint = null;

    var r, g, b, x, y;

    var D = 25;

    var l = frame.data.length / 4;

    // We dont' need to compute each pixels
    var step = 4;
    for (var i = 0; i < l; i += step) {
      r = frame.data[i * 4 + 0];
      g = frame.data[i * 4 + 1];
      b = frame.data[i * 4 + 2];

      x = i % this.width;
      y = Math.round(i / this.width);

      // Is it a white pixel ?
      if (r > 200 && b > 200 && g > 200) {
        if (!shape1) {
          // no shape yet, create the first one
          shape1 = {};
          shape1.x = x;
          shape1.y = y;
          shape1.weight = 1;
        } else {
          // This pixel is in the first or in the second shape ?
          var d = this.dist(x, y, shape1.x, shape1.y);
          if (d < D) {
            shape1.x += 1/(shape1.weight + 1) * (x - shape1.x);
            shape1.y += 1/(shape1.weight + 1) * (y - shape1.y);
            shape1.weight++;
          } else {
            if (!shape2) {
              shape2 = {};
              shape2.x = x;
              shape2.y = y;
              shape2.weight = 1;
            } else {
              var d = this.dist(x, y, shape2.x, shape2.y);
              if (d < D) {
                shape2.x += 1/(shape2.weight + 1) * (x - shape2.x);
                shape2.y += 1/(shape2.weight + 1) * (y - shape2.y);
                shape2.weight++;
              }
            }
          }
        }
      }
      // Too shaking
      // if (x >= (this.width - step)) i+= step * this.width;
    }
    // We didn't find any shape
    if (!shape1 || !shape2) return;

    // Ok, we've got all the needed shapes
    // Find the correct shape (to avoid a flip)
    if (this.oldShape1) {
      var dist1 = this.dist(shape1.x, shape1.y, this.oldShape1.x, this.oldShape1.y);
      var dist2 = this.dist(shape1.x, shape1.y, this.oldShape2.x, this.oldShape2.y);

      if (dist2 < dist1) {
        var tmp = shape2;
        shape2 = shape1;
        shape1 = tmp;
      }
    }

    // Save the shape positions
    this.oldShape1 = shape1;
    this.oldShape2 = shape2;

    // A set of transformations
    this.mirrorVideoCtx.save();

    var d = this.dist(shape1.x, shape1.y, shape2.x, shape2.y);
    var a = Math.acos((shape2.x - shape1.x) / d);
    var delta = d / 141;
    this.mirrorVideoCtx.translate(shape1.x, shape1.y);
    if (shape1.y > shape2.y)
      this.mirrorVideoCtx.rotate(-a - PI4);
    else
      this.mirrorVideoCtx.rotate(a - PI4);
    this.mirrorVideoCtx.scale(delta, delta);

    // Paint the pattern
    if (this.pattern) {
      if (this.displayBackground) {
        this.mirrorVideoCtx.fillRect(-2, -2, 104, 104);
        this.mirrorVideoCtx.strokeRect(-2, -2, 104, 104);
      }
      try {
        this.mirrorVideoCtx.drawImage(this.pattern, 0, 0, 100, 100);
      } catch(e){};
    }
    this.mirrorVideoCtx.restore();

    return;
  }
};
