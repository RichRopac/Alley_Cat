export class UI {
    constructor(game){
        this.game = game;   //needs to access score value from game
        this.fontSize = 30;
        this.fontFamily = 'Creepster';      //TODO: find a style online how he showed us and use it
        this.livesImage = document.getElementById('lives');
        this.title;
        this.text;
    }
    draw(context){
        context.save();
        context.font = this.fontSize + 'px ' + this.fontFamily;
        context.textAlign = 'left';
        // score
        //.filltext() method draws filled text on the canvas sytax: (text,x,y,maxWidth)
        context.fillStyle = this.game.shadowColor;
        context.fillText('Score: ' + this.game.score, 20, 50);
        context.fillStyle = this.game.fontColor;
        context.fillText('Score: ' + this.game.score, 22, 52);
        // timer
        context.font = this.fontSize * 0.8 + 'px ' + this.fontFamily;
        context.fillStyle = this.game.shadowColor;
        context.fillText('Time: ' + (this.game.time * 0.001).toFixed(1), 20, 80);
        context.fillStyle = this.game.fontColor;
        context.fillText('Time: ' + (this.game.time * 0.001).toFixed(1), 22, 82);
    }
}