await Canvas();
world.gravity.y = 10;

let ball = new Sprite();
ball.diameter = 50;
ball.img = '🤪';

let grass = new Group();
grass.d = 24;
grass.img = 'images/grassBlock.png';
grass.tile = 'g';
grass.physics = STATIC;

let level = new Group();

level.addTiles(`
                                
gg                                      g

   gg
                                   g
      ggg                        g
                             g                
           ggg                                
                           
ggggggggggg   ggggg   gggggggggggg            ggg
`);

tile.physics = STATIC;

q5.update = function () {
	background('skyblue');
	text('click to jump!', 0, -50);

	if (mouse.presses()) ball.vel.y = -5;
	if (keyIsPressed && (key === 'w')) {
		ball.vel.y = -5;
	}
	if (keyIsPressed && (key === 's')) {
		ball.vel.y = 5;
	}
};
