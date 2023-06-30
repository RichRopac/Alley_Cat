// Provides the functionality for collision detection fo the enemies

export class CollisionAnimation {
  constructor(game, x, y) {
    this.game = game;
    this.image = document.getElementById("collisionAnimation");
    this.spriteWidth = 100;
    this.spriteHeight = 90;
    this.sizeModifier = Math.random() + 0.5;
    this.width = this.spriteWidth * this.sizeModifier; //randomized animation width
    this.height = this.spriteHeight * this.sizeModifier; //randomized animation height
    this.x = x - this.width * 0.5; //position it middle in X
    this.y = y - this.height * 0.5; //position it middle in Y
    this.frameX = 0;
    this.maxFrame = 4;
    this.markedForDeletion = false;
    this.fps = 20;
    this.frameInterval = 1000 / this.fps;
    this.frameTimer = 0;
  }
  update(deltaTime) {
    this.x -= this.game.speed; // makes the collision stay where it happpened in screen
    if (this.frameTimer > this.frameInterval) {
      this.frameX++;
      this.frameTimer = 0;
    } else {
      this.frameTimer += deltaTime;
    }
    if (this.frameX > this.maxFrame) this.markedForDeletion = true;
  }
  draw(context) {
    context.drawImage(
      this.image,
      this.frameX * this.spriteWidth,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}
