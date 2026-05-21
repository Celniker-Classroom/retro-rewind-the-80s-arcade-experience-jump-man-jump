// 1. Create a visible drawing board with size parameters
await Canvas();
// make gravity stronger so falling feels snappier
world.gravity.y = 40;

let backgrounds = [
	{top: '#00a2ff', bottom: '#551A8B', accent: '#56F6FF', label: 'DAYTIME',},
	{top: '#e8d174', bottom: '#FF5E3A', accent: '#FFD86B', label: 'SUNSET'},
	{top: '#000245', bottom: '#8AE39B', accent: '#FF66C4', label: 'NIGHTFALL'}
];
let bgIndex = 0;
let bgFlash = 0;
let shake = 0;
let hitRightWall = false;
// jump control
let jumpLocked = false; // prevents mid-air jumps
let prevJumpKey = false; // for edge detection

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
ball.x = -820;
ball.y = 20;
ball.img = 'images/Slime.png';
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
ground1.img = 'images/Block2.png';
ground1.tile = '=';
ground1.bounciness = 0;
ground1.scale = 5;

let spike = new Group();
spike.physics = STATIC;
spike.w = 8;
spike.h = 13;
spike.img = 'images/BlockS.png';
spike.tile = 'S';
spike.bounciness = 0;
spike.scale = 5;

let dirt = new Group();
dirt.physics = STATIC;
dirt.w = 8;
dirt.h = 13;
dirt.img = 'images/Block5.png';
dirt.tile = 'D';
dirt.bounciness = 0;
dirt.scale = 5;




let tiles = [
	'                        =                         ',
	'                                                  ',
	'                                                  ',
	'======================SSSSS========================', 
	'DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
	'DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
	'DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
	'DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
	'DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
	'DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
	'DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
	'DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
	'DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
	'DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
	'DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',

];

let level = new Group();
level.addTiles(tiles, -900, 100, 40, 25);


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

	// Jump: edge-detect key-down and only allow a jump when grounded
	let jumpKey = kb.pressing('up') || kb.pressing('w');
	// robust grounded check: collision OR almost-zero vertical velocity
	let grounded = ball.collides(level) || ball.collides(ground1) || Math.abs(ball.vel.y || 0) < 0.6;
	if (jumpKey && !prevJumpKey && grounded && !jumpLocked) {
		ball.vel.y = -12;
		jumpLocked = true;
	}
	// optional down key to drop faster
	if (kb.pressing('down') || kb.pressing('s')) {
		ball.vel.y = 12;
	}
	// unlock jumping when we land
	if (grounded) {
		jumpLocked = false;
	}
	prevJumpKey = jumpKey;

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