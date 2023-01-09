class Bomb {
  constructor(ctx) {
    this.ctx = ctx;
    this.x = Math.floor(Math.random() * (ctx.canvas.width - 0 + 1)) + 0;
    this.y = 0;
    this.y0 = ctx.canvas.height * 0.7;
    this.w = 35;
    this.h = 35;
    this.vx= 0
    this.vy = 0.4;

    this.player = new Player(ctx)
    

    this.img = new Image();
    this.img.src = "resources/images/bomb.png";
    this.imgExpl = new Image();
    this.imgExpl.src = "resources/images/bombExpl.png"
  }

  draw() {
    this.ctx.drawImage(this.img, this.x, this.y, this.w, this.h);

    if(this.explBomb()){
        this.ctx.drawImage(this.imgExpl, this.x, this.y, this.w, this.h);
    }
  }

  explBomb() {
    return (
        this.player.x + this.player.w >= this.x &&
        this.player.x <= this.x + this.w &&
        this.player.x + this.player.x >= this.y &&
        this.player.x <= this.y + this.h
      );
    
  }

  move() {
    this.ay = this.vy
    this.y += this.vy

  }

  isVisible() {
    return(
        this.y < this.ctx.canvas.height* 0.65 && this.y > 0
        )

  }
}