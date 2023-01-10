class BulletDiCokka {
    constructor (ctx, x, y) {
        this.ctx = ctx;
        this.x = x
        this.y = y
        this.w = 30
        this.h = 35
        this.vx = -3

        this.img = new Image()
        this.img.src = "resources/images/bulletDiCokka.png"
            
    }
    
    draw() {
        this.ctx.drawImage(
            this.img,
            this.x,
            this.y,
            this.w,
            this.h,
        )
    }

    move() {
        this.x += this.vx
        
    }

    isVisible() {
        return(
            this.x < this.ctx.canvas.width * 2 && this.x > 0
        )
    }
}