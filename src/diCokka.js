class DiCokka {
  constructor(ctx) {
    this.ctx = ctx;
    this.x = ctx.canvas.width
    this.y = ctx.canvas.height * 0.72;
    this.w = 105;
    this.h = 105;
    this.vx = -0.1;
    this.vy = 0;

    this.img = new Image();
    this.img.src = "resources/images/DiCokka.png";
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

  animate() {
    this.tick++;

    if (this.tick > 30) {
      this.tick = 0;
      this.img.frameIndex++;

      if (this.img.frameIndex > 4) {
        this.img.frameIndex = 0;
      }
    }
  }

  animateShot() {
    this.tick++;

    if (this.tick > 30) {
      this.tick = 0;
      this.img.frameIndex++;

      if (this.img.frameIndex > 4) {
        this.img.frameIndex = 0;
      }
    }
  }

  move() {
    this.x += this.vx;

    if (this.x <= 400) {
      this.vx = 0;
      this.x = 400;
    }

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
