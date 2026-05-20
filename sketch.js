// 1. Create a visible drawing board with size parameters
await Canvas(); 
world.gravity.y = 0;

let ball = new Sprite();
ball.x = 400; // Place the ball over the ground
ball.y = 100;
ball.diameter = 50;
ball.img = '🤪';

// 2. Define your tile blueprint properties
let grass = new Sprite();

grass.w = 8; 
grass.h = 8;
grass.img = 'images/Block1.png';
grass.scale.x = 5;
grass.scale.y = 5;
grass.x = 0;
grass.y = 100;
grass.physics = STATIC; 

// 3. Create a level group container to spawn your level layout map

q5.update = function () {
	background('skyblue');
	
	// Keep the camera locked on your player

	// Display UI text relative to player position
	text('click or press W / S to jump!', ball.x - 70, ball.y - 50);

	// Controls
	if (kb.pressing('left')) player.vel.x = -5;
	else if (kb.pressing('right')) player.vel.x = 5;
	else player.vel.x = 0;

	if (kb.pressing('up')) player.vel.y = -5;
	else if (kb.pressing('down')) player.vel.y = 5;
	else player.vel.y = 0;
};
