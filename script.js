const canvas = document.getElementById("main_canvas");
const ctx = canvas.getContext("2d");
const CANVAS_HEIGHT = (canvas.height = 700);
const CANVAS_WIDTH = (canvas.width = 1000);
let gameSpeed = 3; //for changing game speed; 0 is pause;

const background_layer1 = new Image();
const background_layer2 = new Image();
const background_layer3 = new Image();
const background_layer4 = new Image();
const background_layer5 = new Image();
const background_layer6 = new Image();

background_layer1.src = "/images/Backgrounds/Layers/layer-1.png";
background_layer2.src = "/images/Backgrounds/Layers/layer-2.png";
background_layer3.src = "/images/Backgrounds/Layers/layer-3.png";
background_layer4.src = "/images/Backgrounds/Layers/layer-4.png";
background_layer5.src = "/images/Backgrounds/Layers/layer-5.png";
background_layer6.src = "/images/Backgrounds/Layers/layer-6.png";

window.addEventListener("load", function () {
  class Layer {
    constructor(image, speedModifier) {
      this.x = 0;
      this.y = 0;
      this.width = 2713;
      this.height = 700;
      this.x2 = this.width;
      this.image = image;
      this.speedModifier = speedModifier;
      this.speed = gameSpeed * this.speedModifier;
    }
    update() {
      this.speed = gameSpeed * this.speedModifier;
      if (this.x <= -this.width) {
        this.x = this.width + this.x2 - this.speed;
      }
      if (this.x2 <= -this.width) {
        this.x2 = this.width + this.x - this.speed;
      }
      this.x = Math.floor(this.x - this.speed);
      this.x2 = Math.floor(this.x2 - this.speed);
    }
    draw() {
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
      ctx.drawImage(this.image, this.x2, this.y, this.width, this.height);
    }
  }

  const layer1 = new Layer(background_layer1, 0.0);
  const layer2 = new Layer(background_layer2, 0.2);
  const layer3 = new Layer(background_layer3, 0.4);
  const layer4 = new Layer(background_layer4, 0.5);
  const layer5 = new Layer(background_layer5, 0.8);
  const layer6 = new Layer(background_layer6, 0.1);

  const gameObjects = [ layer1, layer2, layer3, layer4, layer5, layer6];

  function animate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    gameObjects.forEach((object) => {
      object.update();
      object.draw();
    });
    requestAnimationFrame(animate);
  }
  animate();
});
