// 1. Create a visible drawing board with size parameters
await Canvas();
// make gravity stronger so falling feels snappier
world.gravity.y = 40;

let gameStarted = false;
let musicStarted = false;
let bgMusic = new Audio('sounds/game-music.mp3');
bgMusic.loop = true;

function startGame() {
	if (gameStarted) return;
	gameStarted = true;
	const startScreen = document.getElementById('start-screen');
	if (startScreen) startScreen.style.display = 'none';
	if (!musicStarted) {
		bgMusic.play().catch(() => {});
		musicStarted = true;
	}
}

const startButton = document.getElementById('start-button');
if (startButton) {
	startButton.addEventListener('click', startGame);
}
window.addEventListener('keydown', (event) => {
	if (!gameStarted && (event.key === 'Enter' || event.key === ' ')) {
		event.preventDefault();
		startGame();
	}
});

let backgrounds = [
	{top: '#00a2ff', bottom: '#551A8B', accent: '#56F6FF', label: 'LEVEL 1'},
	{top: '#e8d174', bottom: '#FF5E3A', accent: '#FFD86B', label: 'LEVEL 2'},
	{top: '#000245', bottom: '#8AE39B', accent: '#FF66C4', label: 'LEVEL 3'}
];
let bgIndex = 0;
let bgFlash = 0;
let shake = 0;
let hitRightWall = false;
// jump control
let jumpLocked = false;
let prevJumpKey = false;

function resetGame() {
	jumpLocked = false;
	hitRightWall = false;
	if (currentLevel === 1) {
	slime.x = -820;
	slime.y = 0;
	}
	else if (currentLevel === 2) {
	slime.x = 0;
	slime.y = -180;
	}
	else {
	slime.x = -820;
	slime.y = 20;
	}
	slime.vel.x = 0;
	slime.vel.y = 0;
}

function nextBackground() {
	bgIndex = (bgIndex + 1) % backgrounds.length;
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
	textAlign(CENTER, TOP);
	text(bg.label, 0, -400);
}

let slime = new Sprite();
slime.scale = 5;
slime.x = -820;
slime.y = 20;
slime.img = 'images/Slime.png';
slime.physics = DYNAMIC;
slime.bounciness = 0.1;
slime.fixedRotation = true;
slime.allowRotation = false;
slime.rotation = 0;
slime.angle = 0;
slime.angularVelocity = 0;
slime.angularVel = 0;
slime.w = 38;
slime.h = 22;

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
spike.w = 7;
spike.h = 16;
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

let block7 = new Group();
block7.physics = STATIC;
block7.w = 8;
block7.h = 10;
block7.img = 'images/Block7.png';
block7.tile = '7';
block7.bounciness = 0;
block7.scale = 5;

let block9 = new Group();
block9.physics = STATIC;
block9.w = 8;
block9.h = 10;
block9.img = 'images/Block9.png';
block9.tile = '9';
block9.bounciness = 0;
block9.scale = 5;

let tiles3 = [
	'                      79                        ',
	'                                                ',
	'                                                ',
	'                                                ',
	'====================SSSSSS======================', 
	'DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
	'DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
	'DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
	'DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
	'DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
	'DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
	'DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
	'DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
	'DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
	'DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
];


let tiles2 = [
	'======  79    79    79                 7DDDDDDDD',
	'                                 79             ',
	'                           79                   ',
	'												 ',
	'                                                ',
	'SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS',
	'DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
	'DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
	'DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
	'DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
	'DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
	'DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
	'DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
	'DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
	'DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
	'DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',
];

let tiles1 = [
	'DDDDDDDDDDDDDDDDDDD        DDDDDDDDDDDDDDDDDDDDD',
	'DDDDDDDDDDDDDDDDDDD        DDDDDDDDDDDDDDDDDDDDD',
	'DDDDDDDDDDDDDDDDDDD        DDDDDDDDDDDDDDDDDDDDD',
	'DDDDDDDDDDDDDDDDDDD    SS  DDDDDDDDDDDDDDDDDDDDD',
	'DDDDDDDDDDDDDDDDDDD        DDDDDDDDDDDDDDDDDDDDD',
	'DDDDDDDDDDDDDDDDDDDS       DDDDDDDDDDDDDDDDDDDDD',
	'DDDDDDDDDDDDDDDDDDD        DDDDDDDDDDDDDDDDDDDDD',
	'DDDDDDDDDDDDDDDDDDD       SDDDDDDDDDDDDDDDDDDDDD',
	'DDDDDDDDDDDDDDDDDDD        DDDDDDDDDDDDDDDDDDDDD',
	'DDDDDDDDDDDDDDDDDDDSS      DDDDDDDDDDDDDDDDDDDDD',
	'',
	'',
	'',
	'',
	'',
	'',
	'',
	'',
	'',
	'',
	'',
];

let level = new Group();
let levelTiles = [tiles1, tiles2, tiles3];
let currentLevel = 0;

function setLevel(index) {
	for (let i = level.length - 1; i >= 0; i--) {
		level[i].delete();
	}
	level = new Group();
	level.collider = 'static';
	level.addTiles(levelTiles[index], -900, 100, 40, 25);
}

setLevel(currentLevel);


q5.update = function () {
	if (!gameStarted) {
		drawBackground();
		return;
	}

	if (shake > 0) {
		push();
		translate(random(-shake, shake), random(-shake, shake));
		shake -= 1;
	}

	drawBackground();

	// keep the slime upright
	slime.rotation = 0;
	slime.angle = 0;
	slime.angularVelocity = 0;
	slime.angularVel = 0;
	slime.fixedRotation = true;

	// Controls
	if (kb.pressing('left')) slime.vel.x = -5;
	else if (kb.pressing('right')) slime.vel.x = 5;
	else slime.vel.x = 0;

	// Jump: edge-detect key-down and only allow a jump when grounded
	let jumpKey = kb.pressing('up') || kb.pressing('w') || kb.pressing('space');
	let grounded = slime.collides(level) || Math.abs(slime.vel.y || 0) < 0.6;
	if (jumpKey && !prevJumpKey && grounded && !jumpLocked) {
		slime.vel.y = -12;
		jumpLocked = true;
	}
	if (kb.pressing('down') || kb.pressing('s')) {
		slime.vel.y = 12;
	}
	if (grounded) {
		jumpLocked = false;
	}
	prevJumpKey = jumpKey;

	if (slime.collides(spike)) {
		resetGame();
	}

	let hittingRight = slime.collides(wallRight);

	if (hittingRight && !hitRightWall) {
		hitRightWall = true;

		// Teleport player away from wall immediately
		slime.x = -800;
		slime.y = 50;
		slime.vel.x = 0;
		slime.vel.y = 0;

		// Swap level and background
		currentLevel++;
		setLevel(currentLevel);
		nextBackground();
	}

	if (!hittingRight) {
		hitRightWall = false;
	}

	if (shake > 0) {
		pop();
	}
};