/*<!-------------- Enemy Section -------------->*/

// Enemies our player must avoid
var Enemy = function(x, y, speed, sprite) {
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
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers. (Give the illusion of animation)
  	this.move(dt);  // the 'dt' parameter ensures the game runs at same speed for all computers.
  	this.newPosition(); // re-position after the right wall & change the speed of the enemies

};

Enemy.prototype.move = function(dt) {
	this.x += this.speed + dt;
}

Enemy.prototype.newPosition = function() {
	if(this.x > 500) {
		this.x = -1000;
		this.speed = (Math.random() * 10) + 2;
	}
}	

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/*<!-------------- Player Section -------------->*/

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y, life, sprite) {
	this.x = x;
	this.y = y;
	this.life = 3; // Set the player's with default lives
	this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function(dt) {
	this.avoidOffScreen(); // Avoid character from moving beyond the wall
	this.checkCollision(); // Collision between Player & Enemies
	this.receivePoints(); // Player received points by reaching top of the canvas
};

// Draw the player on the screen
Player.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}; 

Player.prototype.avoidOffScreen= function() {
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
	// Loop the allEnemies array
	for(var i = 0; i < allEnemies.length; i++) {
		// Check collision for player location and enemies location from x-axis and y-axis 
		if(player.x < allEnemies[i].x + 60 && // Check for right x-axis
			player.x + 60 > allEnemies[i].x && // Check for left x-axis
			player.y < allEnemies[i].y + 60 && // Check for right y-axis
			player.y + 60 > allEnemies[i].y) { // Check for left y-axis
				// Reset the player after collision
				this.reset();
				gameLife.decreaseLife();

		} 
	}
};

Player.prototype.receivePoints= function() {
	// Check for player reaching top of canvas and winning the point
	if(this.y < 30) {
		this.reset();
		gameScore.scorePoint();
	}
};

Player.prototype.reset = function() {
	this.x = 200;
	this.y = 400;
	
}

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

/*<!-------------- Life Section -------------->*/

var Life = function(life) {
	this.life = 3;
};

// Put information for lifes on the screen and when life is equal to zero(Game Over) 
Life.prototype.render = function() {
	ctx.clearRect(0,0, 505, 50); // Clear the canvas and update the lifes
	ctx.font = '30px Arial';
	ctx.fillStyle = "#0095DD";
	ctx.fillText("LIFES: " + this.life, 50, 30);
	
}; 

Life.prototype.decreaseLife = function() {
	if(this.life > 0) {
		this.life--;
	}
};

/*<!-------------- Score Section -------------->*/
var Score = function(score) {
	this.score = 0;
};

Score.prototype.render = function() {
	ctx.clearRect(280, 30, 0, 50); // Clear the canvas and update the lifes
	ctx.font = '30px Arial';
	ctx.fillStyle = "#0095DD";
	ctx.fillText("SCORES: " + this.score, 280, 30);
};

Score.prototype.scorePoint = function() {
	if(this.score >= 0) {
		this.score++;
	}
};


/*<!-------------- Instantiate Objects -------------->*/

// Multiple enemy instance from Enemy Class
var enemy1 = new Enemy(400,225); // row 1
var enemy2 = new Enemy(50, 140);  // row 2
var enemy3 = new Enemy(300, 140);  // row 2
var enemy4 = new Enemy(300, 60);  // row 3
var enemy5 = new Enemy(50, 60); // row 3
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5];
var player = new Player(200,400);
var gameScore = new Score();
var gameLife = new Life();


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



