/*<!-------------- Enemy Section -------------->*/

// Enemies our player must avoid
var Enemy = function(x, y, speed, sprite) {
	'use strict';
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    // Initialise enemies speed
    this.speed = (Math.random() * 5) + 1;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
	'use strict';
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers. (Give the illusion of animation)
  	this.move(dt);  // the 'dt' parameter ensures the game runs at same speed for all computers.
  	this.newPosition(); // re-position after the right wall & change the speed of the enemies

};

Enemy.prototype.move = function(dt) {
	'use strict';
	this.x += this.speed + dt;
};

Enemy.prototype.newPosition = function() {
	'use strict';
	if(this.x > 500) {
		this.x = -1000;
		this.speed = (Math.random() * 10) + 2;
	}
};	

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
	'use strict';
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/*<!-------------- Player Section -------------->*/

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y, life, sprite) {
	'use strict';
	this.x = x;
	this.y = y;
	this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function(dt) {
	'use strict';
	this.avoidOffScreen(); // Avoid character from moving beyond the wall
	this.checkCollision(); // Collision between Player & Enemies
	this.receivePoints(); // Player received points by reaching top of the canvas
};

// Draw the player on the screen
Player.prototype.render = function() {
	'use strict';
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}; 

Player.prototype.avoidOffScreen= function() {
	'use strict';
	if(this.x < 0) {  // Check the left wall
		this.x = 0;
	} 

	if(this.x > 400) { // Check the right wall
		this.x = 400; 
	}

	if(this.y > 400) { // Check the bottom wall
		this.y = 400;
	}
};

Player.prototype.checkCollision = function() {
	'use strict';
	// Loop the allEnemies array
	for(var i = 0; i < allEnemies.length; i++) {
		// Check collision for player location and enemies location from x-axis and y-axis 
		if(this.x < allEnemies[i].x + 60 && // Check for right x-axis
			this.x + 60 > allEnemies[i].x && // Check for left x-axis
			this.y < allEnemies[i].y + 60 && // Check for right y-axis
			this.y + 60 > allEnemies[i].y) { // Check for left y-axis
				// Reset the player after collision
				this.reset();
				gameLife.decreaseLife();

		} 
	}
};

Player.prototype.receivePoints= function() {
	'use strict';
	// Check for player reaching top of canvas and winning a point
	if(this.y < 30) {
		this.reset();
		gameScore.scorePoint();
	}
};

Player.prototype.reset = function() {
	'use strict';
	this.x = 200;
	this.y = 400;
};

Player.prototype.handleInput = function(keyCode_value) {
	'use strict';
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

/*<!-------------- Spawn Gem -------------->*/

var Gem = function(x, y, sprite) {
	'use strict';
	// Set a random location in x-axis
	this.x = Math.floor(Math.random() * 5) * 101;
	// Set a random location in y-axis
	this.y = 60 + Math.floor(Math.random() * 3) * 83;
	// Random Images is pick in an gemImages array
	this.sprite = gemImages[Math.floor(Math.random() * 3)];
};

Gem.prototype.update = function() {
	'use strict';
	// Check collision for gem location and player location from x-axis and y-axis 
	if(player.x < this.x + 60 && // Check for right x-axis
		player.x + 60 > this.x && // Check for left x-axis
		player.y < this.y + 60 && // Check for right y-axis
		player.y + 60 > this.y) { // Check for left y-axis
			this.setNewLocation();
			// Player hit the gem will get 5 Points
			gameScore.score5Point();
	} 
};

Gem.prototype.render = function() {
	'use strict';
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y, 100, 160);
};

Gem.prototype.setNewLocation = function() {
	'use strict';
	this.x = Math.floor(Math.random() * 5) * 101;
	this.y = 60 + Math.floor(Math.random() * 3) * 83;
	this.sprite = gemImages[Math.floor(Math.random() * 3)];
};

/*<!-------------- Life Section -------------->*/

var Life = function(life) {
	'use strict';
	this.life = 5; // Set the player's with default lives
};

// Put information for lifes on the screen and when life is equal to zero(Game Over) 
Life.prototype.render = function() {
	'use strict';
	ctx.clearRect(0,0, 200, 50); // Clear the canvas and update the lifes
	ctx.font = '30px Arial';
	ctx.strokeStyle = '#FFF';
    ctx.lineWidth = 3;
	ctx.strokeText("LIFES: " + this.life, 50, 30);

	// Game Over display on the screen if your life is zero
	if(this.life === 0) {
		'use strict';
		ctx.drawImage(Resources.get('images/game-over.png'), 0, 0, 505, 606);
		ctx.font = '80px Arial';
		ctx.fillStyle = "#FFF";
		ctx.textAlign = "center";
		// First Line Text
		ctx.fillText("GAME OVER", 253, 280);
		// Second Line Text
		ctx.font = '35px Arial';
		ctx.fillText("Final Score: " + gameScore.score, 253, 380);
	}
	
}; 

Life.prototype.decreaseLife = function() {
	'use strict';
	if(this.life > 0) {
		this.life--;
	} 
};

/*<!-------------- Score Section -------------->*/
var Score = function(score) {
	'use strict';
	this.score = 0;
};

Score.prototype.render = function() {
	'use strict';
	ctx.clearRect(200, 0, 280, 50); // Clear the canvas and update the scores
	ctx.font = '30px Arial';
	ctx.strokeStyle = '#FFF';
    ctx.lineWidth = 3;
	ctx.strokeText("SCORES: " + this.score, 280, 30); 
};

Score.prototype.scorePoint = function() {
	'use strict';
	if(this.score >= 0) {
		this.score++;
	}
};

Score.prototype.score5Point = function() {
	'use strict';
	if(this.score >= 0) {
		this.score += 5;
	}
};


/*<!-------------- Instantiate Objects -------------->*/

// Multiple enemy instance from Enemy Class
var enemy1 = new Enemy(400,225); // row 1
var enemy2 = new Enemy(50, 140);  // row 2
var enemy3 = new Enemy(300, 140);  // row 2
var enemy4 = new Enemy(30, 60);  // row 3
var enemy5 = new Enemy(50, 60); // row 3

// Instantiate the objects
var gemImages = ['images/Gem Orange.png', 'images/Gem Blue.png', 'images/Gem Green.png'];
var allGems = new Gem();
var gameScore = new Score();
var gameLife = new Life();

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5];
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



