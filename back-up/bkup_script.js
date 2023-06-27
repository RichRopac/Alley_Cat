
let playerAction = "run";
const dropDownActionMenu = document.getElementById("animations");
dropDownActionMenu.addEventListener("change", function(e) {
  playerAction = e.target.value;
  switch (playerAction) {
    case "run" : 
    frameNumbers=43
    break;
  
    case "roll-jump" :
      frameNumbers=37
      break;
    
    case "jump" :
      frameNumbers=25
      break;
  
    case "killed" :
      frameNumbers=28
      break;
  }
});

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 600;

const playerImage = new Image();
let frame = 1;
let frameNumbers = 0;


let gameFrame = 0;
const staggerFrames = 10;    //Speeds up or slows down animation; 0 freezes and higher the number, slower it goes

function animate(){
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  playerImage.src = "./images/Bad Guy Hero/"+ playerAction +" (" + frame + ").png";
  //cts.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh)
  ctx.drawImage(playerImage, 50, 50);
  if (gameFrame % staggerFrames === 0){
  if (frame < frameNumbers) frame++;
  else frame = 1;
  }
  gameFrame++;
  requestAnimationFrame(animate);
  
};
animate();