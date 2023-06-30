// Provides for the functionality of the fireball

class Particle {
  constructor(game) {
    this.game = game;
    this.markedForDeletion = false;
  }
  update() {
    this.x -= this.speedX + this.game.speed; //speed of particle in x
    this.y -= this.speedY; //speed of particle in y
    this.size *= 0.97; //decreasing the size
    if (this.size < 0.5) this.markedForDeletion = true; //when it is small enough delete it
  }
}

export class Dust extends Particle {
  constructor(game, x, y) {
    //location of particle depends on where player is
    super(game);
    this.size = Math.random() * 10 + 10;
    this.x = x;
    this.y = y;
    this.speedX = Math.random();
    this.speedY = Math.random();
    this.color = "rgba(100,100,255,0.2)";
  }
  draw(context) {
    context.beginPath();
    context.arc(this.x, this.y, this.size, 0, Math.PI * 2); //draws a circle
    context.fillStyle = this.color; //color of circle
    context.fill();
  }
}

export class Splash extends Particle {
  constructor(game, x, y) {
    super(game);
    this.size = Math.random() * 100 + 100;
    this.x = x - this.size * 0.4;
    this.y = y - this.size * 0.5;
    this.speedX = Math.random() * 6 - 4;
    this.speedY = Math.random() * 2 + 2;
    this.gravity = 0;
    this.image = document.getElementById("fire");
  }
  update() {
    super.update();
    this.gravity += 0.1;
    this.y += this.gravity;
  }
  draw(context) {
    context.drawImage(this.image, this.x, this.y, this.size, this.size);
  }
}

export class Fire extends Particle {
  constructor(game, x, y) {
    super(game);
    this.size = Math.random() * 100 + 50;
    this.x = x;
    this.y = y;
    this.speedX = 1;
    this.speedY = 1;
    this.image = document.getElementById("fire");
    this.angle = 0; // angle at which fire rotates
    this.va = Math.random() * 0.3 - 0.1; //rotation speed of angle
  }
  update() {
    super.update();
    this.angle += this.va;
    this.x += Math.sin(this.angle * 5) * 2;
  }
  draw(context) {
    context.save();
    context.translate(this.x, this.y); //coordinates of player where the fire is drawn
    context.rotate(this.angle);
    context.drawImage(
      this.image,
      -this.size * 0.5,
      -this.size * 0.5,
      this.size,
      this.size
    );
    context.restore();
  }
}