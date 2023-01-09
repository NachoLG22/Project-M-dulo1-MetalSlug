class Soldier {
  constructor(ctx) {
    this.ctx = ctx;
    this.x = ctx.canvas.width;
    this.y = ctx.canvas.height * 0.75;
    this.w = 65;
    this.h = 75;
    this.vx = -0.8;
    this.vy = 0;
    this.ax = 0;
    this.ay = 0.5;
    this.deathSoldier = false;

    this.img = new Image();
    this.img.src = "resources/images/Enemy.png";
    this.img.frames = 7;
    this.img.frameIndex = 0;
    this.tick = 0;
  }

  draw() {
    this.ctx.drawImage(
      this.img,
      (this.img.frameIndex * this.img.width) / this.img.frames,
      0,
      this.img.width / this.img.frames,
      this.img.height,
      this.x,
      this.y,
      this.w,
      this.h
    );

    this.animate();
  }

  soldierDie() {
    if ((this.deathSoldier = true))
      this.img.src = "resources/images/soldierDie.png";
    this.img.frames = 9;
  }

  animate() {
    this.tick++;

    if (this.tick > 15) {
      this.tick = 0;
      this.img.frameIndex++;

      if (this.img.frameIndex > this.img.frames - 1) {
        this.img.frameIndex = 0;
      }
    }
  }

  move() {
    this.vx += this.ax;
    this.x += this.vx;
  }

  woundedBullet(bullet) {
    return (
      bullet.x + bullet.w >= this.x &&
      bullet.x <= this.x + this.w &&
      bullet.y + bullet.h >= this.y &&
      bullet.y <= this.y + this.h
    );
  }

  isVisible() {
    return this.x + this.w >= 0 && this.x <= this.ctx.canvas.width;
  }
}
