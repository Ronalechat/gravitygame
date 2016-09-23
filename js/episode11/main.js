var planet;
var phobos;

window.onload = function() {
	var canvas = document.getElementById("canvas"),
		context = canvas.getContext("2d"),
		width = canvas.width = window.innerWidth,
		height = canvas.height = window.innerHeight,
		sun = particle.create(width / 2, height / 2, 0, 0);
		planet = particle.create(width / 2 + 200, height / 2, 10, -Math.PI / 2);
		phobos = particle.create(width / 2 + 180, height / 2 + 50, 11, -Math.PI / 2);
		venus = particle.create(width / 2 + 210, height / 2 + 50, 9, -Math.PI / 2);
		mars = particle.create(width / 2 + 215, height / 2 + 50, 8, -Math.PI / 2);
		jupiter = particle.create(width / 2 + 220, height / 2 + 50, 11, -Math.PI / 2);
		asteroid = particle.create(width / 2 - 470, height / 2 + 50, 1, -Math.PI / 5);

	sun.mass = 20000;

	jupiter.mass = 5000;
	//planet.mass = 5700;

// var controls = {
// 	planetMass: 6700,
// };
//
//   var gui = new dat.GUI();
//   var pMass = gui.add(controls, 'planetMass', 6300, 6400);
//
// 	pMass.onFinishChange(function(value){
// 		planet.mass = value;
// 	});
	//
  // gui.add(text, 'speed', -5, 5);
  // gui.add(text, 'displayOutline');
  // gui.add(text, 'explode');


	update();

// Kill mass.
$(document).keydown(function(e) {
      switch(e.which) {
          case 40: // down
          sun.mass = 0;
          break;

					case 39: // right
					sun.mass += 1200;
					console.log(sun.mass);
          break;

					case 37: // left
          console.log(sun.mass);
          break;


          default: return; // exit this handler for other keys
      }
      e.preventDefault(); // prevent the default action (scroll / move caret)
  });

	$(document).keyup(function(e) {
      switch(e.which) {
          case 39: // right
					sun.mass = 20000;
					console.log(sun.mass);
          break;

          default: return; // exit this handler for other keys
      }
      e.preventDefault(); // prevent the default action (scroll / move caret)
  });

	function update() {
		context.clearRect(0, 0, width, height);

		planet.gravitateTo(sun);
		planet.update();
		phobos.gravitateTo(sun);
		phobos.update();
		venus.gravitateTo(sun);
		venus.update();
		mars.gravitateTo(sun);
		mars.update();
		jupiter.gravitateTo(sun);
		jupiter.update();
		asteroid.gravitateTo(jupiter);
		asteroid.update();




		context.beginPath();
		context.fillStyle = "#ffff00";
		context.arc(sun.position.getX(), sun.position.getY(), 20, 0, Math.PI * 2, false);
		context.fill();

		context.beginPath();
		context.fillStyle = "#0000ff";
		context.arc(planet.position.getX(), planet.position.getY(), 5, 0, Math.PI * 2, false);
		context.fill();


		context.beginPath();
		context.fillStyle = "#ff00ff";
		context.arc(phobos.position.getX(), phobos.position.getY(), 2, 0, Math.PI * 3, false);
		context.fill();

		context.beginPath();
		context.fillStyle = "#11ff11";
		context.arc(venus.position.getX(), venus.position.getY(), 10, 0, Math.PI * 2, false);
		context.fill();

		context.beginPath();
		context.fillStyle = "#ff1111";
		context.arc(mars.position.getX(), mars.position.getY(), 8, 0, Math.PI * 4, false);
		context.fill();

		context.beginPath();
		context.fillStyle = "#C2B186";
		context.arc(jupiter.position.getX(), jupiter.position.getY(), 8, 0, Math.PI * 3, false);
		context.fill();

		context.beginPath();
		context.fillStyle = "#D3D3D3";
		context.arc(asteroid.position.getX(), asteroid.position.getY(), 3, 0, Math.PI * 5, false);
		context.fill();

		// animation goes here

		requestAnimationFrame(update);
	};
};
