// 1. Create a visible drawing board with size parameters
await Canvas();
world.gravity.y = 1;

let ball = new Sprite();
ball.x = 0;
ball.y = -200;
ball.diameter = 50;
ball.img = '🤪';
ball.physics = DYNAMIC;
ball.bounciness = 0.1;

// 2. Define your tile blueprint properties
let ground = new Group();
ground.physics = STATIC;
ground.w = 8;
ground.h = 8;
ground.img = 'images/Block1.png';
ground.tile = '=';
ground.bounciness = 0;
ground.scale = 5;





let tiles = [
	'= = = = = = = = = = = ======================================'
];

let level = new Group()
level.addTiles(tiles, -900, height / 2 - 50, 40, 50);

q5.update = function () {
	background('skyblue');

	// Display UI text relative to player position
	text('click or press W / S to jump!', ball.x - 70, ball.y - 50);

	// Controls
	if (kb.pressing('left')) ball.vel.x = -5;
	else if (kb.pressing('right')) ball.vel.x = 5;
	else ball.vel.x = 0;

	if (kb.pressing('up')) ball.vel.y = -5;
	else if (kb.pressing('down')) ball.vel.y = 5;
	else ball.vel.y = 0;
};
