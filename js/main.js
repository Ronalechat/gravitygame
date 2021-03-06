var myGamePiece;
var demoGamePiece; // FIXME: Make this object later.
var slowDown = 0;
var slowDownStep = 0;

var direction = "";

var floorPosition = 0;

var tickRate = 10;

$(document).ready(function(){

  var startGame = function() {
      myGamePiece = new component(30, 30, "red", 60, 120);
      demoGamePiece = new component(30, 30, "blue", 600, 120);
      myGameArea.start();
  }

  var myGameArea = {
      canvas : document.getElementById("canvas"),
      start : function() {
          this.canvas.width = 800;
          this.canvas.height = 500;
          this.context = this.canvas.getContext("2d");

          floorPosition = myGameArea.canvas.height - 8;

          this.interval = setInterval(updateGameArea, tickRate);
      },
      clear : function() {
          this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      }
  }


  var gravitate = function (attractor, attracted) {

    var direction;

    var distX = (attractor.x - attracted.x);

    if (attractor.x > attracted.x) {
      direction = 1;
    } else {
      direction = -1;
    }


    // var distY = Math.abs(attractor.y - attracted.y);

    var force = (1.0 / (distX * distX)) * direction * 0.5 ;

    attracted.speedX += force * attracted.x;

  }


  var component = function(width, height, color, x, y) {

      this.width = width;
      this.height = height;
      this.speedX = 0;
      this.speedY = 0;
      this.x = x;
      this.y = y;
      this.update = function() {
          ctx = myGameArea.context;
          ctx.fillStyle = color;
          ctx.fillRect(this.x, this.y, this.width, this.height);

      }

      this.newPos = function() {

        this.speedY += 0.27;
        this.x += this.speedX;
        this.y += this.speedY;

        // collision detection (floor)
        if ( this.height + this.y >=  floorPosition ) {
          this.y = floorPosition - this.height;
        }
      } //newpos()
  }

  var updateGameArea = function() {

      gravitate(myGamePiece, demoGamePiece);

      myGameArea.clear();
      myGamePiece.newPos();
      myGamePiece.update();
      demoGamePiece.newPos();
      demoGamePiece.update();

      if(direction === "right" ){
        if(myGamePiece.speedX > 0 ) {
          myGamePiece.speedX -= slowDownStep;
          if ( Math.abs(myGamePiece.speedX) < 0.04 ) {
            myGamePiece.speedX = 0;
          }
        }
      }; // end slowdown
      if(direction === "left"){
        if(myGamePiece.speedX < 0 ) {
          myGamePiece.speedX -= slowDownStep;
          if ( Math.abs(myGamePiece.speedX) < 0.04 ) {
            myGamePiece.speedX = 0;
          }
        }

      }; // end slowdown
  }


  // Gravity: (mass / (dist * dist))

  // Key press checker! ////////////
  $(document).keydown(function(e) {
      switch(e.which) {

          case 37: // left
          if(myGamePiece.speedX > -4){
            myGamePiece.speedX -= 1;
          }
          break;

          case 38: // up
          if (myGamePiece.y === (floorPosition - myGamePiece.height)) {
            myGamePiece.speedY = -8.5;
          }
          break;

          case 39: // right
          if(myGamePiece.speedX < 4) {
            myGamePiece.speedX += 1;
          }
          break;

          // FIXME: Need to properly impliment the mass/gravity model.
          case 40: // down
          myGamePiece.mass += 3000;
          break;

          default: return; // exit this handler for other keys
      }
      e.preventDefault(); // prevent the default action (scroll / move caret)
  });

  $(document).keyup(function(e) {
      switch(e.which) {

          case 37: // left
          direction = "left";
          slowDown = 30;
          slowDownStep = myGamePiece.speedX / slowDown;
          break;

          case 39: // right
          direction = "right";
          slowDown = 30;
          slowDownStep = myGamePiece.speedX / slowDown;
          break;

          case 40: // down
          myGamePiece.mass = 0;
          break;

          default: return; // exit this handler for other keys
      }
      e.preventDefault(); // prevent the default action (scroll / move caret)
  });
  startGame()
});
