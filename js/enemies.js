// Provides for the functionality of the enemies

class Enemy {
  //super class( Parent) will define the properties and methods shared between all enemy types
  constructor() {
    this.frameX = 0;
    this.frameY = 0;
    this.fps = 20;
    this.frameInterval = 1000 / this.fps;
    this.frameTimer = 0;
    this.markedForDeletion = false; //use to delete enemies off screen
  }
  update(deltaTime) {
    // movement
    this.x -= this.speedX + this.game.speed; // accounts for game speed plus speed of image
    this.y += this.speedY;
    // essentially only when frametime is greater than frame interval do we increase the frame
    //we have set it to 20 fps each means two frames per second.
    //this works just like the player code
    if (this.frameTimer > this.frameInterval) {
      this.frameTimer = 0;
      if (this.frameX < this.maxFrame) this.frameX++;
      else this.frameX = 0;
    } else {
      this.frameTimer += deltaTime;
    }
    // check if off screen
    if (this.x + this.width < 0) this.markedForDeletion = true;
  }
  draw(context) {
    //same as creating a player
    if (this.game.debug)
      context.strokeRect(this.x, this.y, this.width, this.height);
    context.drawImage(
      this.image,
      this.frameX * this.width,
      0,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}
//CHILD (sub) classes of Enemy, will have specific methods and properties available
export class FlyingEnemy extends Enemy {
  constructor(game) {
    super(); //Runs all the code from parents constructor
    this.game = game; //need to be aware of game's width and height so we pass game
    this.width = 60; // each enemy has a different width and height so we can't pass it on parent
    this.height = 44;
    this.x = this.game.width + Math.random() * this.game.width * 0.5; // starting coordinate x
    this.y = Math.random() * this.game.height * 0.5; // starting coordinate Y - above half screen
    this.speedX = Math.random() + 1; //MOVEMENT SPEED ON X
    this.speedY = 0; //MOVEMENT SPEED ON Y
    this.maxFrame = 5; //how many frames for this sprite/animation
    this.image = document.getElementById("enemy_fly"); //each enemy has a different sprite
    this.angle = 0; //for flying enemies sin function which gives it movement pattern
    this.va = Math.random() * 0.1 + 0.1; // for flying enemies sin calculation - increases angle
  }
  update(deltaTime) {
    super.update(deltaTime);
    this.angle += this.va;
    this.y += Math.sin(this.angle);
  }
}

export class GroundEnemy extends Enemy {
  constructor(game) {
    super(); //Runs all the code from parents constructor
    this.game = game;
    this.width = 60;
    this.height = 87;
    this.x = this.game.width;
    this.y = this.game.height - this.height - this.game.groundMargin;
    this.speedX = 0;
    this.speedY = 0;
    this.maxFrame = 1;
    this.image = document.getElementById("enemy_plant");
  }
}

export class ClimbingEnemy extends Enemy {
  constructor(game) {
    super(); //Runs all the code from parents constructor
    this.game = game;
    this.width = 120;
    this.height = 144;
    this.x = this.game.width;
    this.y = Math.random() * this.game.height * 0.5; //randomly spawns in the upper half of screen
    this.speedX = 0;
    this.speedY = Math.random() > 0.5 ? 1 : -1; //some spiders move up and others down
    this.maxFrame = 5;
    this.image = document.getElementById("enemy_spider_big");
  }
  update(deltaTime) {
    // makes the enemy move up whenever it touches down
    super.update(deltaTime);
    if (this.y > this.game.height - this.height - this.game.groundMargin)
      this.speedY *= -1;
    if (this.y < -this.height) this.markedForDeletion = true;
  }
  draw(context) {
    if (this.game.debug) {
      context.strokeRect(this.x, this.y, this.width, this.height);
    }
    super.draw(context);
    context.strokeStyle = "white";
    context.beginPath(); //built in function where to begin drawing
    context.moveTo(this.x + this.width * 0.5, 0); //initial coordinates
    context.lineTo(this.x + this.width * 0.5, this.y + 45); //ending coordinates
    context.stroke(); //draw the line
  }
}
