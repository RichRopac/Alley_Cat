// Provides the functionality for the main game page

import { Player } from "./player.js";
import { InputHandler } from "./input.js";
import { Background } from "./background.js";
import { FlyingEnemy, ClimbingEnemy, GroundEnemy } from "./enemies.js";
import { UI } from "./UI.js";

const playAgain = document.getElementById("play-again");
playAgain.addEventListener("click", () => {
  location.reload();
});

window.addEventListener("load", function () {
  /** @type {HTMLCanvasElement} */
  const thePlayer = localStorage.getItem("whichPlayer");
  const player = document.getElementById("player");
  player.src = thePlayer;
  const canvas = document.getElementById("canvas");
  const canvas2 = document.getElementById("scores");
  const ctx = canvas.getContext("2d");
  const ctx2 = canvas2.getContext("2d");
  canvas.width = 1000;
  canvas.height = 700;

  class Game {
    constructor(width, height) {
      this.width = width;
      this.height = height;
      this.groundMargin = 40;
      this.speed = 0;
      this.maxSpeed = 3;
      this.background = new Background(this);
      this.player = new Player(this);
      this.input = new InputHandler(this);
      this.UI = new UI(this);
      this.enemies = [];
      this.particles = [];
      this.collisions = [];
      this.floatingMessages = [];
      this.maxParticles = 50;
      this.enemyTimer = 0;
      this.enemyInterval = 1000;
      this.debug = false;
      this.score = 0;
      this.shadowColor = "black";
      this.fontColor = "green";
      this.time = 0;
      this.maxTime = 40000;
      this.gameOver = false;
      this.lives = 5;
      this.player.currentState = this.player.states[0];
      this.player.currentState.enter();
    }
    update(deltaTime) {
      this.time += deltaTime;
      if (this.time > this.maxTime) this.gameOver = true;
      this.background.update();
      this.player.update(this.input.keys, deltaTime);
      // handle enemies
      if (this.enemyTimer > this.enemyInterval) {
        this.addEnemy();
        this.enemyTimer = 0;
      } else {
        this.enemyTimer += deltaTime;
      }
      this.enemies.forEach((enemy, index) => {
        enemy.update(deltaTime);
        if (enemy.markedForDeletion) {
          this.enemies.splice(index, 1);
        }
      });
      // handle particles
      this.particles.forEach((particle, index) => {
        particle.update();
        if (particle.markedForDeletion) {
          this.particles.splice(index, 1);
        }
      });
      // handle collision sprites
      this.collisions.forEach((collision, index) => {
        collision.update(deltaTime);
        if (collision.markedForDeletion) {
          this.collisions.splice(index, 1);
        }
      });
      // handle floating messages
      this.floatingMessages.forEach((message, index) => {
        message.update();
        if (message.markedForDeletion) {
          this.floatingMessages.splice(index, 1);
        }
      });
    }
    draw(context) {
      this.background.draw(context);
      this.player.draw(context);
      this.enemies.forEach((enemy) => {
        enemy.draw(context);
      });
      this.particles.forEach((particle) => {
        particle.draw(context);
      });
      this.collisions.forEach((collision) => {
        collision.draw(context);
      });
      this.floatingMessages.forEach((message) => {
        message.draw(context);
      });
      this.UI.draw(context);
    }
    addEnemy() {
      if (this.speed > 0 && Math.random() < 0.5) {
        this.enemies.push(new GroundEnemy(this));
      } else if (this.speed > 0) {
        this.enemies.push(new ClimbingEnemy(this));
      }
      this.enemies.push(new FlyingEnemy(this));
    }
  }

  const game = new Game(canvas.width, canvas.height);
  let lastTime = 0;

  function animate(timeStamp) {
    const deltaTime = timeStamp - lastTime;

    lastTime = timeStamp;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.update(deltaTime);
    game.draw(ctx);

    let lives = game.lives;
    let score = game.score;
    let time = Math.floor(game.time / 1000);

    ctx2.clearRect(0, 0, 400, 500);
    ctx2.font = "60px Gloria Hallelujah";
    ctx2.fillStyle = "green";
    ctx2.fillText("Level:  1", 50, 120);
    ctx2.fillText("Time:  " + time, 50, 210);
    ctx2.fillText("Score:  " + score, 50, 300);
    ctx2.fillText("Lives:  " + lives, 50, 390);
    // for (let i = 0; i < this.game.lives; i++) {
    //  ctx2.drawImage(this.livesImage, 25 * i + 20, 95, 25, 25);
    // }

    if (!game.gameOver) requestAnimationFrame(animate);
  }
  animate(0);
});
