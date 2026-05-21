// 1. Create a visible drawing board with size parameters
await Canvas();
// make gravity stronger so falling feels snappier
world.gravity.y = 40;

let backgrounds = [
	{top: '#00a2ff', bottom: '#551A8B', accent: '#56F6FF', label: 'DAYTIME',},
	{top: '#e8d174', bottom: '#FF5E3A', accent: '#FFD86B', label: 'SUNSET STRIKE'},
	{top: '#000245', bottom: '#8AE39B', accent: '#FF66C4', label: 'RADIAL RUSH'}
];
let bgIndex = 0;
let bgFlash = 0;
let shake = 0;
let hitRightWall = false;
// sprite states
const idleSprite = 'images/slimeIdle.gif';
const moveSprite = 'images/slimeSlow.gif';
let ballMoving = false;

function nextBackground() {
	bgIndex = (bgIndex + 1) % backgrounds.length;
	ball.x = -800;
    ball.y = 50;
}

function drawBackground() {
	let bg = backgrounds[bgIndex];
	background(bg.top);

	noStroke();
	fill(bg.bottom);
	rect(0, height * 0.5, width, height * 0.5);

	if (bgFlash > 0) {
		fill(bg.accent);
		ellipse(width * 0.5, height * 0.25, bgFlash * 10, bgFlash * 10);
		bgFlash -= 1;
	}

	fill(255, 220);
	textSize(24);
	textAlign(CENTER, CENTER);
	text(bg.label, width * 0.5, 36);
}

let ball = new Sprite();
ball.scale = 5;
ball.x = 8
ball.y = 8;
ball.img = idleSprite;
ball.physics = DYNAMIC;
ball.bounciness = 0.1;
// prevent the ball from rotating (no rolling) — set multiple fallbacks
ball.fixedRotation = true;
ball.allowRotation = false;
ball.rotation = 0;
ball.angle = 0;
ball.angularVelocity = 0;
ball.angularVel = 0;
// tighten collision box so the visible sprite sits above the ground before colliding
ball.w = 24;
ball.h = 22;

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
ground2.h = 13;
ground2.img = 'images/BlockS.png';
ground2.tile = 'S';
ground2.bounciness = 0;
ground2.scale = 5;




let tiles = [
	'                                                  ',
	'======================SSSSS========================', 
];

let level = new Group()
level.addTiles(tiles, -900, height / 2 - 50, 40, 50);

q5.update = function () {
	if (shake > 0) {
		push();
		translate(random(-shake, shake), random(-shake, shake));
		shake -= 1;
	}

	drawBackground();

	// keep the ball upright: clear any angular velocity or rotation each frame
	ball.rotation = 0;
	ball.angle = 0;
	ball.angularVelocity = 0;
	ball.angularVel = 0;
	ball.fixedRotation = true;




	// Controls
	if (kb.pressing('left')) ball.vel.x = -5;
	else if (kb.pressing('right')) ball.vel.x = 5;
	else ball.vel.x = 0;

	// Jump: use single-press to give an initial upward velocity
	if (kb.pressed('up') || kb.pressed('w')) {
		ball.vel.y = -12;
	}
	if (kb.pressed('down') || kb.pressed('s')) {
		ball.vel.y = 12;
	}

	// animate sprite: switch to idle when nearly still, otherwise moving animation
	let speed = Math.sqrt((ball.vel.x || 0) * (ball.vel.x || 0) + (ball.vel.y || 0) * (ball.vel.y || 0));
	let moving = speed > 0.6;
	if (moving && !ballMoving) {
		ball.img = moveSprite;
		ballMoving = true;
	}
	if (!moving && ballMoving) {
		ball.img = idleSprite;
		ballMoving = false;
	}

	let hittingRight = ball.collides(wallRight);
	if (hittingRight && !hitRightWall) {
		nextBackground();
		hitRightWall = true;
	}
	if (!hittingRight) {
		hitRightWall = false;
	}

	if (shake > 0) {
		pop();
	}
};