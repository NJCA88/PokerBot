

class Player {
  constructor(options) {
  this.pos = options.pos
  this.name = options.name
  this.stack = options.stack
  }

  draw(ctx){

    ctx.beginPath();
    ctx.arc(this.pos[0], this.pos[1], 20, 0, 2 * Math.PI, true);
    ctx.lineWidth = 5;
    ctx.stroke();
    ctx.fillStyle = "blue";
    ctx.fill();

    ctx.fillStyle = "black";
    ctx.font = 20 + 'pt Arial';
    ctx.fillText(`${this.name}`, this.pos[0] + 50, this.pos[1]);

    ctx.fillStyle = "black";
    ctx.font = 20 + 'pt Arial';
    ctx.fillText(`${this.stack}`, this.pos[0] + 50, this.pos[1]+ 30);
  }

}

export default Player;
