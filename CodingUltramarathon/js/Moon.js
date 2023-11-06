class Moon extends Project {
    constructor(canvas) {
        super(canvas)

        this.drawFrame();
        this.showDisabled();
    }

    drawFrame(){
        drawColoredBackground(this.ctx, "rgb(0,0,100)");
        this.drawMoon([CANVAS_SIZE*0.5, CANVAS_SIZE*0.5])
    }

    drawMoon(location){
        this.ctx.beginPath()
        this.ctx.fillStyle="yellow"
        this.ctx.arc(location[0], location[1], CANVAS_SIZE*0.2, 0, Math.PI*2)
        this.ctx.fill()

        this.ctx.beginPath()
        this.ctx.fillStyle="rgb(0,0,100)"       
        this.ctx.arc(location[0]-CANVAS_SIZE*0.1, location[1], CANVAS_SIZE*0.2, 0, Math.PI*2)
        this.ctx.fill()
    }
}
