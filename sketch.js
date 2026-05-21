// 1. Create a visible drawing board with size parameters
await Canvas();
// make gravity stronger so falling feels snappier
world.gravity.y = 40;


let ball = new Sprite();
ball.x = -800;
ball.y = 50;
ball.diameter = 50;
ball.img = '🤪';
ball.physics = DYNAMIC;
ball.bounciness = 0.1;

let wallLeft = new Sprite(-865, 200, 20, 2000, 'static');
let wallRight = new Sprite(865, 200, 20, 2000, 'static');

// 2. Define your tile blueprint properties
let ground1 = new Group();
ground1.physics = STATIC;
ground1.w = 8;
ground1.h = 8;
ground1.img = 'images/Block1.png';
ground1.tile = '=';
ground1.bounciness = 0;
ground1.scale = 5;

let ground2 = new Group();
ground2.physics = STATIC;
ground2.w = 8;
ground2.h = 8;
ground2.img = 'images/BlockS.png';
ground2.tile = 'S';
ground2.bounciness = 0;
ground2.scale = 5;




let tiles = [
	'                       S                           ',
	'==================================================='
];

let level = new Group()
level.addTiles(tiles, -900, height / 2 - 50, 40, 50);

q5.update = function () {
	background('skyblue');

	// Display UI text relative to player position
	text('Controls: WASD', -20, 0);

	// Controls
	if (kb.pressing('left')) ball.vel.x = -5;
	else if (kb.pressing('right')) ball.vel.x = 5;
	else ball.vel.x = 0;

	// Jump: use single-press to give an initial upward velocity
	// Don't continuously overwrite `ball.vel.y` each frame — allow gravity to act
	if (kb.pressed('up') || kb.pressed('w')) {
		ball.vel.y = -12;
	}
	if (kb.pressed('down') || kb.pressed('s')) {
		ball.vel.y = 12;
	}
};
