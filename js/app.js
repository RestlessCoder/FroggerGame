/*<!-------------- Enemy Section -------------->*/

// Enemies our player must avoid
var Enemy = function(x, y, sprite) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
   
    
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/*<!-------------- Player Section -------------->*/

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y, sprite) {
	this.x = x;
	this.y = y;
	this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function(dt) {
	// Avoid character from moving beyond the wall
	if(this.x < 0) {  // Check the left wall
		this.x = 0;
	}else if(this.x > 400) { // Check the right wall
		this.x = 400; 
	}else if(this.y > 400) { // Check the bottom wall
		this.y = 400;
	}

	// Check for player reaching top of canvas and winning the point
	if(this.y < 30) {
		this.x = 200;
		this.y = 400;
	}
};

Player.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keyCode_value) {
	switch(keyCode_value) {
		case 'left':
			this.x -= 100;
			break;
		case 'up':
			this.y -= 85;
			break;
		case 'right':
			this.x += 100;
			break
		case 'down':
			this.y += 85;
	}

};


/*<!-------------- Instantiate Objects -------------->*/

// Multiple enemy instance from Enemy Class
var enemy1 = new Enemy(50,225); // row 1
var enemy2 = new Enemy(300, 140);  // row 2
var enemy3 = new Enemy(100, 140);  // row 2
var enemy4 = new Enemy(200, 60);  // row 3

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [enemy1, enemy2, enemy3, enemy4];
var player = new Player(200,400);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
