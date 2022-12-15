class Game {
    constructor (ctx) {
        this.ctx = ctx
        this.interval = null

        this.bg = new Background(ctx)
    }

start()  {
    this.interval = setInterval(() => {
        this.clear()
        this.draw()
    }, 1000/60)

}

draw() {
    this.bg.draw()
}

clear() {
    this.ctx.clearRect(
        0,
        0,
        this.ctx.canvas.width,
        this.ctx.canvas.height
    )
}
    
}



