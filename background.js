class Layer {
    constructor(game, width, height, speedModifier, image) {
      this.game = game;
      this.width = width;
      this.height = height;
      this.speedModifier = speedModifier;
      this.image = image;
      this.x = 0;
      this.y = 0;
    }
  
    update() {
      if (this.x < -this.width) this.x = 0;
      else this.x -= this.game.speed * this.speedModifier;
    }
  
    draw(context) {
      context.drawImage(this.image, this.x, this.y, this.width, this.height);
      context.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
    }
  }
  
  export class Background {
    constructor(game) {
      this.game = game;
      this.width = 1667;
      this.height = 700;
      this.layer1image = document.getElementById('layer1');
      this.layer2image = document.getElementById('layer2');
      this.layer3image = document.getElementById('layer3');
      this.layer4image = document.getElementById('layer4');
      this.layer5image = document.getElementById('layer5');
      this.layer6image = document.getElementById('layer6');
      this.theSunimage = document.getElementById('theSun');
      this.layer1 = new Layer(this.game, this.width, this.height, 0, this.layer1image);
      this.layer2 = new Layer(this.game, this.width, this.height, 0.2, this.layer2image);
      this.layer3 = new Layer(this.game, this.width, this.height, 0.4, this.layer3image);
      this.layer4 = new Layer(this.game, this.width, this.height, 0.8, this.layer4image);
      this.layer5 = new Layer(this.game, this.width, this.height, 1, this.layer5image);
      this.layer6 = new Layer(this.game, this.width, this.height, 0.2, this.layer6image);
      this.theSun = new Layer(this.game, this.width, this.height, 0, this.theSunimage);
      this.backgroundLayers = [this.layer1, this.layer2, this.layer3, this.layer4, this.layer5, this.layer6, this.theSun];
    }
  
    update() {
      this.backgroundLayers.forEach(layer => {
        layer.update();
      });
    }
  
    draw(context) {
      this.backgroundLayers.forEach(layer => {
        layer.draw(context);
      });
    }
  }
  


/* class Layer {
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

*/
