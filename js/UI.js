// Provides for the functionality of displaying gaming information on the main canvas

export class UI {
  constructor(game) {
    this.game = game; //needs to access score value from game
    this.fontSize = 30;
    this.fontFamily = "Gloria Hallelujah"; //TODO: find a style online how he showed us and use it
    this.livesImage = document.getElementById("lives");
    this.title;
    this.text;
  }
  draw(context) {
    context.save(); //following context ONLY affects this code
    context.font = this.fontSize + "px " + this.fontFamily;
    context.textAlign = "left";
    // score
    //.filltext() method draws filled text on the canvas sytax: (text,x,y,maxWidth)
    // context.fillStyle = this.game.shadowColor;
    // context.fillText("Score: " + this.game.score, 20, 50);
    // context.fillStyle = this.game.fontColor;
    // context.fillText("Score: " + this.game.score, 21, 51);
    // timer
    // context.font = this.fontSize * 0.8 + "px " + this.fontFamily;
    // context.fillStyle = this.game.shadowColor;
    // context.fillText("Time: " + (this.game.time * 0.001).toFixed(1), 20, 80);
    // context.fillStyle = this.game.fontColor;
    // context.fillText("Time: " + (this.game.time * 0.001).toFixed(1), 22, 82);
    //lives
    // for (let i = 0; i < this.game.lives; i++) {
    //   context.drawImage(this.livesImage, 25 * i + 20, 95, 25, 25);
    // }
    //game over options
    if (this.game.lives === 0) {
      this.title = "Game Over";
      this.text = "Better Luck Next Time";
    } else if (this.game.score < 20 && this.game.lives > 0) {
      this.title = "Low Score";
      this.text = "Try Using Special Attack";
    } else if (this.game.score > 20 && this.game.lives > 0) {
      this.title = "Victory";
      this.text = "YOU WON!!!";
    }
    // game over
    if (this.game.gameOver) {
      context.textAlign = "center";
      context.fillStyle = this.game.shadowColor;
      context.font = this.fontSize * 2 + "px " + this.fontFamily;
      context.fillText(
        this.title,
        this.game.width * 0.5,
        this.game.height * 0.5 - 20
      );
      context.font = this.fontSize * 0.8 + "px " + this.fontFamily;
      context.fillText(
        this.text,
        this.game.width * 0.5,
        this.game.height * 0.5 + 20
      );
      context.fillStyle = this.game.fontColor;
      context.font = this.fontSize * 2 + "px " + this.fontFamily;
      context.fillText(
        this.title,
        this.game.width * 0.5 + 4,
        this.game.height * 0.5 - 21
      );
      context.font = this.fontSize * 0.8 + "px " + this.fontFamily;
      context.fillText(
        this.text,
        this.game.width * 0.5 + 1,
        this.game.height * 0.5 + 21
      );
    }
    context.restore(); //Restores former context ( style without shadow)
  }
}
